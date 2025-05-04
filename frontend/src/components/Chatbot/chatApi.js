// frontend/src/api/chatApi.js
import axios from 'axios';

const API_URL = 'https://travel-website-with-ai-chatbot-production.up.railway.app/api/chat';

export const sendMessageToBot = async (userMessage) => {
  try {
    const response = await axios.post(API_URL, { message: userMessage });
    return response.data.reply;
  } catch (error) {
    console.error('❌ Error sending message to bot:', error);
    return "Sorry, something went wrong. Please try again later.";
  }
};
