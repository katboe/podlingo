import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext'; // Adjust the import based on your structure

const RegisterForm = ({ setModalIsOpen }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(UserContext); // Assuming login is a method in UserContext

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation for password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token); // Log the user in after successful registration
        setModalIsOpen(false); // Close the modal after successful registration
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
        <button type="submit">Register</button>
      </form>
      <button onClick={() => setModalIsOpen(false)}>Cancel</button>
    </div>
  );
};

export default RegisterForm;
