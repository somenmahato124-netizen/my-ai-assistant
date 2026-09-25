import uploadOnCloudinary from "../config/cloudinary.js";
import moment from "moment";
import geminiResponse from "../gemini.js";
import { supabase } from "../config/db.js";


// ===============================
// GET CURRENT USER
// ===============================
export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId;

        const { data: user, error } = await supabase
            .from("users")
            .select("id, name, email, assistantName, assistantImage, history, createdAt, updatedAt")
            .eq("id", userId)
            .single();

        if (error) {
            console.log("Get current user error:", error);

            return res.status(400).json({
                message: "User not found"
            });
        }

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        return res.status(200).json(user);

    } catch (error) {
        console.log("Get current user error:", error);

        return res.status(400).json({
            message: "get current user error"
        });
    }
};


// ===============================
// UPDATE ASSISTANT
// ===============================
export const updateAssistant = async (req, res) => {
    try {
        const { assistantName, imageUrl } = req.body;

        let assistantImage;

        if (req.file) {
            assistantImage = await uploadOnCloudinary(req.file.path);
        } else {
            assistantImage = imageUrl;
        }

        const { data: user, error } = await supabase
            .from("users")
            .update({
                assistantName: assistantName,
                assistantImage: assistantImage,
                updatedAt: new Date().toISOString()
            })
            .eq("id", req.userId)
            .select("id, name, email, assistantName, assistantImage, history, createdAt, updatedAt")
            .single();

        if (error) {
            console.log("Update assistant error:", error);

            return res.status(400).json({
                message: "update assistant error"
            });
        }

        return res.status(200).json(user);

    } catch (error) {
        console.log("Update assistant error:", error);

        return res.status(400).json({
            message: "update assistant error"
        });
    }
};


// ===============================
// ASK TO ASSISTANT
// ===============================
export const askToAssistant = async (req, res) => {
    try {
        const { command } = req.body;

        // Get current user from Supabase
        const { data: user, error: userError } = await supabase
            .from("users")
            .select("id, name, email, assistantName, assistantImage, history")
            .eq("id", req.userId)
            .single();

        if (userError || !user) {
            return res.status(404).json({
                response: "User not found"
            });
        }

        // Get existing history
        const currentHistory = user.history || [];

        // Add new command to history
        const updatedHistory = [...currentHistory, command];

        // Save history to Supabase
        const { error: historyError } = await supabase
            .from("users")
            .update({
                history: updatedHistory,
                updatedAt: new Date().toISOString()
            })
            .eq("id", req.userId);

        if (historyError) {
            console.log("History update error:", historyError);
        }

        const userName = user.name;
        const assistantName = user.assistantName;

        // Get response from Gemini
        const result = await geminiResponse(
            command,
            assistantName,
            userName
        );

        console.log("Gemini result:", result);

        // Extract JSON from Gemini response
        const jsonMatch = result.match(/{[\s\S]*}/);

        if (!jsonMatch) {
            console.log("❌ Gemini did not return valid JSON");

            return res.status(400).json({
                response: "Sorry, I can't understand"
            });
        }

        // Convert JSON string to JavaScript object
        const gemResult = JSON.parse(jsonMatch[0]);

        console.log("Gemini parsed result:", gemResult);

        const type = gemResult.type;

        switch (type) {

            case "get_date":
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: `Current date is ${moment().format("YYYY-MM-DD")}`
                });


            case "get_time":
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: `Current time is ${moment().format("hh:mm A")}`
                });


            case "get_day":
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: `Today is ${moment().format("dddd")}`
                });


            case "get_month":
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: `Current month is ${moment().format("MMMM")}`
                });


            case "google_search":
            case "youtube_search":
            case "youtube_play":
            case "general":
            case "calculator_open":
            case "instagram_open":
            case "facebook_open":
            case "weather-show":

                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: gemResult.response
                });


            default:
                console.log("❌ Unknown type:", type);

                return res.status(400).json({
                    response: "I didn't understand that command."
                });
        }

    } catch (error) {

        console.log("❌ Ask assistant error:", error);

        return res.status(500).json({
            response: "Ask assistant error"
        });
    }
};