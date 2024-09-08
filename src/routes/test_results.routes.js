import Express from "express";
import {
  getAllTestScoreResultsByUser,
  getAverageNearTestScoreResultByUser,
  getAverageTestScoreResultByUser,
  overollNearTestScoreStat,
  overollTestScoreStat,
  saveVisionTestScore,
} from "../controllers/visionTestScore";

const testResultsRouter = Express.Router();

testResultsRouter.get("/:id", getAllTestScoreResultsByUser);
testResultsRouter.post("/", saveVisionTestScore);
testResultsRouter.get("/average-user/:id", getAverageTestScoreResultByUser);
testResultsRouter.get("/average-user-near/:id", getAverageNearTestScoreResultByUser);
testResultsRouter.get("/user-stats/:id", overollTestScoreStat);
testResultsRouter.get("/user-stats-near/:id", overollNearTestScoreStat);
// testResultsRouter.get("/check-challange-availability/:id",  )

export default testResultsRouter;
