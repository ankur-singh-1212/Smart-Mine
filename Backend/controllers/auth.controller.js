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
            email: email.tolowerCase()
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










