import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [state, setState] = useState({
    isAuthenticated: false,
    userData: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await authService.verify();
        if (data && data.user) {
          setState(prev => ({
            ...prev,
            isAuthenticated: true,
            userData: data.user,
            loading: false,
            error: null
          }));
        } else {
          setState(prev => ({
            ...prev,
            isAuthenticated: false,
            userData: null,
            loading: false
          }));
        }
      } catch (error) {
        setState(prev => ({
          ...prev,
          isAuthenticated: false,
          userData: null,
          loading: false,
          error: error.message
        }));
      }
    };
    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      
      if (!response.data || !response.data.user) {
        throw new Error('Invalid response from server');
      }

      setState(prev => ({
        ...prev,
        isAuthenticated: true,
        userData: response.data.user,
        error: null
      }));
      
      return true;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error.message || 'Login failed'
      }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setState({
        isAuthenticated: false,
        userData: null,
        loading: false,
        error: null
      });
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      
      if (!response.data || !response.data.user) {
        throw new Error('Invalid response from server');
      }

      setState(prev => ({
        ...prev,
        isAuthenticated: true,
        userData: response.data.user,
        error: null
      }));
      
      return true;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error.message || 'Registration failed'
      }));
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{
      ...state,
      login,
      register,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
}; 