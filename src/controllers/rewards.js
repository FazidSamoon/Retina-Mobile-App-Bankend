import {
  getUsersRewardsService,
  redeemUserRewardService,
  updateUserRewardService,
} from "../services/rewardService";
import { makeResponse } from "../utils/response";

export const getUsersRewards = async (req, res) => {
  const userId = req.params.id;
  const response = await getUsersRewardsService(userId);
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

export const updateUsersRewards = async (req, res) => {
  const userId = req.params.id;
  const { changeValue } = req.body;
  const response = await updateUserRewardService(userId, changeValue);
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

export const redeemUserRewards = async (req, res) => {
  const userId = req.params.id;
  const { changeValue } = req.body;

  const response = await redeemUserRewardService(userId, changeValue);
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
