// This file contains placeholder functions for authentication API calls
// In a real application, these would make actual API requests

export const loginUser = async (email: string, password: string) => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        resolve({
          id: '1',
          email: email,
          isAdmin: email.toLowerCase().includes('admin'),
        });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 500);
  });
};

export const logoutUser = () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
};

export const getCurrentUser = async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // For testing purposes, let's return a mock user
      // In a real app, this would check for a stored session
      resolve({
        id: '1',
        email: 'user@example.com',
        isAdmin: false,
      });
    }, 500);
  });
};