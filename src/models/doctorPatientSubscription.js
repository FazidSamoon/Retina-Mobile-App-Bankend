import Mongoose from "mongoose";

const doctorPatientSubscriptionSchema = new Mongoose.Schema({
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
  subscriptionStartDate: {
    type: Date,
    default: new Date(),
  },
  subscriptionEndDate: {
    type: Date,
    default: () => {
      const today = new Date();
      return new Date(today.setFullYear(today.getFullYear() + 1));
    },
  },
  subscriptionType: {
    type: String,
    enum: ["INHOUSE", "VIDEOCONFERENCE", "OTHER"],
  },
  type: {
    type: String,
    enum: ["PAYED", "FREE"],
  },
});

const doctorPatientSubscriptionModel = Mongoose.model(
  "DoctorPatientSubscription",
  doctorPatientSubscriptionSchema
);

export default doctorPatientSubscriptionModel;
