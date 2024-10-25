import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext'; // Adjust the import based on your structure
import {
  Container,
  Button,
  TextField,
  Typography,
  Snackbar,
} from '@mui/material';

const LoginForm = ({ setModalIsOpen }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(UserContext); // Assuming login is a method in UserContext
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation for email and password length
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      setSnackbarOpen(true);
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include', //allows credentials to be sent and received
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token); // Log the user in with the token received
        setModalIsOpen(false); // Close the modal after successful login
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        {error && (
          <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
          <Button variant="outlined" onClick={() => setModalIsOpen(false)}>
            Cancel
          </Button>
        </div>
      </form>

      {/* Snackbar for error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={error}
      />
    </Container>
  );
};

export default LoginForm;
