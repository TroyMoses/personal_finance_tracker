"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function EditCategory() {
  const [name, setName] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchCategory = async () => {
      const token = localStorage.getItem('access_token');
      const res = await axios.get(`http://localhost:8000/api/categories/${id}/`, {
        headers: { Authorization: `Token ${token}` }
      });
      setName(res.data.name);
    };

    if (id) {
      fetchCategory();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    try {
      await axios.put(
        `http://localhost:8000/api/categories/${id}/`,
        { name },
        { headers: { Authorization: `Token ${token}` } }
      );
      router.push('/categories');
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <div>
      <h1>Edit Category</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Update Category</button>
      </form>
    </div>
  );
}
