import { notFound } from "next/navigation";
import Link from "next/link";
import { getCandidate, getCandidates } from "@/lib/storage";
import { OPERATIONS_RUBRIC, CULTURAL_FIT_RUBRIC } from "@/lib/rubric/operations";
import { scoreColor } from "@/lib/scoring";
import { Criterion, CulturalFitTrait } from "@/lib/rubric/types";
import { CriterionScore } from "@/types/candidate";
import { getRecommendation, recommendationClasses } from "@/lib/report";

function pct(n: number): string {
  return `${Math.round(n)}%`;
}

const badgeClasses: Record<string, string> = {
  red: "bg-red-100 text-red-700",
  amber: "bg-amber-100 text-amber-800",
  green: "bg-green-100 text-green-700",
};

function ScoreBadge({ score }: { score: number }) {
  return (
    <span
      className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${badgeClasses[scoreColor(score)]}`}
    >
      {score}
    </span>
  );
}

function CriterionCard({
  criterion,
  result,
}: {
  criterion: { id: string; name: string; weight: number };
  result?: CriterionScore;
}) {
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-slate-900">{criterion.name}</h3>
          <p className="mt-0.5 text-xs text-slate-600">Weight: {criterion.weight}</p>
        </div>
        {result && <ScoreBadge score={result.score} />}
      </div>
      {result && (
        <div className="mt-3 space-y-2 text-sm">
          <p className="text-slate-700">{result.rationale}</p>
          {result.evidence && (
            <p className="rounded bg-slate-50 px-3 py-2 text-slate-600 italic">
              &ldquo;{result.evidence}&rdquo;
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  const candidates = await getCandidates();
  return candidates.map((c) => ({ id: c.id }));
}

export default async function CandidateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const candidate = await getCandidate(id);
  if (!candidate) notFound();

  const scoreById = new Map(candidate.criterionScores.map((s) => [s.criterionId, s]));
  const traitScoreById = new Map(candidate.traitScores.map((s) => [s.criterionId, s]));

  const allCriteria: Criterion[] = OPERATIONS_RUBRIC.categories.flatMap((c) => c.criteria);
  const criterionMeta = new Map(allCriteria.map((c) => [c.id, c]));
  const traitMeta = new Map(
    CULTURAL_FIT_RUBRIC.traits.map((t: CulturalFitTrait) => [t.id, t])
  );

  const redFlags = [
    ...candidate.computed.roleFlags.red.map((id) => ({
      id,
      name: criterionMeta.get(id)?.name ?? id,
      result: scoreById.get(id),
    })),
    ...candidate.computed.culturalFitFlags.red.map((id) => ({
      id,
      name: traitMeta.get(id)?.name ?? id,
      result: traitScoreById.get(id),
    })),
  ];

  const greenFlags = [
    ...candidate.computed.roleFlags.green.map((id) => ({
      id,
      name: criterionMeta.get(id)?.name ?? id,
      result: scoreById.get(id),
    })),
    ...candidate.computed.culturalFitFlags.green.map((id) => ({
      id,
      name: traitMeta.get(id)?.name ?? id,
      result: traitScoreById.get(id),
    })),
  ];

  const recommendation = getRecommendation(candidate);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <Link href="/dashboard" className="text-sm font-semibold text-indigo-600 hover:underline">
        ← Back to candidates
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{candidate.name}</h1>
          <p className="mt-1 text-slate-600">{candidate.email}</p>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {candidate.linkedinUrl && (
              <a
                href={candidate.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 hover:underline"
              >
                {candidate.linkedinUrl}
              </a>
            )}
            {candidate.hasCv && (
              <a
                href={`/api/candidates/${candidate.id}/cv`}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-indigo-600 hover:underline"
              >
                View CV (PDF) ↗
              </a>
            )}
          </div>
          <p className="mt-1 text-xs text-slate-600">
            Submitted {new Date(candidate.submittedAt).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-4">
          <div className="rounded-lg border border-slate-200 px-5 py-3 text-center">
            <p className="text-xs uppercase tracking-wide text-slate-500">Readiness</p>
            <p className="text-2xl font-bold text-slate-900">
              {pct(candidate.computed.readinessPercent)}
            </p>
            <p className="text-xs text-slate-600">
              {candidate.computed.weightedScore.toFixed(1)} / 5
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 px-5 py-3 text-center">
            <p className="text-xs uppercase tracking-wide text-slate-500">Cultural Fit</p>
            <p className="text-2xl font-bold text-slate-900">
              {pct(candidate.computed.culturalFitPercent)}
            </p>
            <p className="text-xs text-slate-600">
              {candidate.computed.culturalFitScore.toFixed(1)} / 5
            </p>
          </div>
        </div>
      </div>

      <p className="mt-3 text-sm text-slate-500">
        Technical/operational readiness is the floor; Cultural Fit (judgment traits) is the
        ceiling — read both together rather than blended. The TL;DR below is a simple rule-based
        read of these two numbers (not a separate AI judgement) — a quick starting point for the
        hiring team, not a verdict.
      </p>

      <section
        className={`mt-6 rounded-lg border p-4 ${recommendationClasses(recommendation.verdict)}`}
      >
        <h2 className="text-xs font-semibold uppercase tracking-wide">TL;DR</h2>
        <p className="mt-1 text-lg font-bold">{recommendation.label}</p>
        <p className="mt-1 text-sm">{recommendation.summary}</p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-600">
              Highlights
            </h3>
            {greenFlags.length > 0 ? (
              <ul className="mt-1 list-inside list-disc space-y-1 text-sm text-slate-800">
                {greenFlags.slice(0, 3).map((f) => (
                  <li key={f.id}>
                    <span className="font-semibold">{f.name}</span>
                    {f.result?.rationale && (
                      <>
                        {" — "}
                        {f.result.rationale.length > 140
                          ? `${f.result.rationale.slice(0, 140)}…`
                          : f.result.rationale}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-sm text-slate-600">No standout strengths (score ≥ 4).</p>
            )}
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-600">
              Concerns
            </h3>
            {redFlags.length > 0 ? (
              <ul className="mt-1 list-inside list-disc space-y-1 text-sm text-slate-800">
                {redFlags.slice(0, 3).map((f) => (
                  <li key={f.id}>
                    <span className="font-semibold">{f.name}</span>
                    {f.result?.rationale && (
                      <>
                        {" — "}
                        {f.result.rationale.length > 140
                          ? `${f.result.rationale.slice(0, 140)}…`
                          : f.result.rationale}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-sm text-slate-600">No red flags (score ≤ 2).</p>
            )}
          </div>
        </div>
      </section>

      {candidate.scoringErrors.length > 0 && (
        <div className="mt-6 rounded-md bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <p className="font-semibold">Scoring incomplete — manual review needed:</p>
          <ul className="mt-1 list-inside list-disc">
            {candidate.scoringErrors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      {redFlags.length > 0 && (
        <section className="mt-8 rounded-lg border border-red-200 bg-red-50 p-4">
          <h2 className="font-semibold text-red-800">Flagged gaps — probe further</h2>
          <ul className="mt-2 space-y-2 text-sm text-red-900">
            {redFlags.map((f) => (
              <li key={f.id}>
                <span className="font-semibold">{f.name}:</span> {f.result?.rationale}
              </li>
            ))}
          </ul>
        </section>
      )}

      {greenFlags.length > 0 && (
        <section className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
          <h2 className="font-semibold text-green-800">Standout strengths</h2>
          <ul className="mt-2 space-y-2 text-sm text-green-900">
            {greenFlags.map((f) => (
              <li key={f.id}>
                <span className="font-semibold">{f.name}:</span> {f.result?.rationale}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">Role rubric</h2>
        <div className="mt-4 space-y-6">
          {OPERATIONS_RUBRIC.categories.map((category) => (
            <div key={category.id}>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                {category.name}
              </h3>
              <div className="space-y-3">
                {category.criteria.map((criterion) => (
                  <CriterionCard
                    key={criterion.id}
                    criterion={criterion}
                    result={scoreById.get(criterion.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">Cultural Fit (scored separately)</h2>
        <div className="mt-4 space-y-3">
          {CULTURAL_FIT_RUBRIC.traits.map((trait) => (
            <CriterionCard
              key={trait.id}
              criterion={trait}
              result={traitScoreById.get(trait.id)}
            />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <details className="rounded-lg border border-slate-200 p-4">
          <summary className="cursor-pointer font-semibold text-slate-900">
            Raw application answers
          </summary>
          <div className="mt-4 space-y-4 text-sm">
            {OPERATIONS_RUBRIC.categories.map((category) => (
              <div key={category.id}>
                <p className="font-semibold text-slate-800">{category.name}</p>
                <p className="mt-1 whitespace-pre-wrap text-slate-600">
                  {candidate.categoryAnswers[category.id]}
                </p>
              </div>
            ))}
            {CULTURAL_FIT_RUBRIC.traits.map((trait) => (
              <div key={trait.id}>
                <p className="font-semibold text-slate-800">{trait.name}</p>
                <p className="mt-1 whitespace-pre-wrap text-slate-600">
                  {candidate.traitAnswers[trait.id]}
                </p>
              </div>
            ))}
            {candidate.cvText && (
              <div>
                <p className="font-semibold text-slate-800">CV text (extracted)</p>
                <p className="mt-1 max-h-64 overflow-y-auto whitespace-pre-wrap rounded bg-slate-50 p-3 text-slate-600">
                  {candidate.cvText}
                </p>
              </div>
            )}
          </div>
        </details>
      </section>
    </main>
  );
}
