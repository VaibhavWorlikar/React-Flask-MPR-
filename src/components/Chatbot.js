import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '../components/Chatbot.css';

const Chatbot = () => {
    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const chatLogRef = useRef(null);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const userMessage = { message: message.trim() };
        setChatLog([...chatLog, { sender: 'User', text: message }]);
        setMessage('');

        try {
            setIsLoading(true);
            const response = await axios.post('http://127.0.0.1:5000', userMessage);
            setChatLog((prev) => [...prev, { sender: 'Bot', text: response.data.response }]);
        } catch (error) {
            console.error("Error sending message:", error);
            setChatLog((prev) => [...prev, { sender: 'Bot', text: "Sorry, something went wrong." }]);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle welcome message when chat opens
    useEffect(() => {
        if (isOpen) {
            setChatLog([{ sender: 'Bot', text: 'Hello! How can I assist you today?' }]);
        }
    }, [isOpen]);

    // Auto-scroll to the bottom
    useEffect(() => {
        if (chatLogRef.current) {
            chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
        }
    }, [chatLog]);

    return (
        <div>
            {/* Custom Logo Chat Icon */}
            <div className="chat-icon" onClick={() => setIsOpen(!isOpen)}>
                <img src={require('../images/ChatBotLogo.png')} alt="Chatbot Logo" className="chat-logo" />
            </div>

            {/* Chat Window with Smooth Animation */}
            <div className={`chat-window ${isOpen ? 'open' : 'closed'}`}>
                <h2 className="chat-heading">AgniRakshak Chatbot</h2>
                <div className="chat-log" ref={chatLogRef}>
                    {chatLog.map((chat, index) => (
                        <div
                            key={index}
                            className={`chat-message ${chat.sender === 'User' ? 'user' : 'bot'}`}
                        >
                            <span className="chat-icon-label">
                                {chat.sender === 'User' ? (
                                    <span className="user-icon">🟢</span>
                                ) : (
                                    <img src={require('../images/ChatBotLogo.png')} alt="Bot Logo" className="chat-bot-logo" />
                                )}
                            </span>
                            <div className="chat-text">{chat.text}</div>
                        </div>
                    ))}
                    {isLoading && <div className="loading">Bot is typing...</div>}
                </div>
                <form className="chat-form" onSubmit={handleSend}>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ask me something..."
                        className="chat-input"
                    />
                    <button type="submit" className="chat-send-button" disabled={!message.trim()}>
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chatbot;
