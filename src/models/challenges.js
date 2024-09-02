import Mongoose from "mongoose";

const taskSchema = new Mongoose.Schema({
  id: { type: Number, required: true },
  task: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["COMPLETED", "PENDING"],
  },
  dificulty: { type: String, required: true },
  identification: { type: [String], required: true },
  scorePoints: { type: Number, required: true },
  minDistanceRequirement: { type: Number, required: false },
});

const monthlyChallengesSchema = new Mongoose.Schema(
  {
    JANUARY: { type: [taskSchema], default: [] },
    FEBRUARY: { type: [taskSchema], default: [] },
    MARCH: { type: [taskSchema], default: [] },
    APRIL: { type: [taskSchema], default: [] },
    MAY: { type: [taskSchema], default: [] },
    JUNE: { type: [taskSchema], default: [] },
    JULY: { type: [taskSchema], default: [] },
    AUGUST: { type: [taskSchema], default: [] },
    SEPTEMBER: { type: [taskSchema], default: [] },
    OCTOBER: { type: [taskSchema], default: [] },
    NOVEMBER: { type: [taskSchema], default: [] },
    DECEMBER: { type: [taskSchema], default: [] },
  },
  { _id: false }
);

const challengesSchema = new Mongoose.Schema(
  {
    year: { type: Number, required: true },
    user: { type: Mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    challenges: { type: monthlyChallengesSchema, required: true },
  },
  {
    timestamps: true,
  }
);

const ChallengesModel = Mongoose.model("Challenges", challengesSchema);
export default ChallengesModel;
