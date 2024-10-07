import React, { useState, useEffect } from 'react';
import { UserList } from './UserList';
import { CreateUserForm } from './CreateUserForm';
import { ChangePasswordForm } from './ChangePasswordForm';
import { LogoutButton } from './LogoutButton';

export const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <div className="mb-4 flex space-x-2">
        <button
          className={`px-4 py-2 rounded ${activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'create' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('create')}
        >
          Create User
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'password' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('password')}
        >
          Change Password
        </button>
      </div>
      {activeTab === 'users' && <UserList />}
      {activeTab === 'create' && <CreateUserForm />}
      {activeTab === 'password' && <ChangePasswordForm />}
      <LogoutButton />
    </div>
  );
};