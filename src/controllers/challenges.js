import {
  checkChallangeAvailabilityByUserService,
  getMonthlyChallanges,
  updateUsersChallenges,
} from "../services/challangesServices";
import { getMonthName } from "../utils/commonUtil";
import { makeResponse } from "../utils/response";

export const checkChallengesAvailabilityByUser = async (req, res) => {
  const currentYear = new Date().getFullYear();
  const user = req.params.id;
  const response = await checkChallangeAvailabilityByUserService(
    currentYear,
    user
  );
  if (!response)
    return makeResponse({ res, status: 400, message: "Something went wrong" });
  if (response.status) return makeResponse({ res, ...response });
  makeResponse({
    res,
    status: 200,
    data: response,
    message: "Vison test challange retrived successfully",
  });
};

export const getMonthlyChallangesForUser = async (req, res) => {
  const currentMonth = new Date().getMonth();
  const user = req.params.id;
  const response = await getMonthlyChallanges(user, getMonthName(currentMonth));
  if (!response)
    return makeResponse({ res, status: 400, message: "Something went wrong" });
  if (response.status) return makeResponse({ res, ...response });
  makeResponse({
    res,
    status: 200,
    data: response,
    message: "Vison test challange retrived successfully",
  });
};

export const updateChallengeByUser = async (req, res) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const user = req.params.id;
  const { challengesIds } = req.body;
  const response = await updateUsersChallenges(
    user,
    getMonthName(currentMonth),
    currentYear,
    challengesIds
  );
  if (!response)
    return makeResponse({ res, status: 400, message: "Something went wrong" });
  if (response.status) return makeResponse({ res, ...response });
  makeResponse({
    res,
    status: 200,
    data: response,
    message: "Vison test challange updated successfully",
  });
};
