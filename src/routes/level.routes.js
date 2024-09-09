import Express from "express";
import { getLeaderboardData, getUsersCurrentXpAndLevel, updateUserLevelDetails } from "../controllers/level";

const levelRouter = Express.Router();

levelRouter.get("/leaderboard/:id", getLeaderboardData)
levelRouter.get("/user/:id", getUsersCurrentXpAndLevel)
levelRouter.patch("/user/:id", updateUserLevelDetails)

export default levelRouter