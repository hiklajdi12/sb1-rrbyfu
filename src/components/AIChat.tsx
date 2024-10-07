import React, { useState } from 'react';

export const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ sender: string; content: string }>>([]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = async () => {
    if (inputMessage.trim()) {
      setMessages(prevMessages => [...prevMessages, { sender: 'You', content: inputMessage }]);
      
      try {
        const response = await fetch('YOUR_BACKEND_API_URL/ai-chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: inputMessage }),
        });
        
        const data = await response.json();
        setMessages(prevMessages => [...prevMessages, { sender: 'AI', content: data.response }]);
      } catch (error) {
        console.error('Error communicating with AI:', error);
        setMessages(prevMessages => [...prevMessages, { sender: 'AI', content: 'Sorry, I encountered an error.' }]);
      }
      
      setInputMessage('');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="h-64 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.sender === 'You' ? 'text-right' : 'text-left'}`}>
            <span className="font-bold">{message.sender}: </span>
            {message.content}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-grow px-3 py-2 border rounded-l"
          placeholder="Ask the AI..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-r">Send</button>
      </div>
    </div>
  );
};