import VisionTestStateModel from "../models/visionTestScore";

export const saveVisionTestScore = async (scoreObj) => {
  return await VisionTestStateModel.create({ ...scoreObj });
};
