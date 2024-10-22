import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext'; // Adjust the import based on your structure

const LoginForm = ({ setModalIsOpen }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(UserContext); // Assuming login is a method in UserContext

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation for email and password length
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
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

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <button onClick={() => setModalIsOpen(false)}>Cancel</button>
    </div>
  );
};

export default LoginForm;
