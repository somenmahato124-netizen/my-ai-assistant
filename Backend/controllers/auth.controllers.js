import { supabase } from "../config/db.js";
import { gentoken } from "../config/token.js";
import bcrypt from "bcryptjs";

// ===============================
// SIGN UP
// ===============================
export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

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
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        // Check password length
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const { data: user, error: createError } = await supabase
            .from("users")
            .insert([
                {
                    name,
                    email,
                    password: hashedPassword
                }
            ])
            .select(
                "id, name, email, assistantName, assistantImage, history, createdAt, updatedAt"
            )
            .single();

        if (createError) {
            return res.status(500).json({
                message: createError.message
            });
        }

        // Create JWT token
        const token = await gentoken(user.id);

        if (!token) {
            return res.status(500).json({
                message: "Token generation failed"
            });
        }

        // Save token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/"
        });

        console.log("User registered:", user.email);

        return res.status(201).json({
            message: "user registered successfully",
            user
        });

    } catch (error) {
        console.log("Signup error:", error);

        return res.status(500).json({
            message: "Signup failed"
        });
    }
};


// ===============================
// LOGIN
// ===============================
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check required fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Find user
        const { data: user, error: userError } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .maybeSingle();

        if (userError) {
            console.log("Login user error:", userError);

            return res.status(500).json({
                message: userError.message
            });
        }

        // User not found
        if (!user) {
            return res.status(404).json({
                message: "Email does not exist"
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Incorrect password"
            });
        }

        // ===============================
        // CREATE JWT TOKEN
        // ===============================
        const token = await gentoken(user.id);

        if (!token) {
            return res.status(500).json({
                message: "Token generation failed"
            });
        }

        // ===============================
        // SAVE JWT IN COOKIE
        // ===============================
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/"
        });

        console.log("User logged in:", user.email);
        console.log("JWT token created:", !!token);

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
        console.log("Login error:", error);

        return res.status(500).json({
            message: "Login failed"
        });
    }
};


// ===============================
// LOGOUT
// ===============================
export const logOut = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "Lax",
            path: "/"
        });

        return res.status(200).json({
            message: "logout successful"
        });

    } catch (error) {
        console.log("Logout error:", error);

        return res.status(500).json({
            message: "Logout failed"
        });
    }
};