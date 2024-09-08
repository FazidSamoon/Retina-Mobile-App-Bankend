import Mongoose from "mongoose";

const timePeriodSchema = new Mongoose.Schema({
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
});

const channelingScheduleSchema = new Mongoose.Schema({
  MONDAY: [timePeriodSchema],
  TUESDAY: [timePeriodSchema],
  WEDNESDAY: [timePeriodSchema],
  THURSDAY: [timePeriodSchema],
  FRIDAY: [timePeriodSchema],
  SATURDAY: [timePeriodSchema],
  SUNDAY: [timePeriodSchema],
});

const doctorSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a username"],
    },
    email: {
      type: String,
      required: [true, "Please provide a email"],
      unique: true,
    },
    location: {
      type: String,
    },
    occupation: {
      type: String,
    },
    phone: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
    },
    user: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    channelingSchedule: {
      type: channelingScheduleSchema,
      required: false,
    },
  },
  { timestamps: true }
);

const doctorModel = Mongoose.model("Doctor", doctorSchema);
export default doctorModel;
