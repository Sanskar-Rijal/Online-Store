import jwt from "jsonwebtoken";
import User from "../Models/user.js";
import catchAsync from "../utils/catchAsync.js";

//putting information in jwt payload
const signToken = (userid) =>
  jwt.sign({ id: userid }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

//Sending Jwt token via cookie
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    //  secure: true, //it will only send the cookie on https, in Production make this true
    httpOnly: true, //it will not allow the cookie to be accessed or modified by the browser
  });

  //we don't want to send password back to the client so
  user.password = undefined;

  res.status(statusCode).json({
    status: "true",
    message: {
      user,
      token: token,
    },
  });
};

//for signup user
const signup = catchAsync(async (req, res, next) => {
  //we are creating user with all the data that is comming from the body
  //so any one can specify the role as admin , so we have to fix it,
  //manually put it in the create method
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  createSendToken(newUser, 201, res);
});

export default signup;
