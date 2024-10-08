"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function EditTransaction({ params }) {
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('income');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const fetchTransaction = async () => {
      const token = localStorage.getItem('access_token');
      const res = await axios.get(`http://localhost:8000/api/transactions/${id}/`, {
        headers: { Authorization: `Token ${token}` }
      });
      setAmount(res.data.amount);
      setTransactionType(res.data.transaction_type);
      setCategory(res.data.category.id);
    };

    const fetchCategories = async () => {
      const token = localStorage.getItem('access_token');
      const res = await axios.get('http://localhost:8000/api/categories/', {
        headers: { Authorization: `Token ${token}` }
      });
      setCategories(res.data);
    };

    fetchTransaction();
    fetchCategories();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    await axios.put(
      `http://localhost:8000/api/transactions/${id}/`,
      {
        amount,
        transaction_type: transactionType,
        category,
        date: new Date().toISOString().split('T')[0],
      },
      { headers: { Authorization: `Token ${token}` } }
    );
    router.push('/dashboard');
  };

  return (
    <div className="bg-[gray] p-5 mt-20 rounded-lg">
      <h1 className="text-2xl my-5 uppercase">Edit Transaction</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          className='text-black'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          className='text-black'
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='text-black'
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button type="submit">Update Transaction</button>
      </form>
    </div>
  );
}
