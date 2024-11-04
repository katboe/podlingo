import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
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
  const { login } = useContext(UserContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      const success = await login({ email, password });
      if (success) {
        setModalIsOpen(false);
      }
    } catch (err) {
      setError(err.message);
      setSnackbarOpen(true);
    }
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
          <Typography color="error" sx={{ mb: 2 }}>
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={error}
      />
    </Container>
  );
};

export default LoginForm;
