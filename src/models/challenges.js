import Mongoose from "mongoose";

const challengesSchema = new Mongoose.Schema({});

const ChallengesModel = Mongoose.model("Challenges", challengesSchema);
export default ChallengesModel;
