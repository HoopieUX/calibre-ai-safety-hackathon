import { RoleRubric, CulturalFitRubric } from "./types";

export const OPERATIONS_RUBRIC: RoleRubric = {
  roleId: "operations",
  roleName: "Operations & Chief of Staff",
  jobTitle: "Research Program Manager",
  org: "SaferAI",
  location: "Paris or London (hybrid)",
  description:
    "SaferAI is a non-profit research organisation working to ensure the safe development of " +
    "AI through technical research, risk modelling, and policy engagement. This is a " +
    "first-of-its-kind role on the team: a Research Program Manager who keeps the research " +
    "engine running by managing the people, processes, and projects around it, so " +
    "researchers can focus on the work that matters most.",
  responsibilities: [
    "People management & team health (~40%) — be a first point of contact for the research " +
      "team on day-to-day questions, onboarding, and wellbeing; run regular check-ins; spot " +
      "and help resolve friction before it becomes a bigger problem.",
    "Project & programme management (~40%) — translate research agendas into quarterly plans " +
      "and concrete workstreams; track progress against deliverables; own research " +
      "operations end-to-end (hiring pipelines, fellowships, budgets, vendor and grant " +
      "administration); remove the administrative obstacles that slow researchers down.",
    "Special projects (~20%) — pick up ad hoc, high-leverage projects for leadership: " +
      "synthesising scattered inputs into a recommendation, drafting board or funder " +
      "materials, or designing a new internal process from scratch.",
  ],
  aboutYou: [
    "3+ years of people or project management experience in a research org, think tank, " +
      "consultancy, or startup environment.",
    "Genuinely curious about AI safety and motivated by SaferAI's mission — you don't need a " +
      "technical research background, but you should be able to navigate the AI safety " +
      "ecosystem (key orgs, funders, and where the field's bottlenecks are).",
    "High emotional intelligence, discretion, and judgement — comfortable supporting senior " +
      "researchers and handling sensitive information.",
    "Operationally rigorous: you build systems and processes rather than just reacting to " +
      "what's in front of you, and you're comfortable with ambiguity in a fast-growing org.",
    "A confident, AI-fluent operator — you use AI tools as part of how you work day to day, " +
      "not as an occasional novelty.",
  ],
  categories: [
    {
      id: "org-operations",
      name: "Org Operations",
      prompt:
        "Tell us about a time you ran multiple workstreams at once — think fellowships, " +
        "events, hiring, or budgets. How did you keep track of everything, and what happened " +
        "when something slipped?",
      criteria: [
        {
          id: "org-operations.project-programme-management",
          name: "Project & programme management",
          whyItMatters:
            "Most operations roles require running multiple workstreams simultaneously — " +
            "fellowships, events, hiring, finances.",
          weight: 3,
          anchors: [
            {
              score: 1,
              description:
                "Has managed small personal projects; no formal programme management.",
            },
            {
              score: 3,
              description:
                "Has managed a multi-month project with multiple stakeholders; uses a PM tool " +
                "(Notion, Asana, Linear).",
            },
            {
              score: 5,
              description:
                "Has run a complex programme end-to-end; has managed cross-functional teams; " +
                "comfortable with OKRs and reporting.",
            },
          ],
        },
        {
          id: "org-operations.financial-management-grants",
          name: "Financial management & grants administration",
          whyItMatters:
            "Nonprofits and research orgs live on grants. Operations staff often manage " +
            "budgets, reporting, and compliance.",
          weight: 2,
          anchors: [
            { score: 1, description: "No experience with organisational budgets." },
            {
              score: 3,
              description:
                "Has managed a team or project budget; understands budget vs. actuals tracking.",
            },
            {
              score: 5,
              description:
                "Has administered grants or contracts; understands funder reporting " +
                "requirements; has negotiated budgets.",
            },
          ],
        },
        {
          id: "org-operations.hiring-talent-pipelines",
          name: "Hiring & talent pipelines",
          whyItMatters:
            "Building research teams in a competitive market is a core operations challenge " +
            "for AI safety orgs.",
          weight: 2,
          anchors: [
            {
              score: 1,
              description:
                "Has helped with a hiring process as a participant or note-taker.",
            },
            {
              score: 3,
              description:
                "Has coordinated a full hiring process; has written job descriptions or " +
                "scored applications.",
            },
            {
              score: 5,
              description:
                "Has built hiring pipelines from scratch; has sourced passive candidates; has " +
                "set up systems for applicant tracking.",
            },
          ],
        },
      ],
    },
    {
      id: "org-design",
      name: "Org Design",
      prompt:
        "Describe a process or system you designed or significantly improved — for " +
        "example turning an ad hoc workflow into something repeatable, or helping leadership " +
        "make a decision by synthesising scattered inputs into a clear recommendation.",
      criteria: [
        {
          id: "org-design.strategy-prioritisation-support",
          name: "Strategy & prioritisation support",
          whyItMatters:
            "Chief of Staff roles especially require helping leaders make decisions — " +
            "synthesising inputs, running planning processes.",
          weight: 2,
          anchors: [
            {
              score: 1,
              description:
                "Executes tasks given to them; hasn't supported strategic planning.",
            },
            {
              score: 3,
              description:
                "Has facilitated planning meetings; can synthesise inputs into a clear " +
                "recommendation.",
            },
            {
              score: 5,
              description:
                "Has run org-level planning processes; has managed exec bandwidth directly; " +
                "has written strategy documents.",
            },
          ],
        },
        {
          id: "org-design.systems-process-design",
          name: "Systems & process design",
          whyItMatters:
            "Scaling a research org requires turning ad hoc workflows into repeatable systems.",
          weight: 3,
          anchors: [
            {
              score: 1,
              description: "Uses systems others have built; hasn't designed new ones.",
            },
            {
              score: 3,
              description:
                "Has documented and improved an existing process; has built lightweight " +
                "internal tools (Notion wikis, Airtable).",
            },
            {
              score: 5,
              description:
                "Has designed operations infrastructure from scratch; has rolled out new " +
                "systems across a team with change management.",
            },
          ],
        },
      ],
    },
    {
      id: "field-awareness",
      name: "Field Awareness",
      prompt:
        "What's your understanding of the AI safety landscape — the key organisations, " +
        "how they relate to each other, who funds them, and where the operational bottlenecks " +
        "are for orgs trying to grow right now?",
      criteria: [
        {
          id: "field-awareness.ai-safety-landscape",
          name: "Understanding of AI safety org landscape",
          whyItMatters:
            "Operations staff in AI safety need to understand the ecosystem — who the " +
            "orgs are, how they relate, what the bottlenecks are.",
          weight: 1,
          anchors: [
            {
              score: 1,
              description:
                "Has a vague sense of 'AI safety' as a field; couldn't name five key orgs.",
            },
            {
              score: 3,
              description:
                "Can name the major orgs, their mandates, and key funders; understands the " +
                "EA/longtermist ecosystem context.",
            },
            {
              score: 5,
              description:
                "Has worked in or closely with an AI safety org; understands the political " +
                "and funding dynamics of the field.",
            },
          ],
        },
      ],
    },
    {
      id: "soft-skills",
      name: "Soft Skills",
      prompt:
        "Tell us about a time you supported a senior leader or handled sensitive information " +
        "— and about a piece of written work (a memo, proposal, or brief) you're proud " +
        "of, and what it achieved.",
      criteria: [
        {
          id: "soft-skills.discretion-executive-support",
          name: "Discretion & executive support",
          whyItMatters:
            "CoS and senior ops roles require handling sensitive information and acting as a " +
            "trusted extension of leadership.",
          weight: 2,
          anchors: [
            { score: 1, description: "No experience supporting senior leaders." },
            {
              score: 3,
              description:
                "Has worked closely with a manager or director; handles confidential " +
                "information professionally.",
            },
            {
              score: 5,
              description:
                "Has served as a direct CoS or EA to a senior executive; trusted with " +
                "sensitive negotiations, personnel decisions.",
            },
          ],
        },
        {
          id: "soft-skills.written-communication",
          name: "Written communication (internal docs, proposals)",
          whyItMatters:
            "Ops staff produce the memos, proposals, and briefings that keep orgs " +
            "functioning — quality matters.",
          weight: 2,
          anchors: [
            {
              score: 1,
              description:
                "Writes functional emails; hasn't produced polished internal documents.",
            },
            {
              score: 3,
              description:
                "Writes clear memos, project briefs, and proposals; adapts style to audience.",
            },
            {
              score: 5,
              description:
                "Produces documents that are acted upon; has written board-level reports or " +
                "grant proposals.",
            },
          ],
        },
      ],
    },
    {
      id: "ai-fluency",
      name: "AI Fluency",
      prompt:
        "How do you use AI tools in your day-to-day work? Walk us through a workflow you've " +
        "built or a way your use of AI has changed over time, and the impact it has had.",
      criteria: [
        {
          id: "ai-fluency.mindset-building-accountability",
          name: "AI fluency (mindset, building, accountability)",
          whyItMatters:
            "The field is AI-first, so the bar is not whether someone has used AI but whether " +
            "they embed it into their core work as repeatable systems with clear impact, and " +
            "stay accountable for what it produces. The strongest signal is iteration and using " +
            "AI as a thought partner, plus an upward trajectory in how their use has evolved, " +
            "not the number of tools. Ops staff who build AI workflows multiply the whole " +
            "organisation's output.",
          weight: 2,
          anchors: [
            {
              score: 1,
              description:
                "Uses AI ad hoc for one-off prompts, or barely at all. Cannot point to a " +
                "repeatable workflow or any clear impact. Treats AI output as finished and " +
                "does not evaluate it critically. Has plateaued on the same few tools.",
            },
            {
              score: 3,
              description:
                "Uses AI purposefully on real tasks and can describe the impact. Has some " +
                "repeatable patterns. Evaluates outputs, though not always systematically. Can " +
                "show some evolution in how they work with AI.",
            },
            {
              score: 5,
              description:
                "Has AI embedded into core work as repeatable systems with clear, measurable " +
                "impact on quality or efficiency. Defines what good looks like up front, " +
                "evaluates critically, catches errors before they ship, and owns the outcome. " +
                "Iterates and uses AI as a thought partner, with a visible upward trajectory " +
                "and active experimentation. (Managers: has led a team to adopt AI, not just " +
                "used it personally.)",
            },
          ],
        },
      ],
    },
  ],
};

