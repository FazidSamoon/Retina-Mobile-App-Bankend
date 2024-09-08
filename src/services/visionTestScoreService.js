import userModel from "../models/user";
import VisionTestStateModel from "../models/visionTestScore";
import {
  getAllVisionScoresByUser,
  recentFiveRecordsByUser,
  recentNearFiveRecordsByUser,
  saveVisionTestScore,
} from "../repositary/visionTestRepositary";

export const addNewVisionTestScoreService = async (scoreObj, user) => {
  const userResponse = userModel.findById(user);

  if (!userResponse) return { status: 400, message: "User not found" };
  return saveVisionTestScore(scoreObj);
};

export const getAllVisionTestScoresByUserService = async (userId) => {
  const userResponse = userModel.findById(userId);

  if (!userResponse) return { status: 400, message: "User not found" };
  const scores = await getAllVisionScoresByUser(userId);
  return scores;
};

export const getMostRecentFiveRecords = async (userId) => {
  const userResponse = userModel.findById(userId);

  if (!userResponse) return { status: 400, message: "User not found" };

  const recentRecords = await recentFiveRecordsByUser(userId);
  if (recentRecords.length === 0) {
    return { status: 404, message: "No records found for this user" };
  }

  if (recentRecords.length === 5) {
    let totalLeftEyeScore = 0;
    let totalRightEyeScore = 0;

    recentRecords.forEach((record) => {
      totalLeftEyeScore += record.overrollTestScore.leftEye;
      totalRightEyeScore += record.overrollTestScore.rightEye;
    });

    const averageLeftEyeScore = totalLeftEyeScore / recentRecords.length;
    const averageRightEyeScore = totalRightEyeScore / recentRecords.length;

    return {
      leftEye: averageLeftEyeScore,
      rightEye: averageRightEyeScore,
    };
  } else {
    return { status: 400, message: "No enough records found for this user" };
  }
};

export const getMostNearRecentFiveRecords = async (userId) => {
  const userResponse = userModel.findById(userId);

  if (!userResponse) return { status: 400, message: "User not found" };

  const recentRecords = await recentNearFiveRecordsByUser(userId);
  if (recentRecords.length === 0) {
    return { status: 404, message: "No records found for this user" };
  }

  if (recentRecords.length === 5) {
    let totalLeftEyeScore = 0;
    let totalRightEyeScore = 0;

    recentRecords.forEach((record) => {
      totalLeftEyeScore += record.overrollTestScore.leftEye;
      totalRightEyeScore += record.overrollTestScore.rightEye;
    });

    const averageLeftEyeScore = totalLeftEyeScore / recentRecords.length;
    const averageRightEyeScore = totalRightEyeScore / recentRecords.length;

    return {
      leftEye: averageLeftEyeScore,
      rightEye: averageRightEyeScore,
    };
  } else {
    return { status: 400, message: "No enough records found for this user" };
  }
};

export const testScoreStatService = async (userId, month, year) => {
  if (!userId || userId === undefined) {
    return { status: 400, message: "User not found" };
  }

  const userResponse = userModel.findById(userId);
  if (!userResponse) return { status: 400, message: "User not found" };

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59, 999);

  const testResults = await VisionTestStateModel.find({
    user: userId,
    date: {
      $gte: startDate,
      $lt: endDate,
    }
  });

  const labels = [];
  const leftEyeData = [];
  const rightEyeData = [];

  testResults.forEach((result) => {
    const dateLabel = `${String(result.date.getDate()).padStart(
      2,
      "0"
    )}/${String(result.date.getMonth() + 1).padStart(2, "0")}`;
    labels.push(dateLabel);

    leftEyeData.push(result.overrollTestScore?.leftEye || 0);
    rightEyeData.push(result.overrollTestScore?.rightEye || 0);
  });

  const response = {
    labels,
    datasets: [
      {
        data: leftEyeData,
        color: generateRandomColor(),
        strokeWidth: 2,
        itemName: "Left eye",
      },
      {
        data: rightEyeData,
        color: generateRandomColor(),
        strokeWidth: 2,
        itemName: "Right eye",
      },
    ],
  };

  console.log("res ", response)
  return response;
};

const generateRandomColor = () => {
  const randomBetween = (min, max) =>
    min + Math.floor(Math.random() * (max - min + 1));
  const r = randomBetween(0, 255);
  const g = randomBetween(0, 255);
  const b = randomBetween(0, 255);
  const rgb = `rgba(${r},${g},${b}, 1)`;
  return rgb;
};

//remove later
export const nearTestScoreStatService = async (
  userId,
  month,
  year,
  testType = "NEAR_VISION"
) => {
  if (!userId) {
    return { status: 400, message: "User not found" };
  }
  const userResponse = userModel.findById(userId);
  if (!userResponse) return { status: 400, message: "User not found" };

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59, 999);

  const testResults = await VisionTestStateModel.find({
    user: userId,
    date: {
      $gte: startDate,
      $lt: endDate,
    },
    testType,
  });

  const labels = [];
  const leftEyeData = [];
  const rightEyeData = [];

  testResults.forEach((result) => {
    const dateLabel = `${String(result.date.getDate()).padStart(
      2,
      "0"
    )}/${String(result.date.getMonth() + 1).padStart(2, "0")}`;
    labels.push(dateLabel);

    leftEyeData.push(result.overrollTestScore?.leftEye || 0);
    rightEyeData.push(result.overrollTestScore?.rightEye || 0);
  });

  const response = {
    labels,
    datasets: [
      {
        data: leftEyeData,
        color: generateRandomColor(),
        strokeWidth: 2,
        itemName: "Left eye",
      },
      {
        data: rightEyeData,
        color: generateRandomColor(),
        strokeWidth: 2,
        itemName: "Right eye",
      },
    ],
  };

  return response;
};

export const getAllResults = async (userId, month, year) => {
  try {
    if (!userId) {
      return { status: 400, message: "User not found" };
    }
    const userResponse = await userModel.findById(userId);
    if (!userResponse) return { status: 400, message: "User not found" };

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    const results = await VisionTestStateModel.find({
      user: userId,
      date: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    return results;
  } catch (error) {
    console.log(error);
  }
};
