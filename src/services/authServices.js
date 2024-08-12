import { badAuthentication } from "../errors/badAuth.js";
import bcrypt from "bcrypt";
import { createUser, getUser, updateUser } from "../repositary/user.js";
import { generateRandomPassword } from "../utils/randomPassword.js";
import userModel from "../models/user.js";

export const authRegister = async (data) => {
  try {
    const { username, email } = data;
    if (!username || !email)
      return { status: 400, message: "Please provide required fields....." };

    const user = await getUser({ email });

    if (user)
      return {
        status: 400,
        message: "User already exists with this email address.....",
      };

    // const randomPassword = generateRandomPassword();
    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const userObject = { ...data, password: hashedPassword };
    const result = await createUser(userObject);

    return result;
  } catch (error) {
    throw new badAuthentication("Error while creating user");
  }
};

export const authLogin = async (data) => {
  const { email, password } = data;

  if (!email || !password)
    return {
      status: 400,
      message: "Please provide username and password.....",
    };
  const user = await getUser({ email });
  if (!user)
    return { status: 400, message: "Username or password incorrect..." };
  const compareHashedPassword = await bcrypt.compare(password, user.password);
  if (!compareHashedPassword)
    return { status: 400, message: "Username or password incorrect..." };
  return user;
};

export const resetPasswordService = async (data) => {
  const filters = { email: data.email };
  const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
  const hashedPassword = await bcrypt.hash(data.password, salt);
  const update = { password: data.password, is_loggedIn: true };
  const response = updateUser(filters, update);
  if (!response)
    return {
      status: 400,
      message: "Reset password process failed...",
    };
  return response;
};

export const createNewUser = async (data) => {
  try {
    const { username, email } = data;
    if (!username || !email)
      return { status: 400, message: "Please provide required fields....." };

    const user = await getUser({ email });

    if (user)
      return {
        status: 400,
        message: "User already exists with this email address.....",
      };

    const randomPassword = generateRandomPassword();
    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
    const hashedPassword = await bcrypt.hash(randomPassword, salt);
    const userObject = { ...data, password: hashedPassword };
    const result = await createUser(userObject);

    // if (result) {
    //   const body = `
    //           <h1>Hi ${username}</h1>
    //           <p>Your password is <b>${randomPassword}</b></p>
    //           <p>Thank you for registering with us</p>
    //       `;

    //   sendMail(email, body);
    // }
    return result;
  } catch (error) {
    throw new badAuthentication("Error while creating user");
  }
};

export const resetPasswordWithCodeService = async (
  email,
  verificationCode,
  newPassword,
  confirmPassword
) => {
  if (newPassword !== confirmPassword) {
    return {
      status: 400,
      message: "Password and confirm password do not match",
    };
  }

  const user = await userModel.findOne({
    email,
    passwordResetCode: verificationCode
  });

  if (!user) {
    return makeResponse({
      res,
      status: 400,
      message: "Invalid or expired verification code",
    });
  }

  const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  user.password = hashedPassword;
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;

  return await user.save();
};
