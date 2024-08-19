import Express from "express";
import {
  getAllTestScoreResultsByUser,
  getAverageTestScoreResultByUser,
  saveVisionTestScore,
} from "../controllers/visionTestScore";

const testResultsRouter = Express.Router();

testResultsRouter.get("/:id", getAllTestScoreResultsByUser);
testResultsRouter.post("/", saveVisionTestScore);
testResultsRouter.get("/average-user/:id", getAverageTestScoreResultByUser);

export default testResultsRouter;
