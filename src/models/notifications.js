import Mongoose from "mongoose";

const notificationSchema = new Mongoose.Schema(
  {
    userId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: [true, "Please provide a notification message"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const notificationModel = Mongoose.model("Notification", notificationSchema);
export default notificationModel;
