import {
  boolean,
  check,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: varchar("email", { length: 320 }).notNull().unique(),
    passwordHash: varchar("password_hash", { length: 255 }).notNull(),
    emailConfirmed: boolean("email_confirmed").notNull().default(false),
    role: varchar("role", { length: 20 }).notNull().default("user"),
    phone: varchar("phone", { length: 20 }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [check("ck_users_role", sql`${table.role} IN ('user', 'admin')`)],
);

export const profiles = pgTable("profiles", {
  id: uuid("id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  username: varchar("username", { length: 50 }).notNull().unique(),
  fullName: varchar("full_name", { length: 200 }),
  bio: text("bio"),
  avatarUrl: varchar("avatar_url", { length: 500 }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const schools = pgTable("schools", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  nameEn: varchar("name_en", { length: 200 }).notNull(),
  nameAr: varchar("name_ar", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  descriptionEn: text("description_en"),
  descriptionAr: text("description_ar"),
  foundedPeriod: varchar("founded_period", { length: 100 }),
  imageUrl: varchar("image_url", { length: 500 }),
});

export const philosophers = pgTable("philosophers", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  nameEn: varchar("name_en", { length: 200 }).notNull(),
  nameAr: varchar("name_ar", { length: 200 }).notNull(),
  birth: integer("birth"),
  death: integer("death"),
  eraEn: varchar("era_en", { length: 100 }),
  eraAr: varchar("era_ar", { length: 100 }),
  eraSlug: varchar("era_slug", { length: 50 }),
  nationalityEn: varchar("nationality_en", { length: 100 }),
  nationalityAr: varchar("nationality_ar", { length: 100 }),
  quoteEn: varchar("quote_en", { length: 500 }),
  quoteAr: varchar("quote_ar", { length: 500 }),
  shortDescriptionEn: text("short_description_en"),
  shortDescriptionAr: text("short_description_ar"),
  imageUrl: varchar("image_url", { length: 500 }),
  schoolId: integer("school_id").references(() => schools.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const philosopherBios = pgTable("philosopher_bios", {
  philosopherId: integer("philosopher_id")
    .primaryKey()
    .references(() => philosophers.id, { onDelete: "cascade" }),
  introEn: text("intro_en"),
  introAr: text("intro_ar"),
  earlyLifeEn: text("early_life_en"),
  earlyLifeAr: text("early_life_ar"),
  educationEn: text("education_en"),
  educationAr: text("education_ar"),
  booksEn: text("books_en"),
  booksAr: text("books_ar"),
  metaphysicsEn: text("metaphysics_en"),
  metaphysicsAr: text("metaphysics_ar"),
  epistemologyEn: text("epistemology_en"),
  epistemologyAr: text("epistemology_ar"),
  ethicsEn: text("ethics_en"),
  ethicsAr: text("ethics_ar"),
  politicsEn: text("politics_en"),
  politicsAr: text("politics_ar"),
  influenceLegacyEn: text("influence_legacy_en"),
  influenceLegacyAr: text("influence_legacy_ar"),
  personalLifeEn: text("personal_life_en"),
  personalLifeAr: text("personal_life_ar"),
  deathSectionEn: text("death_section_en"),
  deathSectionAr: text("death_section_ar"),
  furtherReadingEn: text("further_reading_en"),
  furtherReadingAr: text("further_reading_ar"),
  referencesEn: text("references_en"),
  referencesAr: text("references_ar"),
});

export const articles = pgTable(
  "articles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 300 }).notNull(),
    subtitle: varchar("subtitle", { length: 500 }).notNull(),
    content: text("content").notNull(),
    category: varchar("category", { length: 100 }).notNull(),
    state: varchar("state", { length: 20 }).notNull().default("draft"),
    authorId: uuid("author_id")
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [check("ck_articles_state", sql`${table.state} IN ('draft', 'published')`)],
);

export const articleReactions = pgTable(
  "article_reactions",
  {
    articleId: uuid("article_id")
      .notNull()
      .references(() => articles.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    reaction: varchar("reaction", { length: 10 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.articleId, table.userId] }),
    check("ck_article_reactions_reaction", sql`${table.reaction} IN ('like', 'dislike')`),
  ],
);

export const comments = pgTable(
  "comments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    articleId: uuid("article_id")
      .notNull()
      .references(() => articles.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    parentId: uuid("parent_id").references((): any => comments.id),
    content: text("content").notNull(),
    depth: integer("depth").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [check("ck_comments_depth", sql`${table.depth} >= 0 AND ${table.depth} <= 5`)],
);

export const commentReactions = pgTable(
  "comment_reactions",
  {
    commentId: uuid("comment_id")
      .notNull()
      .references(() => comments.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    reaction: varchar("reaction", { length: 10 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.commentId, table.userId] }),
    check("ck_comment_reactions_reaction", sql`${table.reaction} IN ('like', 'dislike')`),
  ],
);

export const articleBookmarks = pgTable(
  "article_bookmarks",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    articleId: uuid("article_id")
      .notNull()
      .references(() => articles.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.articleId] })],
);

export const books = pgTable("books", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  titleEn: varchar("title_en", { length: 300 }).notNull(),
  titleAr: varchar("title_ar", { length: 300 }).notNull(),
  authorEn: varchar("author_en", { length: 200 }),
  authorAr: varchar("author_ar", { length: 200 }),
  descriptionEn: text("description_en"),
  descriptionAr: text("description_ar"),
  coverImageUrl: varchar("cover_image_url", { length: 500 }),
  publishedYear: integer("published_year"),
});

export const userBookLists = pgTable(
  "user_book_lists",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    bookId: integer("book_id")
      .notNull()
      .references(() => books.id, { onDelete: "cascade" }),
    listType: varchar("list_type", { length: 20 }).notNull(),
    addedAt: timestamp("added_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.bookId, table.listType] }),
    check(
      "ck_user_book_lists_list_type",
      sql`${table.listType} IN ('to_read', 'reading', 'read', 'favorite')`,
    ),
  ],
);
