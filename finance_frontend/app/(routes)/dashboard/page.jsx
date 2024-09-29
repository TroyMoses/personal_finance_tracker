"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import CardInfo from "./_components/CardInfo";
import BarChartDashboard from "./_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";

function Dashboard() {

  const [budgetList, setBudgetList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    getUserInfo();
    getBudgetList();
    getIncomeList();
    getAllExpenses();
  }, []);

   /**
   * Fetch user info from Django API
   */
   const getUserInfo = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await axios.get("http://localhost:8000/api/user-info/", {
        headers: { Authorization: `Token ${token}` },
      });
      setUserInfo(res.data); // Store user info in state
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  /**
   * Fetch budgets from Django API
   */

  const getBudgetList = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await axios.get("http://localhost:8000/api/budgets/", {
        headers: { Authorization: `Token ${token}` },
      });
      setBudgetList(res.data);  // Assuming res.data is the list of budgets
    } catch (error) {
      console.error("Error fetching budget list:", error);
    }
  };

  /**
   * Fetch income streams from Django API
   */

  const getIncomeList = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await axios.get("http://localhost:8000/api/incomes/", {
        headers: { Authorization: `Token ${token}` },
      });
      setIncomeList(res.data);  // Assuming res.data is the list of incomes
    } catch (error) {
      console.error("Error fetching income list:", error);
    }
  };

   /**
   * Fetch all expenses from Django API
   */

  const getAllExpenses = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await axios.get("http://localhost:8000/api/expenses/", {
        headers: { Authorization: `Token ${token}` },
      });
      setExpensesList(res.data);  // Assuming res.data is the list of expenses
    } catch (error) {
      console.error("Error fetching expenses list:", error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="font-bold text-4xl">Hi, <span className="capitalize">{userInfo?.username}</span> 👋</h2>
      <p className="text-gray-500">
        Here's what's happening with your money. Let's manage your expenses.
      </p>

      <CardInfo budgetList={budgetList} incomeList={incomeList} />
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5">
        <div className="lg:col-span-2">
          <BarChartDashboard budgetList={budgetList} />

          <ExpenseListTable
            expensesList={expensesList}
            refreshData={() => getBudgetList()}
          />
        </div>
        <div className="grid gap-5">
          <h2 className="font-bold text-lg">Latest Budgets</h2>
          {budgetList?.length > 0
            ? budgetList.map((budget, index) => (
                <BudgetItem budget={budget} key={index} />
              ))
            : [1, 2, 3, 4].map((item, index) => (
                <div
                  key={index}
                  className="h-[180px] w-full bg-slate-200 rounded-lg animate-pulse"
                ></div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
