import { useContext, useState } from "react";
import "../Style/Customize2.css";
import { userDataContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Customize2 = () => {
    const navigate = useNavigate();

    const {
        userData,
        backendImage,
        selectedImage,
        serverUrl,
        setUserData
    } = useContext(userDataContext);

    const [assistantName, setAssistantName] = useState(
        userData?.assistantName || ""
    );

    const [loading, setLoading] = useState(false);

    const handleUpdateAssistant = async () => {
        if (!assistantName.trim()) {
            alert("Please enter your assistant name");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();

            formData.append(
                "assistantName",
                assistantName.trim()
            );

            if (backendImage) {
                formData.append(
                    "assistantImage",
                    backendImage
                );
            } else if (selectedImage) {
                formData.append(
                    "imageUrl",
                    selectedImage
                );
            }

            console.log("Updating assistant...");
            console.log(
                "Assistant name:",
                assistantName.trim()
            );

            const result = await axios.post(
                `${serverUrl}/api/user/update`,
                formData,
                {
                    withCredentials: true
                }
            );

            console.log(
                "Update response:",
                result.data
            );

            setUserData(result.data);

            navigate("/home");

        } catch (error) {
            console.log(
                "Update assistant error:",
                error
            );

            console.log(
                "Status:",
                error.response?.status
            );

            console.log(
                "Response:",
                error.response?.data
            );

            if (error.response?.status === 401) {
                alert(
                    "Your login session has expired. Please login again."
                );
            } else {
                alert(
                    error.response?.data?.message ||
                    "Failed to update assistant"
                );
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="customize">

            <button
                className="back-btn"
                onClick={() => navigate("/customize")}
                type="button"
            >
                Back
            </button>

            <h1 className="heading2">
                Enter Your <span>Assistant Name</span>
            </h1>

            <input
                value={assistantName}
                onChange={(e) =>
                    setAssistantName(e.target.value)
                }
                className="assistant-name"
                type="text"
                name="assistant"
                placeholder="eg: NOVA"
            />

            <button
                onClick={handleUpdateAssistant}
                className="button"
                type="button"
                disabled={loading}
            >
                {loading
                    ? "Creating..."
                    : "Create Your assistant name"}
            </button>

        </div>
    );
};

export default Customize2;