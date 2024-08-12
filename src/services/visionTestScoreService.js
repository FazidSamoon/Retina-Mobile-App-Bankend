import userModel from "../models/user";
import { saveVisionTestScore } from "../repositary/visionTestRepositary";

export const addNewVisionTestScoreService = async (scoreObj, user) => {
  const user = userModel.findById(user._id);

  if (!user) return { status: 400, message: "User not found" };
  return saveVisionTestScore(scoreObj);
};
