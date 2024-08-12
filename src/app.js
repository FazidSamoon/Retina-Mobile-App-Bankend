import Express from "express";
import connectDB from "./database/connect";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.routes";
import { errorHandlerMiddleware } from "./middleware/errorHandler";
import fs from "graceful-fs";

const app = Express();
dotenv.config();

const port = process.env.PORT || 3005;

//MIDDLEWARE
app.use(cors());
app.use(Express.json({ limit: "500mb" }));
app.use(Express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
//ROUTES
app.use("/api/v1", router);

app.use(errorHandlerMiddleware);

try {
  connectDB();
  app.listen(port, () => {
    console.log("Server running on port ", port);
  });
} catch (error) {
  console.log(error);
}

export default app