export interface CriterionScore {
  criterionId: string;
  score: number; // 1-5
  rationale: string;
  evidence: string;
}

export interface ComputedScores {
  weightedScore: number; // 1-5, role criteria
  readinessPercent: number; // 0-100
  culturalFitScore: number; // 1-5
  culturalFitPercent: number; // 0-100
  roleFlags: { red: string[]; green: string[] };
  culturalFitFlags: { red: string[]; green: string[] };
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  roleId: string;
  submittedAt: string; // ISO timestamp
  linkedinUrl: string;
  cvText: string;
  hasCv: boolean;
  categoryAnswers: Record<string, string>;
  traitAnswers: Record<string, string>;
  criterionScores: CriterionScore[];
  traitScores: CriterionScore[];
  computed: ComputedScores;
  scoringErrors: string[];
}

export interface SubmissionFields {
  name: string;
  email: string;
  linkedinUrl: string;
  categoryAnswers: Record<string, string>;
  traitAnswers: Record<string, string>;
}
