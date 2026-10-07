import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    age: {
      type: Number,
      required: true,
      min: 18,
    },
  },

  {
    timestamps: true,
  },
);

const User = mongoose.model("User",userSchema);
export default User;