import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem('access_token');
      const res = await axios.get('http://localhost:8000/api/transactions/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTransactions(res.data);
    };

    fetchTransactions();
  }, []);

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
    </div>
  );
}
