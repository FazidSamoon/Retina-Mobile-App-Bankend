import doctorModel from "../models/doctor";
import doctorPatientSubscriptionModel from "../models/doctorPatientSubscription";
import { authRegister } from "../services/authServices";
import {
  createDoctor,
  getAllPatients,
  removeSubscription,
  subscriptionService,
} from "../services/doctorService";
import { generateAccessToken } from "../utils/jwt";
import { makeResponse } from "../utils/response";

export const registerDoctors = async (req, res) => {
  const {
    email,
    password: pwd,
    location,
    occupation,
    phone,
    gender,
    name,
  } = req.body;
  const user = await authRegister({
    username: name,
    email,
    password: pwd,
    location,
    occupation,
    phone,
    gender,
    name,
  });

  if (!user)
    return makeResponse({
      res,
      status: 500,
      message: "Registration failed...",
    });
  if (user.status) return makeResponse({ res, ...user });
  const { password, ...otherDetails } = user;
  const accessToken = await generateAccessToken(otherDetails);

  let doctor;
  if (user) doctor = await createDoctor(req.body, user._id);
  if (!doctor)
    return makeResponse({
      res,
      status: 500,
      message: "Registration failed...",
    });

  if (doctor.status) return makeResponse({ res, ...user });

  return makeResponse({
    res,
    status: 200,
    data: { otherDetails, token: accessToken },
    messsage: "User creation successfull...",
  });
};

export const invitePatientsForSubscription = async (req, res) => {
  const doctor = req.params.id;
  const response = await subscriptionService(doctor, req.body);
  if (!response)
    return makeResponse({
      res,
      status: 500,
      message: "Registration failed...",
    });

  if (!response)
    return makeResponse({ res, status: 400, message: "Something went wrong 2" });
  if (response.status) return makeResponse({ res, ...response });
  makeResponse({
    res,
    status: 200,
    data: response,
    message: "Registration success",
  });
};

export const getAllDocorsSubscriptions = async (req, res) => {
  const doctor = req.params.id;
  const response = await getAllPatients(doctor);
  if (!response)
    return makeResponse({
      res,
      status: 500,
      message: "Something went wrong",
    });

  if (!response) return makeResponse({ res, status: 400 });
  if (response.status) return makeResponse({ res, ...response });
  makeResponse({
    res,
    status: 200,
    data: response,
    message: "Subscriptions retrived successfully",
  });
};

export const removePatientsSubscription = async (req, res) => {
  const subscription = req.params.id;
  const response = await removeSubscription(subscription);
  if (!response)
    return makeResponse({
      res,
      status: 500,
      message: "Something went wrong",
    });

  if (!response) return makeResponse({ res, status: 400 });
  if (response.status) return makeResponse({ res, ...response });
  makeResponse({
    res,
    status: 200,
    data: response,
    message: "Subscriptions removed successfully",
  });
};

export const getAllDoctors = async (req, res) => {
  try {
    const response = await doctorModel.find();
    if (!response)
      return makeResponse({
        res,
        status: 500,
        message: "Something went wrong",
      });
    makeResponse({
      res,
      status: 200,
      data: response,
      message: "Subscriptions removed successfully",
    });
  } catch (error) {
    makeResponse({
      res,
      status: 400,
      message: "Something went wrong",
    });
  }
};

export const getMySubscribedDoctor = async (req, res) => {
  try {
    const response = await doctorPatientSubscriptionModel
      .find({
        user: req.params.id,
      })
      .populate("doctor");
    if (!response)
      return makeResponse({
        res,
        status: 500,
        message: "Something went wrong",
      });
    makeResponse({
      res,
      status: 200,
      data: response,
      message: "Subscriptions removed successfully",
    });
  } catch (error) {
    makeResponse({
      res,
      status: 400,
      message: "Something went wrong",
    });
  }
};
