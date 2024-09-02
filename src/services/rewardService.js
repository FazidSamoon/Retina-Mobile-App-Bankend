import RewardsModel from "../models/rewards";
import userModel from "../models/user";

export const getUsersRewardsService = async (userId) => {
  const user = await userModel.findById(userId);
  if (!user) return { status: 400, message: "User not found" };

  const currentYear = new Date().getFullYear();
  const reward = await RewardsModel.findOne({
    user: userId,
    year: currentYear,
  });

  let response = reward;
  if (!reward) {
    const expires = new Date(currentYear, 11, 31);
    const createObj = await RewardsModel.create({
      user: userId,
      year: currentYear,
      expires_on: expires,
      points: 0,
      redeemed: 0,
    });
    response = createObj;
  }
  return response;
};

export const updateUserRewardService = async (userId, changeValue) => {
  const user = await userModel.findById(userId);
  if (!user) return { status: 400, message: "User not found" };

  const currentYear = new Date().getFullYear();
  const updatedResult = await RewardsModel.findOneAndUpdate(
    {
      user: userId,
      year: currentYear,
    },
    {
      $inc: {
        points: changeValue,
      },
    },
    {
      new: true,
    }
  );

  return updatedResult
};
