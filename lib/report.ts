import { Candidate } from "@/types/candidate";

export interface Recommendation {
  verdict: "advance" | "probe" | "hold" | "pass";
  label: string;
  summary: string;
}

const verdictClasses: Record<Recommendation["verdict"], string> = {
  advance: "border-green-200 bg-green-50 text-green-800",
  probe: "border-amber-200 bg-amber-50 text-amber-800",
  hold: "border-amber-200 bg-amber-50 text-amber-800",
  pass: "border-red-200 bg-red-50 text-red-800",
};

export function recommendationClasses(verdict: Recommendation["verdict"]): string {
  return verdictClasses[verdict];
}

export function getRecommendation(candidate: Candidate): Recommendation {
  const { readinessPercent, culturalFitPercent } = candidate.computed;

  if (readinessPercent >= 70 && culturalFitPercent >= 70) {
    return {
      verdict: "advance",
      label: "Advance to interview",
      summary:
        "Strong role readiness and strong judgment traits — a clear candidate for the next round.",
    };
  }

  if (readinessPercent >= 70 && culturalFitPercent < 50) {
    return {
      verdict: "probe",
      label: "Advance, but probe judgment traits",
      summary:
        "Technically well-prepared for the role, but the judgment/cultural fit traits need " +
        "probing in interview before moving forward.",
    };
  }

  if (readinessPercent < 40 && culturalFitPercent >= 70) {
    return {
      verdict: "probe",
      label: "Consider for a more junior or adjacent role",
      summary:
        "Lacks the operational experience this role needs right now, but shows strong " +
        "judgment — may be worth considering for a more junior position or with structured " +
        "onboarding support.",
    };
  }

  if (readinessPercent < 40) {
    return {
      verdict: "pass",
      label: "Unlikely to be a fit for this role",
      summary:
        "Significant gaps across core role criteria — unlikely to be ready for this role at " +
        "this time.",
    };
  }

  return {
    verdict: "hold",
    label: "Discuss before deciding",
    summary:
      "A mixed profile — review the flagged gaps below with the hiring team before deciding " +
      "whether to progress.",
  };
}
