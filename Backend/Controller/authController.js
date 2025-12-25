import User from "../Models/user.js";
import catchAsync from "../utils/catchAsync.js";

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

  const data = await User.create(newUser);

  res.status(201).json({
    status: "success",
    data: data,
  });
});

export default signup;
