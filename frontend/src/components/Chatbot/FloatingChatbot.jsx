import React, { useState } from 'react';
import './FloatingChatbot.css';
import { sendMessageToBot } from './chatApi'; // Replace with your actual API

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! 👋 I'm your Tour Assistant. Ask me about any place or tour!", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSend = async () => {
    if (input.trim() === "") return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const botReply = await sendMessageToBot(input);
      setMessages([...newMessages, { text: botReply, sender: "bot" }]);
    } catch (error) {
      setMessages([...newMessages, { text: "❌ Error communicating with server.", sender: "bot" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Floating Button */}
      <div className="floating-button" onClick={toggleChat}>
        💬
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className={`chat-window ${isExpanded ? 'expanded' : ''}`}>
          <div className="chat-header">
            <span>Travel World Chat</span>
            <div className="chat-controls">
              <button onClick={toggleExpand} title="Expand/Collapse">🗖</button>
              <button onClick={toggleChat} title="Close">✖</button>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text.split("\n").map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>
            ))}
            {isLoading && (
              <div className="message bot">Typing...</div>
            )}
          </div>

          <div className="chat-input">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..." 
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingChatbot;
