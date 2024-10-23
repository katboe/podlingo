import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = () => {
    setIsAuthenticated(true); // No need to store the token manually
  };

  const logout = () => {
    setIsAuthenticated(false); // Clear authentication state on logout
    fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, { method: 'POST' }); // Call the backend logout route to clear the cookie
  };

  return (
    <UserContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};