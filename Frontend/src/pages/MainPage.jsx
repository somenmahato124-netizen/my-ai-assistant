import { useContext, useEffect, useRef, useState } from "react";
import { userDataContext } from "../context/UserContext";
import "../Style/MainPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import aiImg from "../assets/ai.gif";
import userImg from "../assets/user.gif";

const MainPage = () => {
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const [listening, setListening] = useState(false);

  const isSpeakingRef = useRef(false);
  const recognitionRef = useRef(null);
  const isRecognizingRef = useRef(false);

  const synth = window.speechSynthesis;

  const navigate = useNavigate();

  const {
    userData,
    serverUrl,
    setUserData,
    getGeminiResponse
  } = useContext(userDataContext);

  // ================= LOGOUT =================

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true
      });

      setUserData(null);
      navigate("/");
    } catch (error) {
      setUserData(null);
      console.log(error);
    }
  };

  // ================= SPEAK =================

  const speak = (text) => {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);

    isSpeakingRef.current = true;

    const voices = window.speechSynthesis.getVoices();

    // Detect language
    const isHindi = /[\u0900-\u097F]/.test(text);

    const isBengali = /[\u0980-\u09FF]/.test(text);

    if (isBengali) {
      const bengaliVoice = voices.find(
        (voice) =>
          voice.lang === "bn-IN" ||
          voice.lang.startsWith("bn")
      );

      if (bengaliVoice) {
        utterance.voice = bengaliVoice;
      }

      utterance.lang = "bn-IN";

    } else if (isHindi) {

      const hindiVoice = voices.find(
        (voice) =>
          voice.lang === "hi-IN" ||
          voice.lang.startsWith("hi")
      );

      if (hindiVoice) {
        utterance.voice = hindiVoice;
      }

      utterance.lang = "hi-IN";

    } else {

      const englishVoice = voices.find(
        (voice) =>
          voice.lang === "en-IN" ||
          voice.lang.startsWith("en")
      );

      if (englishVoice) {
        utterance.voice = englishVoice;
      }

      utterance.lang = "en-IN";
    }

    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => {
      setAiText("");

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

  // ================= COMMAND =================

  const handleCommand = (data) => {
    if (!data) return;

    const {
      type,
      userInput,
      response
    } = data;

    if (response) {
      speak(response);
    }

    if (type === "google_search") {
      const query = encodeURIComponent(userInput);

      window.open(
        `https://www.google.com/search?q=${query}`,
        "_blank"
      );
    }

    if (type === "calculator_open") {
      window.open(
        "https://www.google.com/search?q=calculator",
        "_blank"
      );
    }

    if (type === "instagram_open") {
      window.open(
        "https://www.instagram.com",
        "_blank"
      );
    }

    if (type === "facebook_open") {
      window.open(
        "https://www.facebook.com",
        "_blank"
      );
    }

    if (type === "weather_show") {
      window.open(
        "https://www.google.com/search?q=weather",
        "_blank"
      );
    }

    if (
      type === "youtube_search" ||
      type === "youtube_play"
    ) {
      const query = encodeURIComponent(userInput);

      window.open(
        `https://www.youtube.com/results?search_query=${query}`,
        "_blank"
      );
    }
  };

  // ================= GREETING =================

  const greeting = () => {
    const hour = new Date().getHours();

    const userName = userData?.name || "there";
    const assistantName =
      userData?.assistantName || "VexaAI";

    let greetingText = "";

    if (hour < 12) {
      greetingText =
        `Good morning ${userName}. I am ${assistantName}. How can I help you today?`;

    } else if (hour < 17) {
      greetingText =
        `Good afternoon ${userName}. I am ${assistantName}. How can I help you today?`;

    } else {
      greetingText =
        `Good evening ${userName}. I am ${assistantName}. How can I help you today?`;
    }

    setAiText(greetingText);

    speak(greetingText);
  };

  // ================= VOICE RECOGNITION =================

  useEffect(() => {

    // Greeting
    setTimeout(() => {
      greeting();
    }, 700);

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.log(
        "Speech Recognition is not supported in this browser."
      );

      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = true;

    // Multi-language support
    recognition.lang = "en-IN";

    recognition.interimResults = false;

    recognitionRef.current = recognition;

    // ================= START =================

    const safeRecognition = () => {

      if (
        !isSpeakingRef.current &&
        !isRecognizingRef.current
      ) {

        try {

          recognition.start();

          console.log(
            "Recognition requested to start"
          );

        } catch (error) {

          if (
            error.name !== "InvalidStateError"
          ) {
            console.log(
              "Start error:",
              error
            );
          }
        }
      }
    };

    // ================= ON START =================

    recognition.onstart = () => {

      console.log(
        "Recognition started"
      );

      isRecognizingRef.current = true;

      setListening(true);
    };

    // ================= ON END =================

    recognition.onend = () => {

      console.log(
        "Recognition ended"
      );

      isRecognizingRef.current = false;

      setListening(false);

      if (!isSpeakingRef.current) {

        setTimeout(() => {
          safeRecognition();
        }, 1000);
      }
    };

    // ================= ERROR =================

    recognition.onerror = (event) => {

      console.warn(
        "Recognition error:",
        event.error
      );

      isRecognizingRef.current = false;

      setListening(false);

      if (
        event.error !== "aborted" &&
        !isSpeakingRef.current
      ) {

        setTimeout(() => {
          safeRecognition();
        }, 1000);
      }
    };

    // ================= RESULT =================

    recognition.onresult = async (e) => {

      const transcript =
        e.results[
          e.results.length - 1
        ][0].transcript.trim();

      console.log(
        "Heard:",
        transcript
      );

      if (!transcript) return;

      setUserText(transcript);

      recognition.stop();

      isRecognizingRef.current = false;

      setListening(false);

      try {

        const data =
          await getGeminiResponse(
            transcript
          );

        console.log(
          "AI DATA:",
          data
        );

        if (!data) {

          setAiText(
            "Sorry, I could not connect to the AI."
          );

          return;
        }

        setAiText(data.response || "");

        handleCommand(data);

        setUserText("");

      } catch (error) {

        console.log(
          "Assistant error:",
          error
        );

        setAiText(
          "Sorry, something went wrong."
        );
      }
    };

    // ================= AUTO LISTEN =================

    const fallback = setInterval(() => {

      if (
        !isSpeakingRef.current &&
        !isRecognizingRef.current
      ) {

        safeRecognition();
      }

    }, 10000);

    safeRecognition();

    return () => {

      recognition.stop();

      setListening(false);

      isRecognizingRef.current = false;

      clearInterval(fallback);
    };

  }, []);

  // ================= UI =================

  return (

    <div className="main-container">

      {/* Customize only when logged in */}

      {userData && (
        <button
          onClick={() =>
            navigate("/customize")
          }
        >
          Go to Customize
        </button>
      )}

      {/* Logout only when logged in */}

      {userData && (
        <button
          onClick={handleLogOut}
          className="logout"
        >
          Logout
        </button>
      )}

      <div className="assistant-image-container">

        <img
          src={
            userData?.assistantImage ||
            "/default-ai.png"
          }
          alt="Assistant"
          className="assistant-image"
        />

      </div>

      <p className="assistant-name">

        I am{" "}
        {userData?.assistantName ||
          "VexaAI"}

      </p>

      {!aiText && (
        <img
          src={userImg}
          alt=""
          className="voice-animation"
        />
      )}

      {aiText && (
        <img
          src={aiImg}
          alt=""
          className="voice-animation"
        />
      )}

      <h1>
        {userText
          ? userText
          : aiText
          ? aiText
          : null}
      </h1>

    </div>
  );
};

export default MainPage;