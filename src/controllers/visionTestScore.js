import { addNewVisionTestScoreService, getAllVisionTestScoresByUserService, getMostRecentFiveRecords } from "../services/visionTestScoreService";
import { makeResponse } from "../utils/response";

export const saveVisionTestScore = async (req, res) => {
  const user = req?.body?.user;
  const response = await addNewVisionTestScoreService(req.body, user);
  if (!response)
    return makeResponse({ res, status: 400, message: "Something went wrong" });
  if (response.status) return makeResponse({ res, ...response });
  makeResponse({
    res,
    status: 200,
    data: response,
    message: "Vison test score added successfully",
  });
};

export const getAllTestScoreResultsByUser = async (req, res) => {
  const user = req.params.id
  const response = await getAllVisionTestScoresByUserService(user)
  if (!response)
    return makeResponse({ res, status: 400, message: "Something went wrong" });
  if (response.status) return makeResponse({ res, ...response });
  makeResponse({
    res,
    status: 200,
    data: response,
    message: "Vison test scores retrived successfully",
  });
}

export const getAverageTestScoreResultByUser = async (req, res) => {
  const user = req.params.id
  const response = await getMostRecentFiveRecords(user)
  if (!response)
    return makeResponse({ res, status: 400, message: "Something went wrong" });
  if (response.status) return makeResponse({ res, ...response });
  makeResponse({
    res,
    status: 200,
    data: response,
    message: "Vison test scores retrived successfully",
  });
}

