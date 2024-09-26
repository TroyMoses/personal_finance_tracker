"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem('access_token');
      console.log('Token: ', token);
      const res = await axios.get('http://localhost:8000/api/transactions/', {
        headers: { Authorization: `Token ${token}` }
      });
      setTransactions(res.data);
    };

    fetchTransactions();
  }, []);

  const income = transactions.filter(t => t.transaction_type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const expenses = transactions.filter(t => t.transaction_type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div>
      <h1>Transaction Dashboard</h1>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.transaction_type}: {transaction.amount} - {transaction.category.name}
          </li>
        ))}
      </ul>
      {/* <Plot
        data={[
          {type: 'bar', x: ['Income', 'Expenses'], y: [income, expenses]}
        ]}
        layout={{width: 600, height: 400, title: 'Income vs Expenses'}}
      /> */}
    </div>
  );
}
