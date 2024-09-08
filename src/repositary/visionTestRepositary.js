import VisionTestStateModel from "../models/visionTestScore";

export const saveVisionTestScore = async (scoreObj) => {
  return await VisionTestStateModel.create({ ...scoreObj });
};

export const getAllVisionScoresByUser = async (user) => {
  return await VisionTestStateModel.find({
    user: user,
  });
};

export const recentFiveRecordsByUser = async (user) => {
  return await VisionTestStateModel.find({
    user: user,
    testType: "LONG_DISTANCE",
  })
    .sort({ createdAt: -1 })
    .limit(5);
};

export const recentNearFiveRecordsByUser = async (user) => {
  return await VisionTestStateModel.find({
    user: user,
    testType: "NEAR_VISION",
  })
    .sort({ createdAt: -1 })
    .limit(5);
};
