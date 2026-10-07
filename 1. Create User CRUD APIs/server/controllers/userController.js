import mongoose from "mongoose";
import User from "../models/User";

export const createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;

    //validation
    if (!name || !email || !age) {
      return res.status(400).json({
        sucess: false,
        message: "Name, email and age are required",
      });
    }

    //Email Validation

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    //Age validation

    if (age < 18) {
      return res.status(400).json({
        success: false,
        message: "Age must be at least 18",
      });
    }

    //Check duplicate email

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(409).json({
        sucess: false,
        message: "Email already exists",
      });
    }

    //Create User

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      age,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid User Id",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Server Error");

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user Id",
      });
    }

    if (!name || !email || !age) {
      return res.status(400).json({
        success: false,
        message: "Name, email and age are required",
      });
    }

    const user = await User.findByIdAndUpdate(
      id,

      {
        name,
        email,
        age,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated Successfully",
      user,
    });
  } catch (err) {
    console.log("Server Error");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteUser = async (req,res) => {
  try {
    const { id } = req.params;
    // check id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
