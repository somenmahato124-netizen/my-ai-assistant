import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const userDataContext = createContext();

function UserContext({ children }) {
    // Backend server URL
    const serverUrl = "https://my-ai-assistant-8yov.onrender.com";

    // User data
    const [userData, setUserData] = useState(null);

    // Image states
    const [frontendImage, setFrontendImage] = useState(null);
    const [backendImage, setBackendImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    // Get current logged-in user
    const handleCurrentUser = async () => {
        try {
            console.log("Calling current user API...");
            console.log("Server URL:", serverUrl);

            const response = await axios.get(
                `${serverUrl}/api/user/current`,
                {
                    withCredentials: true
                }
            );

            console.log("Current user API response:", response.data);

            setUserData(response.data);

        } catch (error) {
            console.log("Current user error:", error);
            console.log("Status:", error.response?.status);
            console.log("Response:", error.response?.data);

            setUserData(null);
        }
    };

    // Send command to AI assistant
    const getGeminiResponse = async (command) => {
        try {
            const response = await axios.post(
                `${serverUrl}/api/user/asktoAssistant`,
                {
                    command: command
                },
                {
                    withCredentials: true
                }
            );

            console.log("Assistant response:", response.data);

            return response.data;

        } catch (error) {
            console.log(
                "Assistant request error:",
                error.response?.data || error.message
            );

            return null;
        }
    };

    // Check current user when app starts
    useEffect(() => {
        handleCurrentUser();
    }, []);

    // Context values
    const value = {
        serverUrl,

        userData,
        setUserData,
        handleCurrentUser,

        frontendImage,
        setFrontendImage,

        backendImage,
        setBackendImage,

        selectedImage,
        setSelectedImage,

        getGeminiResponse
    };

    return (
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    );
}

export default UserContext;