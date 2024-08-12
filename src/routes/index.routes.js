import Express from "express";
import authRouter from "./auth.routes";

const router = Express.Router();

router.use("/auth", authRouter);
// router.use("/test-results", )

export default router;
