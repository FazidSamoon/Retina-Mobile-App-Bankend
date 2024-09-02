import levelModel from "../models/level";
import userModel from "../models/user";

export const usersCurrentLevelDetails = async (userId) => {
  const user = await userModel.findById(userId);
  if (!user) return { status: 400, message: "User not found" };

  const currentYear = new Date().getFullYear();
  const userLevel = await levelModel.findOne({
    user: userId,
    year: currentYear,
  });

  let response;
  if (!userLevel) {
    response = await levelModel.create({
      user: userId,
      year: currentYear,
    });
  } else {
    response = userLevel;
  }

  return response;
};

export const updateUsersLevel = async (userId, changeValue) => {
  const user = await userModel.findById(userId);
  if (!user) return { status: 400, message: "User not found" };

  const currentYear = new Date().getFullYear();
  const currentLevel = await levelModel.findOne({
    user: userId,
    year: currentYear,
  });

  const level = currentLevel.level;
  const xpgained = currentLevel.xpGained;

  let updatedLevel = level;
  let updatedXpGained = xpgained;

  if (xpgained + changeValue > 100) {
    updatedLevel += 1;
    updatedXpGained = xpgained + changeValue - 100;
  } else {
    updatedXpGained += changeValue;
  }

  const updatedResult = await levelModel.findOneAndUpdate(
    {
      user: userId,
      year: currentYear,
    },
    {
      $set: {
        level: updatedLevel,
        xpGained: updatedXpGained,
      },
    },
    {
      new: true,
    }
  );

  return updatedResult;
};
