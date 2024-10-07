import React, { useState, useEffect } from 'react';
import { LogoutButton } from './LogoutButton';
import { Chat } from './Chat';
import { VideoCall } from './VideoCall';
import { AIChat } from './AIChat';
import { useAuth } from '../contexts/AuthContext';
import { Socket } from 'socket.io-client';
import { encryptMessage, decryptMessage } from '../utils/encryption';

export const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeComponent, setActiveComponent] = useState<'chat' | 'video' | 'ai'>('chat');
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('YOUR_BACKEND_URL');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <div className="mb-4 flex space-x-2">
        <button
          className={`px-4 py-2 rounded ${activeComponent === 'chat' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveComponent('chat')}
        >
          Chat
        </button>
        <button
          className={`px-4 py-2 rounded ${activeComponent === 'video' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveComponent('video')}
        >
          Video Call
        </button>
        <button
          className={`px-4 py-2 rounded ${activeComponent === 'ai' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveComponent('ai')}
        >
          AI Chat
        </button>
      </div>
      {activeComponent === 'chat' && <Chat socket={socket} encryptMessage={encryptMessage} decryptMessage={decryptMessage} />}
      {activeComponent === 'video' && <VideoCall />}
      {activeComponent === 'ai' && <AIChat />}
      <LogoutButton />
    </div>
  );
};