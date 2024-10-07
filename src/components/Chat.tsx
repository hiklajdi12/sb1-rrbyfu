import React, { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';

interface ChatProps {
  socket: Socket | null;
  encryptMessage: (message: string) => string;
  decryptMessage: (encryptedMessage: string) => string;
}

export const Chat: React.FC<ChatProps> = ({ socket, encryptMessage, decryptMessage }) => {
  const [messages, setMessages] = useState<Array<{ sender: string; content: string }>>([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    if (socket) {
      socket.on('chat message', (encryptedMessage: string) => {
        const decryptedMessage = decryptMessage(encryptedMessage);
        setMessages(prevMessages => [...prevMessages, { sender: 'Other', content: decryptedMessage }]);
      });
    }
  }, [socket, decryptMessage]);

  const sendMessage = () => {
    if (socket && inputMessage.trim()) {
      const encryptedMessage = encryptMessage(inputMessage);
      socket.emit('chat message', encryptedMessage);
      setMessages(prevMessages => [...prevMessages, { sender: 'You', content: inputMessage }]);
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
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-r">Send</button>
      </div>
    </div>
  );
};