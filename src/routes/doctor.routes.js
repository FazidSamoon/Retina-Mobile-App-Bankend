import Express from "express";
import { getAllDocorsSubscriptions, invitePatientsForSubscription, registerDoctors, removePatientsSubscription } from "../controllers/doctor";

const doctorRouter = Express.Router();

doctorRouter.get("/subscriptions/:id", getAllDocorsSubscriptions)
doctorRouter.delete("/subscriptions/:id", removePatientsSubscription)
doctorRouter.post("/register", registerDoctors);
doctorRouter.post("/invite/:id", invitePatientsForSubscription)

export default doctorRouter;
