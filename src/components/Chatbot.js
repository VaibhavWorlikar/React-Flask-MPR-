import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState([]);

    const handleSend = async () => {
        if (!message) return;

        const userMessage = { message: message };
        setChatLog([...chatLog, { sender: 'User', text: message }]);
        setMessage('');

        try {
            const response = await axios.post('http://127.0.0.1:5000', userMessage);
            setChatLog((prev) => [...prev, { sender: 'Bot', text: response.data.response }]);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', border: '1px solid #ccc' }}>
            <h2>Fire Service Chatbot</h2>
            <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
                {chatLog.map((chat, index) => (
                    <div key={index} style={{ margin: '5px 0' }}>
                        <strong>{chat.sender}:</strong> {chat.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me something..."
                style={{ width: '80%', padding: '10px' }}
            />
            <button onClick={handleSend} style={{ padding: '10px' }}>Send</button>
        </div>
    );
};

export default Chatbot;
