import Express from "express";
import { createUser, findUserByEmail, forgotPassword, getAllEmployees, loginUser, registerUser, resetPassword, resetPasswordWithCode, updateUserInfo } from "../controllers/auth";

const authRouter = Express.Router();

authRouter.get("/find/:email", findUserByEmail)
authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);
authRouter.patch("/reset-password", resetPassword)
authRouter.patch("/update-user/:id", updateUserInfo);
authRouter.post("/create-user", createUser);
authRouter.post("/forgot-password", forgotPassword) 
authRouter.post("/reset-password-with-code", resetPasswordWithCode)

export default authRouter;
