// src/Chat.js
import React, { useState } from 'react';
import ChatbotService from './ChatbotService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './Chat.css';

function Chat() {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState([{ author: 'bot', content: 'Welcome to ChatBot!' }]);

  const sendMessage = () => {
    if (value.trim()) {
      const userMessage = { author: 'user', content: value };
      setMessages([...messages, userMessage]);

      ChatbotService.generateResponse(value)
        .then((response) => {
          const botMessage = { author: 'bot', content: response.data };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        })
        .catch((error) => {
          console.error('Error fetching response from backend:', error);
        });

      setValue('');
    }
  };

  return (
    <div className="container">
      <div className="chat-section">
        <div className="header">
          <img src="../images/ChatBot.png" alt="ChatBot Logo" className="logo" />
          <h1>ChatBot</h1>
        </div>
        <div className="message-container">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.author === 'bot' ? 'to' : 'from'}`}>
              {message.author === 'user' ? (
                <div className="message-content-wrapper">
                  <div className="message-content">{message.content}</div>
                </div>
              ) : (
                <div className="message-content-wrapper">
                  <div className="avatar">
                    <img src="/images/ChatBot.png" alt="Bot Avatar" />
                  </div>
                  <div className="message-content">{message.content}</div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="chat-input-container">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            type="text"
            className="styled-input"
            placeholder="Type your message here..."
          />
          <FontAwesomeIcon icon={faPaperPlane} className="send-icon" onClick={sendMessage} />
        </div>
      </div>
    </div>
  );
}

export default Chat;
