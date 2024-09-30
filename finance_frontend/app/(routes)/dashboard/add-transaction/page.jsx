"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AddTransaction() {
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('income');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const router = useRouter();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('access_token');

    await axios.post(
      'http://localhost:8000/api/transactions/',
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
    <div className="bg-[gray] p-5 mt-20 rounded-lg text-center">
      <h1 className="text-2xl my-5 uppercase">Add New Transaction</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="number"
          placeholder="Enter Amount"
          className="text-black rounded-sm py-1 px-3"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          className="text-black rounded-sm py-1 px-3"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="text-black rounded-sm py-1 px-3"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id} className="text-black">
              {cat.name}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-green-500 py-1 px-2 rounded-md">Add Transaction</button>
      </form>
    </div>
  );
}
