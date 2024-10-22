import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null); // null means no user is logged in

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken); // Store the token in local storage
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token'); // Remove the token from local storage
  };
  return (
    <UserContext.Provider value={{ token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
