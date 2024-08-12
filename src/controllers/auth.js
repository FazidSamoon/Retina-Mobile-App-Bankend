import {
  authLogin,
  authRegister,
  createNewUser,
  resetPasswordService,
  resetPasswordWithCodeService,
} from "../services/authServices.js";
import { makeResponse } from "../utils/response.js";
import { badRequest } from "../errors/badRequest.js";
import { generateAccessToken } from "../utils/jwt.js";
import userModel from "../models/user.js";
import { sendEmail } from "../services/emailService.js";
import crypto from "crypto";

export const registerUser = async (req, res) => {
  const user = await authRegister(req.body);
  if (!user)
    return makeResponse({
      res,
      status: 500,
      message: "Registration failed...",
    });
  if (user.status) return makeResponse({ res, ...user });
  const { password, ...otherDetails } = user;
  const accessToken = await generateAccessToken(otherDetails);

  return makeResponse({
    res,
    status: 200,
    data: { otherDetails, token: accessToken },
    messsage: "User creation successfull...",
  });
};

export const loginUser = async (req, res) => {
  const user = await authLogin(req.body);
  if (!user)
    return makeResponse({ res, status: 400, message: "Login failed..." });
  if (user.status) return makeResponse({ res, ...user });
  const { password, ...otherDetails } = user._doc;
  const accessToken = await generateAccessToken(otherDetails);
  return makeResponse({
    res,
    status: 200,
    data: { otherDetails, token: accessToken },
    message: "User login successfull...",
  });
};

export const resetPassword = async (req, res) => {
  if (req?.body?.password !== req?.body?.confirmPassword)
    throw new badRequest("Password and confirm password does not match");
  const response = await resetPasswordService(req.body);
  if (!response)
    return makeResponse({
      response,
      status: 400,
      message: "Reset password process failed...",
    });
  if (response.status) return makeResponse({ res, ...response });
  const { password, ...otherDetails } = response._doc;
  return makeResponse({
    res,
    status: 200,
    data: otherDetails,
    message: "Reset password process successfull...",
  });
};

export const createUser = async (req, res) => {
  const user = await createNewUser(req.body);
  if (!user)
    return makeResponse({
      res,
      status: 500,
      message: "Registration failed...",
    });
  if (user.status) return makeResponse({ res, ...user });
  const { password, ...otherDetails } = user;
  const accessToken = await generateAccessToken(otherDetails);

  return makeResponse({
    res,
    status: 200,
    data: { otherDetails, token: accessToken },
    messsage: "User creation successfull...",
  });
};

export const updateUserInfo = async (req, res) => {
  const user = await userModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  if (!user)
    return makeResponse({
      res,
      status: 500,
      message: "Registration failed...",
    });
  const { password, ...otherDetails } = user._doc;
  return makeResponse({
    res,
    status: 200,
    data: otherDetails,
    messsage: "User creation successfull...",
  });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return makeResponse({ res, status: 404, message: "User not found" });
  }

  // Generate a verification code
  crypto.randomUUID
  const verificationCode = crypto.randomBytes(3).toString("hex"); // Generates a 6-digit code
  user.passwordResetCode = verificationCode;
  user.passwordResetExpires = Date.now() + 3600000; // 1 hour from now

  await user.save();

  // Create an email template
  const emailTemplate = `
    <h1>Password Reset Request</h1>
    <p>Your password reset verification code is: <strong>${verificationCode}</strong></p>
    <p>This code is valid for the next 1 hour.</p>
  `;

  try {
    // Send the email with the verification code
    await sendEmail({
      to: email,
      subject: "Password Reset Verification Code",
      template: emailTemplate,
    });

    return makeResponse({
      res,
      status: 200,
      message: "Verification code sent to email",
    });
  } catch (error) {
    console.log(error)
    return makeResponse({ res, status: 500, message: "Error sending email" });
  }
};

export const resetPasswordWithCode = async (req, res) => {
  const { email, verificationCode, newPassword, confirmPassword } = req.body;

  const response = await resetPasswordWithCodeService(
    email,
    verificationCode,
    newPassword,
    confirmPassword
  );

  if (response.status) return makeResponse({ res, ...response });
  const { password, ...otherDetails } = response._doc;
  return makeResponse({
    res,
    status: 200,
    data: otherDetails,
    message: "Password has been reset successfully",
  });
};
