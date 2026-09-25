
import Card from "../component/Card";
import "../Style/Customize.css";
//import "../Style/Card.css"
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.jpeg";
import image7 from "../assets/image7.jpeg";
import { useContext, useRef, useState } from "react";
import {useNavigate} from 'react-router-dom'
import { userDataContext } from "../context/UserContext";

const Customize = () => {
  const { backendImage,setBackendImage,frontendImage,setFrontendImage,
        selectedImage,setSelectedImage,
serverUrl,
 userData,setUserData}=useContext(userDataContext)
  const inputImage=useRef()
  const handleImage=(e)=>{
const file=e.target.files[0]
setBackendImage(file)
setFrontendImage(URL.createObjectURL(file))
  }
  const navigate=useNavigate();
  return (
    <div className="customize">
      <div className="customize-container">
        <h1 className="heading">Select Your<span> Assistant Image</span></h1>
        <Card image={image1} />
        <Card image={image2} />
        <Card image={image3} />
        <Card image={image4} />
        <Card image={image5} />
        <Card image={image6} />
        <Card image={image7} />
        {/* <div onClick={()=>{inputImage.current.click()
          setSelectedImage('input')
        } }className={`card  ${selectedImage === "input" ? "selected" : ""}`}>
         {frontendImage &&<image src={frontendImage}/>}
          <input onChange={handleImage} type="file" accept="image/*" ref={inputImage} hidden/>
      
    </div> */}

    <div
  onClick={() => {
    inputImage.current.click();
    setSelectedImage("input");
  }}
  className={`card upload-card ${
    selectedImage === "input" ? "selected" : ""
  }`}
>
  {frontendImage ? (
    <img src={frontendImage} alt="Custom Assistant" />
  ) : (
    <div className="upload-content">
      <div className="add-icon">+</div>
      <p>Add Your Image</p>
      <span>Click to upload</span>
    </div>
  )}

  <input
    onChange={handleImage}
    type="file"
    accept="image/*"
    ref={inputImage}
    hidden
  />
</div>
    
      </div  >
      {selectedImage && <button onClick={()=>navigate("/customize2")} className="customize-btn">Next</button>}
         
     
     
    </div>
  );
};

export default Customize;
