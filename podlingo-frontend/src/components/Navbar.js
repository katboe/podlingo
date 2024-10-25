import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext'; // Adjust the import path as needed
import RegisterForm from './RegisterForm'; // Adjust the import path as needed
import LoginForm from './LoginForm'; // Adjust the import path as needed
import { Link } from 'react-router-dom'; 
import LogoutButton from './LogoutButton';
import { AppBar, Toolbar, Button, Box, Popover } from '@mui/material';

const Navbar = () => {
  const {isAuthenticated} = useContext(UserContext); // Use context to access token and logout method
  const [isRegistering, setIsRegistering] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event, isRegister) => {
    setAnchorEl(event.currentTarget);
    setIsRegistering(isRegister);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: 'flex-end' }}>
        {isAuthenticated ? (
          <>
            <Link to="/settings" style={{ textDecoration: 'none' }}>
              <Button color="inherit">Settings</Button>
            </Link>
            <LogoutButton />
          </>
        ) : (
          <>
            <Button 
              color="inherit" 
              onClick={(e) => handleOpen(e, true)}
            >
              Register
            </Button>
            <Button 
              color="inherit" 
              onClick={(e) => handleOpen(e, false)}
            >
              Login
            </Button>
          </>
        )}

        {/* Popover for registration/login */}
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Box p={2}>
            {isRegistering ? (
              <RegisterForm setModalIsOpen={handleClose} />
            ) : (
              <LoginForm setModalIsOpen={handleClose} />
            )}
          </Box>
        </Popover>
      </Toolbar>
  </AppBar>
  );
};

export default Navbar;