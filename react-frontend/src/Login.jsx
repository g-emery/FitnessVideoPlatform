import React, { useState } from 'react';
import NavBar from './NavBar';

export default function Login() {
  const [identifier, setIdentifier] = useState(''); // email or username
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:1337/api/auth/local', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();

      if (data.jwt) {
        // Login successful
        localStorage.setItem('jwt', data.jwt); // store JWT
        localStorage.setItem('user', JSON.stringify(data.user)); // store user info
        setMessage('Login successful!');
      } else {
        setMessage('Login failed: ' + (data.error?.message || 'Unknown error'));
      }
    } catch (err) {
      setMessage('Login error: ' + err.message);
    }
  };

  return (
    <>
    <NavBar />
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Email or username"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      <p>{message}</p>
    </form>
    </>
  );
}
