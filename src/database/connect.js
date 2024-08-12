import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.set('strictQuery', false)
  mongoose
    .connect("mongodb+srv://db_user:db_user123@cluster0.t6py7eu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      
      keepAlive: true,
      connectTimeoutMS: 3000,
    })
    .then(() => console.log("DB connected succesfully"))
    .catch((err) => console.log(err));
  mongoose.connection.on("disconnected", () => {
    console.log("Mongo DB disconnected");
  });
  mongoose.connection.on("connected", () => {
    console.log("Mongo DB connected");
  });
};

export default connectDB;
