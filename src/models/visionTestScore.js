import Mongoose from "mongoose";

const eyeTestResultSchema = new Mongoose.Schema({
  202.6: {
    type: Number,
    default: 0,
  },
  173.3: {
    type: Number,
    default: 0,
  },
  144: {
    type: Number,
    default: 0,
  },
  116: {
    type: Number,
    default: 0,
  },
  86.6: {
    type: Number,
    default: 0,
  },
  57.3: {
    type: Number,
    default: 0,
  },
  44: {
    type: Number,
    default: 0,
  },
  28: {
    type: Number,
    default: 0,
  },
  20: {
    type: Number,
    default: 0,
  },
  12: {
    type: Number,
    default: 0,
  },
});

const eyeSchema = new Mongoose.Schema({
  result: {
    type: eyeTestResultSchema,
    required: true,
  },
  status: {
    type: String,
    enum: ["Normal", "Abnormal"],
    default: "Normal",
  },
});

const visionTestStateSchema = new Mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  week: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  testCompleted: {
    type: Boolean,
    default: false,
  },
  testResults: {
    leftEye: {
      type: eyeSchema,
      required: true,
    },
    rightEye: {
      type: eyeSchema,
      required: true,
    },
  },
  user: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  overrollTestScore: {
    leftEye: {
      type: Number,
    },
    rightEye: {
      type: Number,
    },
  },
});

const VisionTestStateModel = Mongoose.model(
  "VisionTestState",
  visionTestStateSchema
);
export default VisionTestStateModel;
