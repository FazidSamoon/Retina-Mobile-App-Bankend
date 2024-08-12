import Express from "express";
import connectDB from "./database/connect";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.routes";
import { errorHandlerMiddleware } from "./middleware/errorHandler";

const app = Express();
dotenv.config();

const port = process.env.PORT || 3000;

//MIDDLEWARE
app.use(cors());
app.use(Express.json({ limit: "10mb" }));
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
