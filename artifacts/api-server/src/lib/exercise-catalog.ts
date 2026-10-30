import { asc } from "drizzle-orm";
import { db, exerciseCatalogTable } from "@workspace/db";
import { GetExercisesResponse } from "@workspace/api-zod";
import { exerciseCatalogSeed } from "./exercise-catalog-seed";

export async function ensureExerciseCatalogSeeded(): Promise<void> {
  await db
    .insert(exerciseCatalogTable)
    .values(exerciseCatalogSeed)
    .onConflictDoNothing();
}

export async function listExerciseCatalog() {
  const rows = await db
    .select()
    .from(exerciseCatalogTable)
    .orderBy(asc(exerciseCatalogTable.sortOrder));
  return GetExercisesResponse.parse(rows);
}
