// src/ChatbotService.js
import axios from 'axios';

const apiUrl = 'http://localhost:8081/ai/chat';

const generateResponse = (message) => {
  return axios.get(`${apiUrl}?message=${message}`);
};

export default { generateResponse };
