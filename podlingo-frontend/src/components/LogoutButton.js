import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Button } from '@mui/material';

const LogoutButton = () => {
  const { logout } = useContext(UserContext); 
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(); // Call the logout function
    navigate('/'); // Redirect to homepage after logout
  };

  return (
    <Button 
      color="inherit" 
      onClick={handleLogout} 
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
