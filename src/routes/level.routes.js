import Express from "express";
import { getUsersCurrentXpAndLevel, updateUserLevelDetails } from "../controllers/level";

const levelRouter = Express.Router();

levelRouter.get("/user/:id", getUsersCurrentXpAndLevel)
levelRouter.patch("/user/:id", updateUserLevelDetails)

export default levelRouter