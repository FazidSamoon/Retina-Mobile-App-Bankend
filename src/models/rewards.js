import Mongoose from "mongoose";

const rewardsScema = new Mongoose.Schema({
  user: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  expires_on: {
    type: Date,
  },
  points: {
    type: Number,
  },
  redeemed: {
    type: Number,
  },
});

const RewardsModel = Mongoose.model("Rewards", rewardsScema);
export default RewardsModel;
