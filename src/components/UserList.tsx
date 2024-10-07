import React, { useState, useEffect } from 'react';
import { fetchUsers, deleteUser } from '../api/users';

export const UserList: React.FC = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    };
    loadUsers();
  }, []);

  const handleDeleteUser = async (userId: string) => {
    await deleteUser(userId);
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">User List</h2>
      <ul className="space-y-2">
        {users.map(user => (
          <li key={user.id} className="flex justify-between items-center bg-white p-2 rounded shadow">
            <span>{user.email}</span>
            <button
              onClick={() => handleDeleteUser(user.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};