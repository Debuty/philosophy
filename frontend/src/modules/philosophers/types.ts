export type EraSlug =
  | "ancient"
  | "medieval"
  | "earlyModern"
  | "modern"
  | "contemporary";

export type SchoolSlug =
  | "idealism"
  | "materialism"
  | "existentialism"
  | "stoicism"
  | "epicureanism"
  | "rationalism"
  | "empiricism";

export type PhilosopherCard = {
  id: number;
  name_en: string;
  name_ar: string;
  birth: number | null;
  death: number | null;
  era_en: string | null;
  era_ar: string | null;
  nationality_en: string | null;
  nationality_ar: string | null;
  school_en: string | null;
  school_ar: string | null;
  quote_en: string | null;
  quote_ar: string | null;
  short_description_en: string | null;
  short_description_ar: string | null;
  image: string | null;
};

export type PhilosopherBio = {
  philosopher_id: number;
  name_en: string;
  name_ar: string;
  birth: number | null;
  death: number | null;
  nationality_en: string | null;
  nationality_ar: string | null;
  era_en: string | null;
  era_ar: string | null;
  school_en: string | null;
  school_ar: string | null;
  intro_en: string | null;
  intro_ar: string | null;
  early_life_en: string | null;
  early_life_ar: string | null;
  education_en: string | null;
  education_ar: string | null;
  books_en: string | null;
  books_ar: string | null;
  metaphysics_en: string | null;
  metaphysics_ar: string | null;
  epistemology_en: string | null;
  epistemology_ar: string | null;
  ethics_en: string | null;
  ethics_ar: string | null;
  politics_en: string | null;
  politics_ar: string | null;
  influence_legacy_en: string | null;
  influence_legacy_ar: string | null;
  personal_life_en: string | null;
  personal_life_ar: string | null;
  death_en: string | null;
  death_ar: string | null;
  further_reading_en: string | null;
  further_reading_ar: string | null;
  references_en: string | null;
  references_ar: string | null;
};

export type ListPhilosophersParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  era?: EraSlug | "";
  school?: SchoolSlug | "";
};

export type PhilosophersPagination = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type PhilosophersListResult = {
  data: PhilosopherCard[];
  pagination: PhilosophersPagination;
};