export const CULTURAL_FIT_RUBRIC: CulturalFitRubric = {
  traits: [
    {
      id: "adversarial-grit",
      name: "Adversarial Grit (security mindset)",
      whyItMatters:
        "The reflex to find how a system fails before someone exploits it. AI usually causes " +
        "harm by working as designed toward a subtly wrong goal, so you need people who spot " +
        "that before deployment. You can teach the vocabulary, not the reflex.",
      probeQuestion:
        "Walk me through a process or system you have built. Now tell me how someone would " +
        "game it if they wanted to.",
      weight: 3,
      anchors: [
        {
          score: 1,
          description:
            "Defaults to why the system is probably fine. Treats \"how could this fail?\" as " +
            "criticism. Cannot name a plausible failure mode unprompted.",
        },
        {
          score: 3,
          description:
            "Finds failure modes when pointed at the right area. Can trace a mechanism if " +
            "prompted. Leans on known/standard examples.",
        },
        {
          score: 5,
          description:
            "Unprompted, spots the non-obvious failure and traces the actual mechanism. " +
            "Methodical, not cynical. Slightly unsettled that others missed it.",
        },
      ],
    },
    {
      id: "epistemic-rigour",
      name: "Epistemic Rigour (\"how do you know?\")",
      whyItMatters:
        "Discomfort with unearned certainty, including their own. The field is full of " +
        "frameworks that feel rigorous but measure something subtly different from safety. " +
        "You need people who can respect an approach and still question what it actually " +
        "proves. Performing scepticism is easy; doing it to your own idea when the room " +
        "agrees is rare.",
      probeQuestion:
        "Tell me about a decision that felt right at the time and turned out wrong. How did " +
        "you know it was wrong?",
      weight: 3,
      anchors: [
        {
          score: 1,
          description:
            "Falls in love with their first position; defensive when pushed. Uses social " +
            "proof (citations, reception) as a proxy for truth.",
        },
        {
          score: 3,
          description:
            "Acknowledges uncertainty when prompted. Can argue both sides if asked. Some " +
            "discomfort dismantling their own view.",
        },
        {
          score: 5,
          description:
            "Dismantles their own argument without defensiveness. Distinguishes \"we did not " +
            "find it\" from \"it is not there.\" Comfortable saying \"we do not know.\"",
        },
      ],
    },
    {
      id: "strategic-foresight",
      name: "Strategic Foresight (horizon scan)",
      whyItMatters:
        "Reasoning about risks that do not exist yet by tracing structural dependencies " +
        "forward. The dangerous risks sit in infrastructure everyone assumes is fine. Good " +
        "answers are boring and structural, not sci-fi. Scenario planning is a teachable " +
        "process; the instinct comes from years of watching systems fail.",
      probeQuestion:
        "Pick a system everyone assumes is stable. If its core assumption suddenly broke, " +
        "what fails first, and what does nobody talk about?",
      weight: 3,
      anchors: [
        {
          score: 1,
          description:
            "Gives sci-fi answers or recycled headlines. Misses the infrastructure layer. " +
            "Says the system \"will just adapt.\"",
        },
        {
          score: 3,
          description:
            "Identifies a plausible structural risk when prompted. Traces some downstream " +
            "effects. Needs nudging past the obvious answer.",
        },
        {
          score: 5,
          description:
            "Points unprompted to the boring structural dependency nobody checked. Traces " +
            "what breaks first. The insight feels obvious in retrospect.",
        },
      ],
    },
    {
      id: "conceptual-engineering",
      name: "Conceptual Engineering (bridging the gap)",
      whyItMatters:
        "Taking a vague value (fairness, honesty, oversight) and decomposing it into something " +
        "precise enough to measure or act on, without losing the intent. Most safety failures " +
        "live in the gap between the value and its proxy. The skill needs tolerance for " +
        "ambiguity; most people rush to a definition and over-defend it.",
      probeQuestion:
        "Take a vague value like honesty or meaningful human oversight and break it into " +
        "something you could measure or write into a rule.",
      weight: 3,
      anchors: [
        {
          score: 1,
          description:
            "Restates the vague concept (\"it should be honest\") without decomposing it. " +
            "Rushes to one definition and defends it rigidly.",
        },
        {
          score: 3,
          description:
            "Breaks the concept into a few components when asked. Definition is reasonable " +
            "but loses nuance or stops early.",
        },
        {
          score: 5,
          description:
            "Decomposes into precise, measurable components while preserving intent. Sits " +
            "with the ambiguity. Stays curious about whether the definition truly captures the " +
            "thing.",
        },
      ],
    },
  ],
};
