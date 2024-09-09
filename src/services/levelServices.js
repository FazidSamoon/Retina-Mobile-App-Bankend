import levelModel from "../models/level";
import userModel from "../models/user";

export const usersCurrentLevelDetails = async (userId) => {
  console.log("hey");
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

export const getLeaderboard = async (currentUserId) => {
  try {
    const leaderboard = await levelModel
      .find({})
      .populate("user", "name") // Adjust the fields you want to retrieve from the User model
      .sort({ level: -1, xpGained: -1 }) // Sort by level first, then xpGained
      .exec();

    // Iterate through the leaderboard and set 'me' field
    const leaderboardWithMeFlag = leaderboard.map((entry) => ({
      ...entry._doc,
      me: entry.user._id.toString() === currentUserId.toString(),
    }));

    return leaderboardWithMeFlag;
  } catch (error) {
    console.error("Error retrieving leaderboard data:", error);
    throw error;
  }
};
