import Express from "express";
import notificationModel from "../models/notifications";
import { makeResponse } from "../utils/response";

const notificationRouter = Express.Router();

notificationRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const notifications = await notificationModel.find({
    userId: id,
  });

  makeResponse({
    res,
    status: 200,
    data: notifications,
    message: "notifications retrieved successfully",
  });
});

export default notificationRouter;
