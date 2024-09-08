import doctorModel from "../models/doctor";
import doctorPatientSubscriptionModel from "../models/doctorPatientSubscription";
import userModel from "../models/user";
import { sendEmail } from "./emailService";

export const createDoctor = async (data, userId) => {
  try {
    const doctor = await doctorModel.create({
      ...data,
      user: userId,
    });
    return doctor;
  } catch (error) {
    return { status: 400, message: "Something went wrong" };
  }
};

export const subscriptionService = async (docId, data) => {
  try {
    const doctor = await doctorModel.find({
      user: docId,
    });
    if (!doctor) return { status: 400, message: "Doctor not found" };

    const user = await userModel.findOne({
      email: data.email,
    });
    console.log("user ", user);
    if (!user) return { status: 400, message: "User not found" };

    const subscription = await doctorPatientSubscriptionModel.create({
      doctor: docId,
      user: user._id,
      subscriptionType: data.subscriptionType,
      type: "FREE",
    });

    if (!subscription) return { status: 400, message: "Subscription Failed" };
    invitePatient(user.email);
    return subscription;
  } catch (error) {
    return { status: 400, message: "Something went wrong" };
  }
};

const invitePatient = async (email) => {
  const emailTemplate = `
    <h1>You have been invited by Doctor</h1>
    <p>You have been invited by your doctor and now you can closely work with them</p>
    <p>Please chcek your application for more info</p>
  `;

  try {
    // Send the email with the verification code
    await sendEmail({
      to: email,
      subject: "Password Reset Verification Code",
      template: emailTemplate,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPatients = async (docID) => {
  try {
    const doctor = await doctorModel.findOne({
      user: docID,
    });

    if (!doctor) return { status: 400, message: "Doctor not found" };

    const subscriptions = await doctorPatientSubscriptionModel
      .find({
        doctor: docID,
      })
      .populate({
        path: "user",
        select: "-password",
      });
    console.log(subscriptions);

    return subscriptions;
  } catch (error) {
    console.log(error);
  }
};

export const removeSubscription = async (id) => {
  try {
    const subscription = await doctorPatientSubscriptionModel.findById(id);
    if (!subscription)
      return { status: 400, message: "Subscription not found" };
    return await doctorPatientSubscriptionModel.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
};
