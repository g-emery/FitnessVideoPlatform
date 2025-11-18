import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:1337/api/auth/local/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    if (data.jwt) {
      setMessage('Registration successful! JWT token: ' + data.jwt);
    } else {
      setMessage('Registration failed');
    }
  };

  return (
    <>
    <h1>Register</h1>
    <form onSubmit={handleSubmit}>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Register</button>
      <p>{message}</p>
    </form>
    
    </>
  );
}
