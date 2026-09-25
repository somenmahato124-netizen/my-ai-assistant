import axios from "axios";

const geminiResponse = async (command,assistantName,userName) => {
    try {
        const apiUrl = process.env.GEMINI_API_URL;
        const apiKey = process.env.GEMINI_API_KEY;

        const prompt = `
You are a virtual assistant named ${assistantName}, created by ${userName}.
You are not Google. You will now behave like a voice-enabled assistant.

Your task is to understand the user's natural language input and respond with ONLY a valid JSON object in exactly this format:

{
  "type": "general" | "google_search" | "youtube_search" | "youtube_play" | "get_time" | "get_date" | "get_day" | "get_month" | "calculator_open" | "instagram_open" | "facebook_open" | "weather_show",
  "userInput": "<processed user input>",
  "response": "<short spoken response>"
}

Instructions:

1. "type" determines the user's intent.

2. "userInput":
   - Normally contain the original sentence spoken by the user.
   - If the user says your name, remove only your name from the userinput.
   - If the user asks to search something on Google, put ONLY the search query in userinput.
   - If the user asks to search something on YouTube, put ONLY the search query in userinput.
   - Do not change or rewrite the user's search query unnecessarily.

3. "response":
   - Give a short, natural, voice-friendly response.
   - Keep it concise.
   - Examples:
     - "Sure, playing it now."
     - "Here's what I found."
     - "Today is Tuesday."
     - "The current time is 3:30 PM."

Type meanings:

- "general": factual or informational questions.aur agar koi aisa question puchta hai jiska answer tume pata hai usko bhi general kki catagory me rakho bas short answer dena.
- "google_search": user wants to search something on Google.
- "youtube_search": user wants to search something on YouTube.
- "youtube_play": user wants to directly play a video or song.
- "calculator_open": user wants to open a calculator.
- "instagram_open": user wants to open Instagram.
- "facebook_open": user wants to open Facebook.
- "weather-show": user wants to know the weather.
- "get_time": user asks for the current time.
- "get_date": user asks for today's date.
- "get_day": user asks what day it is.
- "get_month": user asks for the current month.

Creator rule:
- If the user asks who created or made you, say that you were created by ${userName}.

Important:
- Return ONLY the JSON object.
- Do NOT include Markdown.
- Do NOT use code fences.
- Do NOT include any explanation outside the JSON.
- The output must be valid JSON.

User input:
${command}
`;
        console.log("Gemini URL:", apiUrl);
        console.log("Prompt:", prompt);

        const result = await axios.post(
            apiUrl,
            {
                contents: [
                    {
                        role: "user",
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ]
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": apiKey
                }
            }
        );

        const text =
            result.data?.candidates?.[0]?.content?.parts?.[0]?.text;

        return text || "No response from Gemini";

    } catch (error) {
        console.log(
            "Gemini Error:",
            JSON.stringify(error.response?.data, null, 2)
        );

        throw error;
    }
};

export default geminiResponse;