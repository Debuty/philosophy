import { and, count, eq, ilike, or, type SQL } from "drizzle-orm";
import { db } from "../../db/index.js";
import {
  philosopherBios,
  philosophers,
  schools,
} from "../../db/schema/index.js";
import { AppError } from "../../lib/errors.js";
import type { ListPhilosophersQuery } from "./philosophers.schemas.js";

export type PhilosopherCardDto = {
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

function toCardDto(row: {
  id: number;
  nameEn: string;
  nameAr: string;
  birth: number | null;
  death: number | null;
  eraEn: string | null;
  eraAr: string | null;
  nationalityEn: string | null;
  nationalityAr: string | null;
  quoteEn: string | null;
  quoteAr: string | null;
  shortDescriptionEn: string | null;
  shortDescriptionAr: string | null;
  imageUrl: string | null;
  schoolEn: string | null;
  schoolAr: string | null;
}): PhilosopherCardDto {
  return {
    id: row.id,
    name_en: row.nameEn,
    name_ar: row.nameAr,
    birth: row.birth,
    death: row.death,
    era_en: row.eraEn,
    era_ar: row.eraAr,
    nationality_en: row.nationalityEn,
    nationality_ar: row.nationalityAr,
    school_en: row.schoolEn,
    school_ar: row.schoolAr,
    quote_en: row.quoteEn,
    quote_ar: row.quoteAr,
    short_description_en: row.shortDescriptionEn,
    short_description_ar: row.shortDescriptionAr,
    image: row.imageUrl,
  };
}

function buildFilters(query: ListPhilosophersQuery): SQL | undefined {
  const parts: SQL[] = [];

  if (query.search) {
    const term = `%${query.search}%`;
    parts.push(
      or(
        ilike(philosophers.nameEn, term),
        ilike(philosophers.nameAr, term),
        ilike(philosophers.shortDescriptionEn, term),
        ilike(philosophers.shortDescriptionAr, term),
      )!,
    );
  }

  if (query.era) {
    parts.push(eq(philosophers.eraSlug, query.era));
  }

  if (query.school) {
    parts.push(eq(schools.slug, query.school));
  }

  if (parts.length === 0) return undefined;
  if (parts.length === 1) return parts[0];
  return and(...parts);
}

const cardSelect = {
  id: philosophers.id,
  nameEn: philosophers.nameEn,
  nameAr: philosophers.nameAr,
  birth: philosophers.birth,
  death: philosophers.death,
  eraEn: philosophers.eraEn,
  eraAr: philosophers.eraAr,
  nationalityEn: philosophers.nationalityEn,
  nationalityAr: philosophers.nationalityAr,
  quoteEn: philosophers.quoteEn,
  quoteAr: philosophers.quoteAr,
  shortDescriptionEn: philosophers.shortDescriptionEn,
  shortDescriptionAr: philosophers.shortDescriptionAr,
  imageUrl: philosophers.imageUrl,
  schoolEn: schools.nameEn,
  schoolAr: schools.nameAr,
};

export async function listPhilosophers(query: ListPhilosophersQuery) {
  const where = buildFilters(query);

  const baseQuery = db
    .select(cardSelect)
    .from(philosophers)
    .leftJoin(schools, eq(philosophers.schoolId, schools.id))
    .where(where)
    .orderBy(philosophers.id);

  if (query.featured) {
    const rows = await baseQuery.limit(query.limit);
    return {
      data: rows.map(toCardDto),
    };
  }

  const offset = (query.page - 1) * query.pageSize;

  const [rows, totalRow] = await Promise.all([
    baseQuery.limit(query.pageSize).offset(offset),
    db
      .select({ total: count() })
      .from(philosophers)
      .leftJoin(schools, eq(philosophers.schoolId, schools.id))
      .where(where)
      .then((result) => result[0]),
  ]);

  const total = totalRow?.total ?? 0;

  return {
    data: rows.map(toCardDto),
    pagination: {
      page: query.page,
      pageSize: query.pageSize,
      total,
      totalPages: Math.ceil(total / query.pageSize) || 0,
    },
  };
}

export async function getPhilosopherBio(id: number) {
  const [row] = await db
    .select({
      philosopherId: philosophers.id,
      nameEn: philosophers.nameEn,
      nameAr: philosophers.nameAr,
      birth: philosophers.birth,
      death: philosophers.death,
      nationalityEn: philosophers.nationalityEn,
      nationalityAr: philosophers.nationalityAr,
      eraEn: philosophers.eraEn,
      eraAr: philosophers.eraAr,
      schoolEn: schools.nameEn,
      schoolAr: schools.nameAr,
      introEn: philosopherBios.introEn,
      introAr: philosopherBios.introAr,
      earlyLifeEn: philosopherBios.earlyLifeEn,
      earlyLifeAr: philosopherBios.earlyLifeAr,
      educationEn: philosopherBios.educationEn,
      educationAr: philosopherBios.educationAr,
      booksEn: philosopherBios.booksEn,
      booksAr: philosopherBios.booksAr,
      metaphysicsEn: philosopherBios.metaphysicsEn,
      metaphysicsAr: philosopherBios.metaphysicsAr,
      epistemologyEn: philosopherBios.epistemologyEn,
      epistemologyAr: philosopherBios.epistemologyAr,
      ethicsEn: philosopherBios.ethicsEn,
      ethicsAr: philosopherBios.ethicsAr,
      politicsEn: philosopherBios.politicsEn,
      politicsAr: philosopherBios.politicsAr,
      influenceLegacyEn: philosopherBios.influenceLegacyEn,
      influenceLegacyAr: philosopherBios.influenceLegacyAr,
      personalLifeEn: philosopherBios.personalLifeEn,
      personalLifeAr: philosopherBios.personalLifeAr,
      deathSectionEn: philosopherBios.deathSectionEn,
      deathSectionAr: philosopherBios.deathSectionAr,
      furtherReadingEn: philosopherBios.furtherReadingEn,
      furtherReadingAr: philosopherBios.furtherReadingAr,
      referencesEn: philosopherBios.referencesEn,
      referencesAr: philosopherBios.referencesAr,
    })
    .from(philosophers)
    .innerJoin(
      philosopherBios,
      eq(philosopherBios.philosopherId, philosophers.id),
    )
    .leftJoin(schools, eq(philosophers.schoolId, schools.id))
    .where(eq(philosophers.id, id))
    .limit(1);

  if (!row) {
    throw new AppError(404, "NOT_FOUND", "Philosopher bio not found");
  }

  return {
    philosopher_id: row.philosopherId,
    name_en: row.nameEn,
    name_ar: row.nameAr,
    birth: row.birth,
    death: row.death,
    nationality_en: row.nationalityEn,
    nationality_ar: row.nationalityAr,
    era_en: row.eraEn,
    era_ar: row.eraAr,
    school_en: row.schoolEn,
    school_ar: row.schoolAr,
    intro_en: row.introEn,
    intro_ar: row.introAr,
    early_life_en: row.earlyLifeEn,
    early_life_ar: row.earlyLifeAr,
    education_en: row.educationEn,
    education_ar: row.educationAr,
    books_en: row.booksEn,
    books_ar: row.booksAr,
    metaphysics_en: row.metaphysicsEn,
    metaphysics_ar: row.metaphysicsAr,
    epistemology_en: row.epistemologyEn,
    epistemology_ar: row.epistemologyAr,
    ethics_en: row.ethicsEn,
    ethics_ar: row.ethicsAr,
    politics_en: row.politicsEn,
    politics_ar: row.politicsAr,
    influence_legacy_en: row.influenceLegacyEn,
    influence_legacy_ar: row.influenceLegacyAr,
    personal_life_en: row.personalLifeEn,
    personal_life_ar: row.personalLifeAr,
    death_en: row.deathSectionEn,
    death_ar: row.deathSectionAr,
    further_reading_en: row.furtherReadingEn,
    further_reading_ar: row.furtherReadingAr,
    references_en: row.referencesEn,
    references_ar: row.referencesAr,
  };
}
