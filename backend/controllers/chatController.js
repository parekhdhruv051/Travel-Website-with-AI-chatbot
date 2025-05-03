// controllers/chatController.js
import { OpenAI } from "openai";
import axios from "axios";
import Tour from "../models/Tour.js";
import translate from "@vitalets/google-translate-api";

const openai = new OpenAI({
  apiKey: process.env.GITHUB_TOKEN,
  baseURL: "https://api.chatanywhere.tech/v1",
});

const getDetailedWeather = async (city) => {
  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const encodedCity = encodeURIComponent(city);
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodedCity}&days=3`;

    const response = await axios.get(url);
    const data = response.data;

    const currentWeather = data.current;
    const forecast = data.forecast.forecastday;

    let weatherInfo = `Current weather in ${city}: ${currentWeather.condition.text}, Temp: ${currentWeather.temp_c}°C.`;

    forecast.forEach((day) => {
      const date = new Date(day.date).toLocaleDateString();
      const condition = day.day.condition.text;
      const maxTemp = day.day.maxtemp_c;
      const minTemp = day.day.mintemp_c;
      const precip = day.day.totalprecip_mm;
      weatherInfo += `\nForecast for ${date}: ${condition}, Max Temp: ${maxTemp}°C, Min Temp: ${minTemp}°C, Precipitation: ${precip} mm.`;
    });

    return weatherInfo;
  } catch (error) {
    console.error(
      "Weather API Error:",
      error.response ? error.response.data : error.message
    );
    return "Sorry, unable to fetch weather data due to an error.";
  }
};

const translateText = async (text, targetLang = "en") => {
  try {
    const res = await translate(text, { to: targetLang });
    return res.text;
  } catch (err) {
    console.error("Translation Error:", err);
    return text;
  }
};

const calculateDateForDay = (startDate, dayOffset) => {
  const start = new Date(startDate);
  start.setDate(start.getDate() + dayOffset);
  return start.toLocaleDateString();
};

const greetings = [
  "Hello, how can I help you?",
  "Good to see you again",
  "Hi there, how can I help?",
];
const goodbyes = ["See you!", "Have a nice day", "Bye! Come back again soon."];
const thanksResponses = [
  "Happy to help!",
  "Any time!",
  "My pleasure",
  "No problem!",
  "Cheers",
];

const detectSmallTalkCategory = (message) => {
  const greetingWords = [
    "hello",
    "hi",
    "hey",
    "good day",
    "morning",
    "afternoon",
    "evening",
    "you there",
    "how are you",
    "can you help me?",
  ];
  const goodbyeWords = [
    "bye",
    "see you",
    "later",
    "goodbye",
    "farewell",
    "talk to you later",
    "peace out",
  ];
  const thanksWords = [
    "thanks",
    "thank you",
    "appreciate",
    "grateful",
    "helpful",
  ];

  if (greetingWords.some((word) => message.includes(word))) {
    return "greeting";
  }
  if (goodbyeWords.some((word) => message.includes(word))) {
    return "goodbye";
  }
  if (thanksWords.some((word) => message.includes(word))) {
    return "thanks";
  }

  return null;
};

// Pattern to detect weather queries
const weatherPattern = /weather in\s+([\w\s-]+)/i;

const travelPatterns = [
  /travel to\s+([\w\s-]+)/i,
  /tour to\s+([\w\s-]+)/i,
  /visit\s+([\w\s-]+)/i,
  /trip to\s+([\w\s-]+)/i,
  /going to\s+([\w\s-]+)/i,
  /get me details about\s+([\w\s-]+)/i,
  /get me details for\s+([\w\s-]+)/i,
  /i want to visit\s+([\w\s-]+)/i,
  /i want to travel to\s+([\w\s-]+)/i,
  /i want to go to\s+([\w\s-]+)/i,
  /i am planning to for\s+([\w\s-]+)/i,
  /give me details about\s+([\w\s-]+)/i,
  /give me details for\s+([\w\s-]+)/i,

];

const extractDestination = (message, patterns) => {
  for (const pattern of patterns) {
    const match = message.match(pattern);
    if (match) {
      return match[1].trim(); // Return the extracted destination or city
    }
  }
  return null; // No destination or city found
};

export const chatWithBot = async (req, res) => {
  const userMessageRaw = req.body.message || "";
  const userMessage = userMessageRaw.toLowerCase().trim();
  const targetLanguage = req.body.language || "en";

  if (!userMessage) {
    return res.status(400).json({ reply: "Message is required." });
  }

  try {
    const category = detectSmallTalkCategory(userMessage);
    if (category) {
      let responseList;
      switch (category) {
        case "greeting":
          responseList = greetings;
          break;
        case "goodbye":
          responseList = goodbyes;
          break;
        case "thanks":
          responseList = thanksResponses;
          break;
      }
      const response =
        responseList[Math.floor(Math.random() * responseList.length)];
      return res.json({ reply: response });
    }

    const weatherCity = extractDestination(userMessage, [weatherPattern]);
    if (weatherCity) {
      const weatherInfo = await getDetailedWeather(weatherCity);
      if (
        weatherInfo !== "Sorry, unable to fetch weather data due to an error."
      ) {
        return res.json({
          reply: `🌤️ Weather information for ${weatherCity}: ${weatherInfo}`,
        });
      } else {
        return res.json({
          reply:
            "❌ Sorry, I'm unable to provide relevant information for the weather in this city.",
        });
      }
    }

    const destination = extractDestination(userMessage, travelPatterns);
    let tours;
    if (destination) {
      tours = await Tour.find({
        $or: [
          { title: { $regex: destination, $options: "i" } },
          { city: { $regex: destination, $options: "i" } },
          { address: { $regex: destination, $options: "i" } },
        ],
      });
    } else {
      const tourQuery = {
        $or: [
          { title: { $regex: userMessage, $options: "i" } },
          { city: { $regex: userMessage, $options: "i" } },
          { address: { $regex: userMessage, $options: "i" } },
        ],
      };
      tours = await Tour.find(tourQuery);
    }

    if (tours.length > 0) {
      const replies = await Promise.all(
        tours.map(async (tour) => {
          const title = await translateText(tour.title, targetLanguage);
          const city = await translateText(tour.city || "", targetLanguage);
          const desc = await translateText(tour.desc, targetLanguage);
          const weather = await getDetailedWeather(tour.city || "");

          const itinerary = tour.itinerary?.length
            ? tour.itinerary
              .map((item, idx) => {
                const dayDate = calculateDateForDay(new Date(), idx);
                return `Day ${item.day || idx + 1
                  } (${dayDate}): ${item.description.join(" ")}`;
              })
              .join("\n\n\n\n")
            : "Please contact us at travelworld07@gmail.com";

          return `✈️ Tour: ${title}\n📍 Location: ${city}\n📖 Description: ${desc}\n💵 Price: ₹${tour.price}\n👥 Max Group Size: ${tour.maxGroupSize}\n🌤️ Weather in ${city}: ${weather}\n\n Itinerary:\n${itinerary}`;
        })
      );

      return res.json({ reply: replies.join("\n\n---\n\n") });
    }

    return res.json({
      reply:
        "❌ Sorry, this tour is not available in our database. Please try another location or contact us at travelworld07@gmail.com.",
    });
  } catch (error) {
    console.error("❌ Chatbot Error:", error);
    return res.status(500).json({ reply: "Internal server error" });
  }
};
