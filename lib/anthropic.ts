import Anthropic from "@anthropic-ai/sdk";
import { Criterion, CulturalFitTrait } from "./rubric/types";
import { CriterionScore } from "@/types/candidate";

const client = new Anthropic();

const MODEL = "claude-sonnet-4-6";

const SCORE_TOOL = {
  name: "record_scores",
  description: "Record per-criterion scores and rationale for a candidate's response",
  input_schema: {
    type: "object" as const,
    properties: {
      scores: {
        type: "array",
        items: {
          type: "object",
          properties: {
            criterionId: { type: "string" },
            score: { type: "integer", minimum: 1, maximum: 5 },
            rationale: { type: "string" },
            evidence: { type: "string" },
          },
          required: ["criterionId", "score", "rationale", "evidence"],
        },
      },
    },
    required: ["scores"],
  },
};

interface ScorableCriterion {
  id: string;
  name: string;
  whyItMatters: string;
  anchors: Criterion["anchors"];
}

function buildPrompt(
  sectionName: string,
  criteria: ScorableCriterion[],
  answer: string,
  cvText: string
): string {
  const criteriaBlock = criteria
    .map(
      (c) => `- criterionId: "${c.id}"
  Name: ${c.name}
  Why it matters: ${c.whyItMatters}
  Score 1 (red flag): ${c.anchors[0].description}
  Score 3 (partial): ${c.anchors[1].description}
  Score 5 (strong signal): ${c.anchors[2].description}`
    )
    .join("\n\n");

  const cvBlock = cvText
    ? `\nCANDIDATE'S CV (for additional context):\n"""\n${cvText.slice(0, 8000)}\n"""\n`
    : "";

  return `You are an expert interviewer for AI safety operations roles, scoring a candidate's
written response against a hiring rubric.

SECTION: ${sectionName}

For each criterion below, you are given the criterion id, name, why it matters, and anchor
descriptions for scores of 1, 3, and 5. Read the candidate's response (and CV, if provided)
and assign an integer score from 1-5 for EACH criterion, using the anchors as calibration
points (interpolate between anchors as needed). Provide a brief rationale and quote or closely
paraphrase the specific evidence (from the response or CV) that supports your score. If neither
the response nor the CV gives relevant evidence for a criterion, score it 1 and say so explicitly
in the rationale — do not invent evidence.

CRITERIA:
${criteriaBlock}
${cvBlock}
CANDIDATE'S RESPONSE TO THIS SECTION:
"""
${answer}
"""

Score each criterion using the record_scores tool. Use exactly the criterionId values given above.`;
}

async function callClaude(prompt: string): Promise<Anthropic.Messages.ToolUseBlock | null> {
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 2048,
    tools: [SCORE_TOOL],
    tool_choice: { type: "tool", name: "record_scores" },
    messages: [{ role: "user", content: prompt }],
  });

  const toolUse = response.content.find(
    (block): block is Anthropic.Messages.ToolUseBlock => block.type === "tool_use"
  );
  return toolUse ?? null;
}

function fallbackScores(criteria: ScorableCriterion[]): CriterionScore[] {
  return criteria.map((c) => ({
    criterionId: c.id,
    score: 3,
    rationale: "Automatic scoring failed; manual review needed.",
    evidence: "",
  }));
}

export async function scoreSection(
  sectionName: string,
  criteria: ScorableCriterion[],
  answer: string,
  cvText: string
): Promise<{ scores: CriterionScore[]; error?: string }> {
  const prompt = buildPrompt(sectionName, criteria, answer, cvText);
  const expectedIds = new Set(criteria.map((c) => c.id));

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const toolUse = await callClaude(prompt);
      if (!toolUse) throw new Error("No tool_use block in response");

      const input = toolUse.input as { scores: CriterionScore[] };
      const scores = input.scores ?? [];

      const returnedIds = new Set(scores.map((s) => s.criterionId));
      const allPresent = [...expectedIds].every((id) => returnedIds.has(id));
      if (!allPresent || scores.length === 0) {
        throw new Error("Response missing expected criterionIds");
      }

      return { scores };
    } catch (err) {
      if (attempt === 1) {
        return {
          scores: fallbackScores(criteria),
          error: `Scoring failed for "${sectionName}": ${(err as Error).message}`,
        };
      }
    }
  }

  return {
    scores: fallbackScores(criteria),
    error: `Scoring failed for "${sectionName}"`,
  };
}

export async function scoreCulturalFitTrait(
  trait: CulturalFitTrait,
  answer: string,
  cvText: string
): Promise<{ scores: CriterionScore[]; error?: string }> {
  return scoreSection(
    `Cultural Fit — ${trait.name}`,
    [{ id: trait.id, name: trait.name, whyItMatters: trait.whyItMatters, anchors: trait.anchors }],
    answer,
    cvText
  );
}
