import Express from "express";
import {
  getUsersCurrentXpAndLevel,
  updateUserLevelDetails,
} from "../controllers/level";
import {
  getUsersRewards,
  redeemUserRewards,
  updateUsersRewards,
} from "../controllers/rewards";

const rewardRouter = Express.Router();

rewardRouter.get("/user/:id", getUsersRewards);
rewardRouter.patch("/user/:id", updateUsersRewards);
rewardRouter.patch("/redeem/:id", redeemUserRewards);

export default rewardRouter;
