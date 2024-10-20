import Express from "express";
import {
  addChannelingSlot,
  checkChannelingAvailability,
  getAllChannelingsByDoctor,
  getAllChannelingsByPatient,
  updateChannelingSlot,
} from "../controllers/channeling";

const channelingRoute = Express.Router();

channelingRoute.post("/availability", checkChannelingAvailability);
channelingRoute.post("/", addChannelingSlot);
channelingRoute.patch("/:id", updateChannelingSlot);

channelingRoute.get("/doctor/:id", getAllChannelingsByDoctor);
channelingRoute.get("/patient/:id", getAllChannelingsByPatient);

export default channelingRoute;
