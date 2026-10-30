import { Router, type IRouter } from "express";
import { listExerciseCatalog } from "../lib/exercise-catalog";

const router: IRouter = Router();

router.get("/exercises", async (req, res): Promise<void> => {
  const exercises = await listExerciseCatalog();
  req.log.info({ count: exercises.length }, "Fetched exercise catalog");
  res.json(exercises);
});

export default router;
