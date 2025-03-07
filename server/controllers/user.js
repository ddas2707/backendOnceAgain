import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required."
            })
        }
        const user = await User.findOne({ email });
        if (user) {
            console.log("User already exists");
            return res.status(409).json({
                success: false,
                message: "User already exists."
            })
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        await User.create({
            name,
            email,
            password: hashedPassword
        });
        return res.status(201).json({
            success: true,
            message: "User created successfully"
        })
    } catch (err) {
        console.log(err);
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required."
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found with this email"
            })
        }
        const is_Password_Match = await bcrypt.compare(password, user.password);
        if (!is_Password_Match) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

        return res.status(200).cookie("token", token, {
            httpOnly: true,
            secure: true,   //extra likha h 
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        }).json({
            success: true,
            message: `Welcome back ${user.name}`
        })
    } catch (err) {
        console.log(err);
    }
}

export const logout = async (_, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            success: true,
            message: "User Logged out successfully"
        })
    } catch (err) {
        console.log(err);
    }
}