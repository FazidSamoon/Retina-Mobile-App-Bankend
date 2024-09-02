import userModel from "../models/user";
import {
  getAllVisionScoresByUser,
  recentFiveRecordsByUser,
  saveVisionTestScore,
} from "../repositary/visionTestRepositary";

export const addNewVisionTestScoreService = async (scoreObj, user) => {
  const userResponse = userModel.findById(user);

  if (!userResponse) return { status: 400, message: "User not found" };
  return saveVisionTestScore(scoreObj);
};

export const getAllVisionTestScoresByUserService = async (userId) => {
  const userResponse = userModel.findById(userId);

  if (!userResponse) return { status: 400, message: "User not found" };
  const scores = await getAllVisionScoresByUser(userId);
  return scores;
};

export const getMostRecentFiveRecords = async (userId) => {
  const userResponse = userModel.findById(userId);

  if (!userResponse) return { status: 400, message: "User not found" };

  const recentRecords = await recentFiveRecordsByUser(userId);
  if (recentRecords.length === 0) {
    return { status: 404, message: "No records found for this user" };
  }

  if (recentRecords.length === 5) {
    let totalLeftEyeScore = 0;
    let totalRightEyeScore = 0;

    recentRecords.forEach((record) => {
      totalLeftEyeScore += record.overrollTestScore.leftEye;
      totalRightEyeScore += record.overrollTestScore.rightEye;
    });

    const averageLeftEyeScore = totalLeftEyeScore / recentRecords.length;
    const averageRightEyeScore = totalRightEyeScore / recentRecords.length;

    return {
      leftEye: averageLeftEyeScore,
      rightEye: averageRightEyeScore,
    };
  } else {
    return { status: 400, message: "No enough records found for this user" };
  }
};

