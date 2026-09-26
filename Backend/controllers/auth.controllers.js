import { supabase } from "../config/db.js";
import { gentoken } from "../config/token.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if email already exists
        const { data: existingUser, error: checkError } = await supabase
            .from("users")
            .select("id")
            .eq("email", email)
            .maybeSingle();

        if (checkError) {
            return res.status(500).json({
                message: checkError.message
            });
        }

        if (existingUser) {
            return res.status(200).json({
                message: "email already exists"
            });
        }

        // Check password length
        if (!password || password.length < 6) {
            return res.status(200).json({
                message: "Password must be at least 6 characters"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user in Supabase
        const { data: user, error: createError } = await supabase
            .from("users")
            .insert([
                {
                    name,
                    email,
                    password: hashedPassword
                }
            ])
            .select("id, name, email, assistantName, assistantImage, history, createdAt, updatedAt")
            .single();

        if (createError) {
            return res.status(500).json({
                message: createError.message
            });
        }

        // Create JWT token
        const token = await gentoken(user.id);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "Lax",
            secure: true
        });

        console.log("User registered:", user.email);

        return res.status(200).json({
            message: "user registered successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const { data: user, error: userError } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .maybeSingle();

        if (userError) {
            return res.status(500).json({
                message: userError.message
            });
        }

        if (!user) {
            return res.status(404).json({
                message: "email doesnot exists"
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Incorrect password"
            });
        }

        // Create JWT token
        const token = await gentoken(user.id);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite:"Lax",
            secure: true
        });

        // Never send password to frontend
        const safeUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            assistantName: user.assistantName,
            assistantImage: user.assistantImage,
            history: user.history,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        return res.status(200).json({
            message: "login successful",
            user: safeUser
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


export const logOut = async (req, res) => {
    try {
        res.clearCookie("token");

        return res.status(200).json({
            message: "logout successful"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};