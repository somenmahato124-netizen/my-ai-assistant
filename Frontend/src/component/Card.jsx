
import { useContext } from "react";
import "../Style/Card.css";
import { userDataContext } from "../context/UserContext";

const Card = ({ image }) => {
   const { backendImage,setBackendImage,frontendImage,setFrontendImage,
          selectedImage,setSelectedImage,
  serverUrl,
   userData,setUserData}=useContext(userDataContext)
  return (
    <div
      className={`card ${selectedImage === image ? "selected" : ""}`}
      onClick={() => {
        setSelectedImage(image)
        setBackendImage(null)
        setFrontendImage(null)
      }}
    >
      <img src={image} className="card-image" />
    </div>
  );
};

export default Card;
