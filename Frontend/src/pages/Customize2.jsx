import { useContext, useState } from "react"
import   "../Style/Customize2.css"
import { userDataContext } from "../context/UserContext"
import axios from "axios"
import {useNavigate} from 'react-router-dom'

const Customize2=()=>{
  const navigate=useNavigate();
  const {userData,backendImage,selectedImage,serverUrl,setUserData}=useContext(userDataContext)
  const[assistantName,setAssistantName]=useState(userData?.AssistantName || "")
 const handleUpdateAssistant=async()=>{
  try {
    let formData=new FormData()
    formData.append("assistantName",assistantName)
    if(backendImage){
       formData.append("assistantImage",backendImage)
    }else{
      formData.append("imageUrl",selectedImage)
    }
    const result= await axios.post(`${serverUrl}/api/user/update`,formData,{withCredentials:true})
    console.log(result.data)
    setUserData(result.data)
    navigate("/home");
  } catch (error) {
   console.log(error) 
  }
 }
    return(


       <div className="customize">
        <button className="back-btn" onClick={()=>navigate('/customize')}>Back</button>
     <h1 className="heading2">Enter Your <span>Assistant Name</span></h1>
     
     <input  value ={assistantName} onChange={(e)=>setAssistantName(e.target.value)} className="assistant-name"type="text" name="assistant" placeholder="eg:NOVA"/>
     <button onClick={()=>{
      console.log(assistantName)
      
      handleUpdateAssistant()
      
     
      }} className="button" type="submit">Create Your assistant name</button>

      </div>
    )
}
export default Customize2