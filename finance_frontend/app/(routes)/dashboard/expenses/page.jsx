"use client";

import React, { useEffect, useState } from "react";
import ExpenseListTable from "./_components/ExpenseListTable";
import axios from "axios";

function ExpensesScreen() {
  const [expensesList, setExpensesList] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await axios.get("http://localhost:8000/api/user-info/", {
          headers: { Authorization: `Token ${token}` },
        });
        setUserInfo(res.data); 
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    if (userInfo) {
      getBudgetList();
    }
  }, [userInfo]);

  /**
   * Fetch the list of budgets from the Django backend
   */
  const getBudgetList = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await axios.get("http://localhost:8000/api/budgets/", {
        headers: { Authorization: `Token ${token}` },
      });
      setBudgetList(res.data);  
    } catch (error) {
      console.error("Error fetching budget list:", error);
    }
  };

  /**
   * Fetch all expenses for the current user from Django API
   */
  const getAllExpenses = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await axios.get("http://localhost:8000/api/expenses/", {
        headers: { Authorization: `Token ${token}` },
      });
      setExpensesList(res.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl">My Expenses</h2>
      <ExpenseListTable refreshData={getAllExpenses} expensesList={expensesList} />
    </div>
  );
}

export default ExpensesScreen;
