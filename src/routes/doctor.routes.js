import Express from "express";
import { getAllDocorsSubscriptions, getAllDoctors, getMySubscribedDoctor, invitePatientsForSubscription, registerDoctors, removePatientsSubscription } from "../controllers/doctor";

const doctorRouter = Express.Router();

doctorRouter.get("/", getAllDoctors)
doctorRouter.get("/subscriptions/:id", getAllDocorsSubscriptions)
doctorRouter.get("/get-user-subscription/:id", getMySubscribedDoctor)
doctorRouter.delete("/subscriptions/:id", removePatientsSubscription)
doctorRouter.post("/register", registerDoctors);
doctorRouter.post("/invite/:id", invitePatientsForSubscription) 

export default doctorRouter;
