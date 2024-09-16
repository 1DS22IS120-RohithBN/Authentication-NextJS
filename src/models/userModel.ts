import mongoose, { Schema, Document } from "mongoose";

// Define the schema for the User model
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please specify a username"],
    unique: [true, "Username already exists"],
  },
  email: {
    type: String,
    required: [true, "Please specify an email"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Please specify a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

// Check if the model is already compiled, if not, compile it
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
