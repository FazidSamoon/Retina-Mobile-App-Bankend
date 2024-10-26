import Mongoose from "mongoose";

const timeSlotSchema = new Mongoose.Schema({
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
});

const channelingSchema = new Mongoose.Schema({
  doctor: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  user: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  timeSlot: {
    type: timeSlotSchema,
    required: true,
  },
  type: {
    type: String,
    enum: ["IN-HOUSE", "VIDEOCONFERENCE"],
    required: true,
  },
  payment: {
    type: String,
    enum: ["FREE", "VISA", "POINTS"],
    default: "FREE",
  },
  status: {
    type: String,
    enum: ["SCHEDULED", "COMPLETED", "CANCELLED", "PENDING"],
    default: "PENDINNG",
  },
  meetLink: {
    type: String,
  },
});

const channelingModel = Mongoose.model("Channeling", channelingSchema);
export default channelingModel;
