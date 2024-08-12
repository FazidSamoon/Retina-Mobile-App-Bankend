import Mongoose from "mongoose";

const userSchema = new Mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
    },
    email: {
      type: String,
      required: [true, "Please provide a email"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
    },
    date_of_birth: {
      type: Date,
    },
    phone: {
      type: String,
    },
    eye_deciease: {
      type: String,
    },
    location: {
      type: String,
    },
    occupation: {
      type: String,
    },
    is_loggedIn: {
      type: Boolean,
      default: false,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    passwordResetCode: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

const userModel = Mongoose.model("User", userSchema);
export default userModel;
