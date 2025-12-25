import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: [30, "A user name must have less or equal then 30 characters"],
      required: [true, "A user must have a name"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "A user must have an email"],
      validate: [validator.isEmail, "Please enter a valid email address"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "A user must have a password"],
      minLength: [
        8,
        "A user password must have more or equal then 8 characters",
      ],
      trim: true,
      select: false, //it won't show up in any routes
    },
    passwordResetToken: String,
    passwordResetExpires: String,
    avatar: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//using document middleware to hash the password, runs on save and create
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    // if password is not modified then we don't need to hash it again
    return;
  }
  //13 is the cost parameter, higher the cost more secure but slower the hashing
  this.password = await bcrypt.hash(this.password, 13);
  //call the next middleware, in express 5 it automatically goes to next after promise is resolved
  //next();
});

const User = mongoose.model("User", userSchema);

export default User;
