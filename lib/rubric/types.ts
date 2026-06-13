export interface Anchor {
  score: 1 | 3 | 5;
  description: string;
}

export interface Criterion {
  id: string;
  name: string;
  whyItMatters: string;
  weight: 1 | 2 | 3;
  anchors: [Anchor, Anchor, Anchor];
}

export interface Category {
  id: string;
  name: string;
  prompt: string;
  criteria: Criterion[];
}

export interface RoleRubric {
  roleId: string;
  roleName: string;
  jobTitle: string;
  org: string;
  location: string;
  description: string;
  responsibilities: string[];
  aboutYou: string[];
  categories: Category[];
}

export interface CulturalFitTrait {
  id: string;
  name: string;
  whyItMatters: string;
  probeQuestion: string;
  weight: 1 | 2 | 3;
  anchors: [Anchor, Anchor, Anchor];
}

export interface CulturalFitRubric {
  traits: CulturalFitTrait[];
}
