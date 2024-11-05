import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { UserContext } from '../context/UserContext'; // Adjust the import based on your structure

const RegisterForm = ({ setModalIsOpen }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      const success = await register({ username, email, password });
      if (success) {
        setModalIsOpen(false);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <Typography color="error">{error}</Typography>}
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
      <Button
        onClick={() => setModalIsOpen(false)}
        variant="outlined"
        sx={{ mt: 1 }} // Using sx for margin top
        fullWidth
      >
        Cancel
      </Button>
    </Box>
  );
};

export default RegisterForm;
