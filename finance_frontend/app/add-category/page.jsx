"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AddCategory() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    try {
      await axios.post(
        'http://localhost:8000/api/categories/',
        { name },
        { headers: { Authorization: `Token ${token}` } }
      );
      router.push('/categories');
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <div>
      <h1>Add New Category</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
}
