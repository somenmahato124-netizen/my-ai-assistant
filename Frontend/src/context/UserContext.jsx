import axios from "axios";
import React, { createContext, useState,useEffect } from "react";
export const userDataContext=createContext();
function UserContext({children}){
    const serverUrl="http://localhost:8000";
    const[userData,setUserData]=useState(null)
    const [frontendImage,setFrontendImage]=useState(null)
      const [backendImage,setBackendImage]=useState(null)
      const [selectedImage,setSelectedImage]=useState(null)
    // const handleCurrentUser=async()=>{
    //     try {
    //         const result=await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
    //         setUserData(result.data)
    //         console.log(result.data);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    const handleCurrentUser = async () => {
    try {
        console.log("Calling current user API...");
        console.log(serverUrl)
        const result = await axios.get(
            `${serverUrl}/api/user/current`,
            { withCredentials: true }
        );

        console.log("API response:", result);
        console.log("User data:", result.data);

        setUserData(result.data);

    } catch (error) {
        console.log("Current user error:", error);
        console.log("Status:", error.response?.status);
        console.log("Response:", error.response?.data);
    }
};


const getGeminiResponse=async (command)=>{
    try {
        const result=await axios.post(`${serverUrl}/api/user/asktoAssistant`,{command},{withCredentials:true})

        return result.data
    } catch (error) {
        console.log(error);
        
    }

}
    useEffect(()=>{
        handleCurrentUser();
    },[])
    const value = {
      backendImage,
      setBackendImage,
      frontendImage,
      setFrontendImage,
      selectedImage,
      setSelectedImage,
      serverUrl,
      userData,
      setUserData,
      getGeminiResponse,
    };
    return(

       
        <userDataContext.Provider value={value}>
             {children}
        </userDataContext.Provider>


    )
}
export default UserContext