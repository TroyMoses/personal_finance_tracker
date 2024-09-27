"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Plot from "react-plotly.js";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem("access_token");

      const res = await axios.get("http://localhost:8000/api/transactions/", {
        headers: { Authorization: `Token ${token}` },
      });

      setTransactions(res.data);
    };

    fetchTransactions();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("access_token");
    try {
      await axios.delete(`http://localhost:8000/api/transactions/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      // Remove the deleted transaction from the state
      setTransactions(
        transactions.filter((transaction) => transaction.id !== id)
      );
    } catch (error) {
      console.error("Error deleting the transaction:", error);
    }
  };

  const income = transactions
    .filter((t) => t.transaction_type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const expenses = transactions
    .filter((t) => t.transaction_type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="bg-[gray] p-5 mt-20 rounded-lg">
      <h1 className="text-2xl my-5">PERSONAL EXPENSE TRACKER</h1>

      <div className="flex flex-col gap-3 justify-center items-center">
        <Link
          href="/add-transaction"
          className="bg-green-500 py-1 px-2 rounded-md"
        >
          Add New Transaction
        </Link>

        <Link href="/categories" className="bg-blue-500 py-1 px-2 rounded-md">
          Manage Categories
        </Link>
      </div>

      <ul className="flex flex-col justify-center px-3 capitalize my-4 gap-6">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="flex justify-between">
            <span>
              {transaction.transaction_type}: {transaction.amount}
              {transaction.category.name}
            </span>
            <span className="flex justify-between gap-4">
              <button className="bg-red-500 py-1 px-2 rounded-md" onClick={() => handleDelete(transaction.id)}>
                Delete
              </button>
              <Link className="bg-yellow-500 py-1 px-2 rounded-md" href={`/edit-transaction/${transaction.id}`}>Edit</Link>
            </span>
          </li>
        ))}
      </ul>
      {/* <Plot
        data={[
          {type: 'bar', x: ['Income', 'Expenses'], y: [income, expenses]}
        ]}
        layout={{width: 400, height: 300, title: 'Income vs Expenses'}}
      /> */}
    </div>
  );
}
