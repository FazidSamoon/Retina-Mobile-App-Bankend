import channelingModel from "../models/channelings";
import doctorModel from "../models/doctor";
import notificationModel from "../models/notifications";
import userModel from "../models/user";
import {
  getChannelingsByDoctor,
  getChannelingsByPatient,
} from "../services/doctorService";
import { makeResponse } from "../utils/response";
const { google } = require("googleapis");
const uuid = require("uuid");

const oAuth2Client = new google.auth.OAuth2(
  "981410127347-e3tl7gghi7i1hfj8l5l75gcod3ion961.apps.googleusercontent.com",
  "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",
  "http://localhost:3005"
);

oAuth2Client.setCredentials({
  refresh_token:
    "1//0gswXAozZEIPsCgYIARAAGBASNwF-L9Ir2txZTYLrFQEZp_cym_03prYEtv4IElWqJW9SsO4flDzNKCyabKwQxkQ27yZ_x3GLCAM",
});

export const getAllChannelingsByDoctor = async (req, res) => {
  const doctor = req.params.id;
  const response = await getChannelingsByDoctor(doctor);

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
    message: "channelings retrived successfully",
  });
};

export const getAllChannelingsByPatient = async (req, res) => {
  const patient = req.params.id;
  const response = await getChannelingsByPatient(patient);

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
    message: "channelings retrived successfully",
  });
};

const isTimeSlotOverlapping = (existingSlot, newStart, newEnd) => {
  const existingStart = existingSlot.start;
  const existingEnd = existingSlot.end;

  return (
    (newStart >= existingStart && newStart < existingEnd) ||
    (newEnd > existingStart && newEnd <= existingEnd) ||
    (newStart <= existingStart && newEnd >= existingEnd)
  );
};

export const checkChannelingAvailability = async (req, res) => {
  const { doctorId, date, startTime, endTime } = req.body;

  try {
    const existingChannelings = await channelingModel.find({
      doctor: doctorId,
      date: new Date(date),
    });

    const isAvailable = existingChannelings.every((channeling) => {
      return !isTimeSlotOverlapping(channeling.timeSlot, startTime, endTime);
    });

    console.log("isAvailable ", isAvailable);
    if (isAvailable) {
      return makeResponse({
        res,
        status: 200,
        data: { available: true },
        message: "Time slot is available",
      });
    } else {
      return makeResponse({
        res,
        status: 200,
        data: { available: false },
        message: "Time slot is not available",
      });
    }
  } catch (error) {
    console.error("Error checking channeling availability", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const addChannelingSlot = async (req, res) => {
  const { doctorId, date, startTime, endTime, userId, type, payment } = req.body;

  try {
    const existingChannelings = await channelingModel.find({
      doctor: doctorId,
      date: new Date(date),
    });

    const isAvailable = existingChannelings.every((channeling) => {
      return !isTimeSlotOverlapping(channeling.timeSlot, startTime, endTime);
    });

    if (!isAvailable) {
      return makeResponse({
        res,
        status: 400,
        data: { available: false },
        message: "The selected time slot is not available.",
      });
    }

    const doctor = await doctorModel.findById(doctorId).populate("user");
    const user = await userModel.findById(userId);

    const startDateTime = new Date(`${date}T${startTime}:00`);

    const endDateTime = new Date(startDateTime);
    endDateTime.setMinutes(startDateTime.getMinutes() + 30);
    const eventDetails = {
      summary: "Doctor Consultation",
      location: "Online",
      description: "Consultation between doctor and patient",
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
      timeZone: "Asia/Colombo",
    };

    const link = await createGoogleMeetEvent(
      doctor?.email,
      user?.email,
      eventDetails
    );

    const newChanneling = new channelingModel({
      doctor: doctorId,
      user: userId,
      date: new Date(date),
      timeSlot: {
        start: startTime,
        end: endTime,
      },
      type: type,
      status: "PENDING",
      meetLink: link,
      payment: payment ?? "FREE"
    });

    await newChanneling.save();

    const notification = new notificationModel({
      userId: doctor.user._id,
      message: `Channeling requested by ${user.name} on ${startDateTime} - ${endDateTime}`,
    });

    await notification.save();

    console.log("")
    return makeResponse({
      res,
      status: 200,
      data: newChanneling,
      message: "Channeling slot created successfully",
    });
  } catch (error) {
    console.error("Error adding channeling slot", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateChannelingSlot = async (req, res) => {
  const { id } = req.params;
  const { date, startTime, endTime, status } = req.body;

  try {
    const channeling = await channelingModel.findById(id).populate("user");

    if (!channeling) {
      return res.status(404).json({ message: "Channeling not found" });
    }

    if (date && startTime && endTime) {
      const existingChannelings = await channelingModel.find({
        doctor: channeling.doctor,
        date: new Date(date),
        _id: { $ne: channelingId },
      });

      const isAvailable = existingChannelings.every((existingChanneling) => {
        return !isTimeSlotOverlapping(
          existingChanneling.timeSlot,
          startTime,
          endTime
        );
      });

      if (!isAvailable) {
        return res
          .status(409)
          .json({ message: "The selected time slot is not available." });
      }

      channeling.date = new Date(date);
      channeling.timeSlot = { start: startTime, end: endTime };
    }

    if (status) {
      channeling.status = status;
    }

    const notification = new notificationModel({
      userId: channeling.user._id,
      message: `Channeling request status updated from ${channeling.status} to ${status}`,
    });

    await notification.save();
    await channeling.save();

    return res
      .status(200)
      .json({ message: "Channeling updated successfully", channeling });
  } catch (error) {
    console.error("Error updating channeling", error);
    return res.status(500).json({ message: "Server error" });
  }
};

async function createGoogleMeetEvent(doctorEmail, patientEmail, eventDetails) {
  try {
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

    const event = {
      summary: eventDetails.summary,
      location: eventDetails.location,
      description: eventDetails.description,
      start: {
        dateTime: eventDetails.startTime,
        timeZone: eventDetails.timeZone,
      },
      end: {
        dateTime: eventDetails.endTime,
        timeZone: eventDetails.timeZone,
      },
      attendees: [{ email: doctorEmail }, { email: patientEmail }],
      conferenceData: {
        createRequest: {
          requestId: uuid.v4(),
          conferenceSolutionKey: {
            type: "hangoutsMeet",
          },
        },
      },
      guestsCanModify: true,
      guestsCanInviteOthers: true,
      guestsCanSeeOtherGuests: true,
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
      conferenceDataVersion: 1,
      sendUpdates: "all",
    });

    const meetLink = response.data.hangoutLink;

    return meetLink;
  } catch (error) {
    console.error("Full Error: ", JSON.stringify(error, null, 2));
    throw error;
  }
}
