import { addNewVisionTestScoreService } from "../services/visionTestScoreService";
import { makeResponse } from "../utils/response";

export const saveVisionTestScore = async (req, res) => {
  const user = req?.user;
  const response = await addNewVisionTestScoreService(req.body, user);
  if (!response)
    return makeResponse({ res, status: 400, message: "Something went wrong" });
  if (response.status) return makeResponse({ res, ...response });
  makeResponse({
    res,
    status: 200,
    data: response,
    message: "Product added successfully",
  });
};

export const getAllTestScoreResultsByUser = async (req, res) => {}

export const getAverageTestScoreResultByUser = async (req, res) => {}