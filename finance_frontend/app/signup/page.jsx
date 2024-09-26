"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/signup/', {
        username, password
      });
      localStorage.setItem('access_token', res.data.token);
      router.push('/dashboard');
    } catch (err) {
      setError('Signup failed. Username may be taken.');
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-black"
        />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p>{error}</p>}
      <Link href="/login">
        Already have an account? Log in here
      </Link>
    </div>
  );
}


