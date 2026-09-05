import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

import User from "../models/User.js"

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password Are required"
            });
        }

        const user = await User.findOne({
            email: email,
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invaild Email or Password"
            });
        }

        const ispassword = await bcrypt.compare(
            password,
            user.password
        )

        if (!ispassword) {
            return res.status(401).json({
                success: false,
                message: "Invaild Email or Password"
            });
        }

        const token = jwt.sign({
            userId: user._id,
            role: user.role,
        },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }

        );

        res.status(200).json({
            success:true,
            message:"Login Successfully",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
                department:user.department
            }
        });



    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        })
    }
}

export const signup = async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;

    // 1. Validate required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Name, email, password and role are required"
      });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({
      email: email.toLowerCase()
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists"
      });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      department: department || "Compliance"
    });

    // 5. Generate JWT
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    // 6. Send response
    return res.status(201).json({
      success: true,
      message: "Signup successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department
      }
    });
  } catch (error) {
    console.error("Signup Error:", error);

    return res.status(500).json({
      success: false,
      message: "Signup failed",
      error: error.message
    });
  }
};










