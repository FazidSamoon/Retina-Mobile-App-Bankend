import Express from "express";
import authRouter from "./auth.routes";
import testResultsRouter from "./test_results.routes";
import challengesRouter from "./challenges.routes";
import levelRouter from "./level.routes";

const router = Express.Router();

router.use("/auth", authRouter);
router.use("/test-results", testResultsRouter);
router.use("/challanges", challengesRouter);
router.use("/level", levelRouter);

export default router;
