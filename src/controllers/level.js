import userModel from "../models/user";
import { updateUsersLevel, usersCurrentLevelDetails } from "../services/levelServices";
import { makeResponse } from "../utils/response";

export const getUsersCurrentXpAndLevel = async (req, res) => {
  const userId = req.params.id;
  const response = await usersCurrentLevelDetails(userId);
  if (!response)
    return makeResponse({ res, status: 400, message: "Something went wrong" });
  if (response.status) return makeResponse({ res, ...response });
  makeResponse({
    res,
    status: 200,
    data: response,
    message: "Vison test levels retrived successfully",
  });
};

export const updateUserLevelDetails = async (req, res) => {
  const userId = req.params.id;
  const { changeValue } = req.body;
  const response = await updateUsersLevel(userId, changeValue);
  if (!response)
    return makeResponse({ res, status: 400, message: "Something went wrong" });
  if (response.status) return makeResponse({ res, ...response });
  makeResponse({
    res,
    status: 200,
    data: response,
    message: "Vison test levels retrived successfully",
  });
};
