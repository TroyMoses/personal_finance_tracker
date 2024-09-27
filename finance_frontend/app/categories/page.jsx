import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem('access_token');
      const res = await axios.get('http://localhost:8000/api/categories/', {
        headers: { Authorization: `Token ${token}` }
      });
      setCategories(res.data);
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('access_token');
    try {
      await axios.delete(`http://localhost:8000/api/categories/${id}/`, {
        headers: { Authorization: `Token ${token}` }
      });
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Error deleting the category:", error);
    }
  };

  return (
    <div>
      <h1>Manage Categories</h1>
      <Link href="/add-category">
        Add New Category
      </Link>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.name}
            <button onClick={() => handleDelete(category.id)}>Delete</button>
            <Link href={`/edit-category/${category.id}`}>
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
