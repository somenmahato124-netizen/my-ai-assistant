
import { useContext ,useEffect, useRef, useState} from 'react';
import { userDataContext } from '../context/UserContext';
import '../Style/MainPage.css';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import aiImg from '../assets/ai.gif'
import userImg from '../assets/user.gif'
const MainPage = () => {

  const [userText,setUserText]=useState("");
  const [aiText,setAitext]=useState("");
  const [listening,setListening]=useState(false)
  const isSpeakingRef=useRef(false)
  const recognitionRef=useRef(null)
  const isRecognizingRef = useRef(false);
  const synth=window.speechSynthesis


const navigate=useNavigate();
  const { userData,serverUrl,setUserData , getGeminiResponse} = useContext(userDataContext);

  
  const handleLogOut=async()=>{
    try {
      const result=await axios.get(`${serverUrl}/api/auth/logout`,{
        withCredentials:true
      })
      setUserData(null)
      navigate('/');
    } catch (error) {
      setUserData(null);
     console.log(error); 
    }
  }

// const speak=(text)=>{
//   const utterence = new SpeechSynthesisUtterance(text)
//   isSpeakingRef.current=true
//  utterence.onend = () => {
//   isSpeakingRef.current = false;

//   if (
//     recognitionRef.current &&
//     !isRecognizingRef.current
//   ) {
//     try {
//       recognitionRef.current.start();
//     } catch (error) {
//       console.log("Recognition restart error:", error);
//     }
//   }
// };
//   synth.speak(utterence)
// }

const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);

    isSpeakingRef.current = true;

    const voices = window.speechSynthesis.getVoices();

    // Check whether text contains Hindi characters
    const isHindi = /[\u0900-\u097F]/.test(text);

    if (isHindi) {
        // Hindi - India
        const hindiVoice = voices.find(
            voice => voice.lang === "hi-IN"
        );

        if (hindiVoice) {
            utterance.voice = hindiVoice;
        }

        utterance.lang = "hi-IN";
    } else {
        // English - India
        const indianEnglishVoice = voices.find(
            voice => voice.lang === "en-IN"
        );

        if (indianEnglishVoice) {
            utterance.voice = indianEnglishVoice;
        }

        utterance.lang = "en-IN";
    }

    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => {
      setAitext("")
        isSpeakingRef.current = false;

        if (
            recognitionRef.current &&
            !isRecognizingRef.current
        ) {
            try {
                recognitionRef.current.start();
            } catch (error) {
                if (error.name !== "InvalidStateError") {
                    console.log("Recognition restart error:", error);
                }
            }
        }
    };

    synth.speak(utterance);
};

const handleCommand=(data)=>{
const {type,userInput,response}=data
speak(response)

if(type ==='google_search')
{
  const query=encodeURIComponent(userInput);
  window.open(`http://www.google.com/search?q=${query}`,'_blank');
}
if(type === 'calculator_open' ){
  window.open(`https://www.google.com/search?q=calculator`,'_blank')
  
}
if(type === "instagram_open"){
  window.open(`https://www.instagram.com`,'_blank');
}
if(type === "facebook_open"){
  window.open(`https://www.facebook.com`,'_blank');
}

if(type === "weather_show"){
  window.open(`https://www.google.com/search?q=weather`,'_blank');
}

if(type === 'youtube_search' || type === 'youtube_play'){
  const query = encodeURIComponent(userInput);
  window.open(`https://www.youtube.com/results?search_query=${query}`,"_blank");
}

}


const greeting = () => {
  const hour = new Date().getHours();

  let greetingText = "";

  if (hour < 12) {
    greetingText = `Good morning ${userData?.name}. I am ${userData?.assistantName}. How can I help you today?`;
  } else if (hour < 17) {
    greetingText = `Good afternoon ${userData?.name}. I am ${userData?.assistantName}. How can I help you today?`;
  } else {
    greetingText = `Good evening ${userData?.name}. I am ${userData?.assistantName}. How can I help you today?`;
  }

  setAitext(greetingText);
  speak(greetingText);
};

useEffect(()=>{

  if (userData?.assistantName && userData?.name) {
    setTimeout(() => {
      greeting();
    }, 500);
  }
const SpeechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition
const recognition=new SpeechRecognition()
recognition.continuous=true,
recognition.lang='en-US'

recognitionRef.current=recognition
//const isRecognizingRef={current:false}


const safeRecognition=()=>{
  if(!isSpeakingRef.current && !isRecognizingRef.current){
    try {
      recognition.start();
      console.log("Recognintion requested to start");
    } catch (error) {
      if(error.name !== "InvalidStateError"){
        console.log("Start error:",error);
      }
      
    }
  }
}


recognition.onstart=()=>{
  console.log("Recognition started");
  isRecognizingRef.current=true;
  setListening(true);
}

recognition.onend=()=>{
  console.log("Recognition ended");
  isRecognizingRef.current=false;
  setListening(false);


if(!isSpeakingRef.current){
  setTimeout(()=>{
    safeRecognition();
  },1000)
}
};

recognition.onerror=(event)=>{
  console.warn("Recognition error: ", event.error);
  isRecognizingRef.current=false;
  setListening(false);
  if(event.error !=="aborted" && !isSpeakingRef.current){
    setTimeout(()=>{
      safeRecognition();
    },1000)
  }
};
recognition.onresult=async (e)=>{
  const transcript=e.results[e.results.length-1][0].transcript.trim()
  console.log("heard: "+transcript)
  if(transcript.toLowerCase().includes(userData.assistantName.toLowerCase())){
setAitext("")
    setUserText(transcript);
recognition.stop()
isRecognizingRef.current=false;
setListening(false)

    const data=await getGeminiResponse(transcript) 
console.log(data);
handleCommand(data);
setAitext(data.response)
setUserText("")
  }
}
const fallback=setInterval(()=>{
  if(!isSpeakingRef.current && !isRecognizingRef.current){
    safeRecognition()
  }
},10000)
 safeRecognition()
return ()=>{
  recognition.stop()
  setListening(false)
  isRecognizingRef.current=false
  clearInterval(fallback)
}
},[])


  return (

    <div className="main-container">
<button onClick={()=>navigate('/customize')}>
Go to Customize
</button>
<button  onClick={handleLogOut} className="logout">Logout</button>



      <div className="assistant-image-container">
        <img
          src={userData?.assistantImage}
          alt="Assistant"
          className="assistant-image"
        />
      </div>
<p className="assistant-name">
  I am {userData?.assistantName}
</p>
{!aiText && <img src={userImg} alt=""   className="voice-animation"/>  }
{aiText && <img src={aiImg} alt=""  className="voice-animation"/>}

<h1>{userText?userText:aiText?aiText:null}</h1>
    </div>
  );


};

export default MainPage;