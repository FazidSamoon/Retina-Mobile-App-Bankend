import Express from "express";
import authRouter from "./auth.routes";
import testResultsRouter from "./test_results.routes";

const router = Express.Router();

router.use("/auth", authRouter);
router.use("/test-results", testResultsRouter)

export default router;
