import { challenges } from "../data/challenges";
import ChallengesModel from "../models/challenges";
import userModel from "../models/user";

export const checkChallangeAvailabilityByUserService = async (year, userId) => {
  const userResponse = userModel.findById(userId);

  if (!userResponse) return { status: 400, message: "User not found" };

  const challange = await ChallengesModel.findOne({
    year: year,
    user: userId,
  });

  console.log(challange);
  if (!challange) {
    const challangeBody = {
      challenges: challenges,
      year,
      user: userId,
    };

    return await ChallengesModel.create(challangeBody);
  } else return challange;
};

export const getMonthlyChallanges = async (userId, month) => {
  const userResponse = userModel.findById(userId);

  if (!userResponse) return { status: 400, message: "User not found" };

  const userChallenges = await ChallengesModel.findOne({
    user: userId,
    year: new Date().getFullYear(),
  });
  if (userChallenges) {
    const monthTasks = userChallenges.challenges[month.toUpperCase()];
    return monthTasks || [];
  } else {
    return [];
  }
};

export const updateUsersChallenges = async (
  userId,
  month,
  year,
  challengesIds
) => {
  const userResponse = userModel.findById(userId);

  if (!userResponse) return { status: 400, message: "User not found" };

  const challengesForMonth = await ChallengesModel.findOne({
    user: userId,
    year: year,
  });
  const currentMonthChallenges =
    challengesForMonth.challenges[month.toUpperCase()];
  const challengesList = [];

  currentMonthChallenges.forEach(async (element) => {
    if (challengesIds.includes(element._id.toString())) {
      const query = {
        user: userId,
        year: year,
        [`challenges.${month.toUpperCase()}._id`]: element._id,
      };
      const update = {
        $set: { [`challenges.${month.toUpperCase()}.$.status`]: "COMPLETED" },
      };
      const result = await ChallengesModel.updateOne(query, update);

      console.log(result);
      if (result.acknowledged && result.modifiedCount === 1) {
        element.status = "COMPLETED"
        challengesList.push(element);
      }
    } else {
      challengesList.push(element);
    }
  });
  return challengesList;
};
