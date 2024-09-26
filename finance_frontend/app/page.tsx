"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/token/', {
        username, password
      });
      console.log("Response: ", res);
      localStorage.setItem('access_token', res.data.access);
      router.push('/dashboard');
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <Link href="/signup">
        Don{"’"}t have an account? Sign up here
      </Link>
    </div>
  );
}
