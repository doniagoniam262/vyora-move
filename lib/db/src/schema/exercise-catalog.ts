import { createInsertSchema } from "drizzle-zod";
import { integer, jsonb, pgTable, text } from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export const exerciseCatalogTable = pgTable("exercise_catalog", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  latin: text("latin").notNull(),
  nameEn: text("name_en").notNull(),
  category: text("category").notNull(),
  level: text("level").notNull(),
  image: text("image").notNull(),
  duration: integer("duration").notNull(),
  reps: integer("reps"),
  sets: integer("sets").notNull(),
  instructions: jsonb("instructions").$type<string[]>().notNull(),
  safety: text("safety").notNull(),
  easier: text("easier").notNull(),
  sortOrder: integer("sort_order").notNull().unique(),
});

export const insertExerciseCatalogSchema = createInsertSchema(exerciseCatalogTable);
export type InsertExerciseCatalog = z.infer<typeof insertExerciseCatalogSchema>;
export type ExerciseCatalogRecord = typeof exerciseCatalogTable.$inferSelect;
