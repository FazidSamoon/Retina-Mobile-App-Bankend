import { decodeToken } from "../utils/jwt.js";
import { makeResponse } from "../utils/response.js";

export const verifyAccessToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return makeResponse({ res, status: 401, message: "Not authorized..." });
  }

  const token = authHeader.split(" ")[1];
  const decodedToken = await decodeToken(token);
  if (!decodedToken)
    return makeResponse({ res, status: 400, message: "Something went wrong" });
  req.user = decodedToken;
  next();
};
