import { CriterionScore } from "@/types/candidate";

interface Flags {
  red: string[];
  green: string[];
}

export function weightedScore(
  scores: CriterionScore[],
  weightLookup: (id: string) => number | undefined
): number {
  const scored = scores.filter((s) => weightLookup(s.criterionId) !== undefined);
  const totalWeight = scored.reduce((sum, s) => sum + (weightLookup(s.criterionId) || 0), 0);
  if (totalWeight === 0) return 0;
  const weightedSum = scored.reduce(
    (sum, s) => sum + (weightLookup(s.criterionId) || 0) * s.score,
    0
  );
  return weightedSum / totalWeight;
}

export function readinessPercent(weighted: number): number {
  return (weighted / 5) * 100;
}

export function deriveFlags(scores: CriterionScore[]): Flags {
  return {
    red: scores.filter((s) => s.score <= 2).map((s) => s.criterionId),
    green: scores.filter((s) => s.score >= 4).map((s) => s.criterionId),
  };
}

export function scoreColor(score: number): "red" | "amber" | "green" {
  if (score <= 2) return "red";
  if (score >= 4) return "green";
  return "amber";
}
