import Express from "express";
import { checkChallengesAvailabilityByUser, getMonthlyChallangesForUser, updateChallengeByUser } from "../controllers/challenges";

const challengesRouter = Express.Router();

challengesRouter.get("/check-challange-availability/:id", checkChallengesAvailabilityByUser )
challengesRouter.get("/monthly-challange/:id", getMonthlyChallangesForUser)
challengesRouter.patch("/update-completion/:id", updateChallengeByUser)
export default challengesRouter;