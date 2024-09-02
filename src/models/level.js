import Mongoose from "mongoose";

const levelScema = new Mongoose.Schema({
  user: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  level: {
    type: Number,
    default: 1,
  },
  xpGained: {
    type: Number,
    default: 0,
  },
  maxXpPerLevel: {
    type: Number,
    default: 100,
  },
});

const levelModel = Mongoose.model("Levels", levelScema);
export default levelModel;