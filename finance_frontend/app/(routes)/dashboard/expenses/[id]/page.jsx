"use client";

import React, { useEffect, useState } from "react";
import AddExpense from "../_components/AddExpense";
import ExpenseListTable from "../_components/ExpenseListTable";
import axios from "axios";
import { useRouter } from "next/navigation";
import EditBudget from "../_components/EditBudget";
import { toast } from "sonner";
import { ArrowLeft, Trash } from "lucide-react";

function ExpensesScreen({ params }) {
  const [budgetInfo, setBudgetInfo] = useState(null);
  const [expensesList, setExpensesList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getBudgetInfo();
  }, []);

  /**
   * Fetch budget information from Django API
   */
  const getBudgetInfo = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await axios.get(`http://localhost:8000/api/budgets/${params.id}/`, {
        headers: { Authorization: `Token ${token}` },
      });

      setBudgetInfo(res.data);
      getExpensesList();
    } catch (error) {
      console.error("Error fetching budget info:", error);
    }
  };

  /**
   * Fetch associated expenses from Django API
   */
  const getExpensesList = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await axios.get(`http://localhost:8000/api/expenses/?budget=${params.id}`, {
        headers: { Authorization: `Token ${token}` },
      });

      setExpensesList(res.data);
    } catch (error) {
      console.error("Error fetching expenses list:", error);
    }
  };

  /**
   * Delete the budget and associated expenses
   */
  const deleteBudget = async () => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`http://localhost:8000/api/budgets/${params.id}/`, {
        headers: { Authorization: `Token ${token}` },
      });

      toast("Budget Deleted!");
      router.replace("/dashboard/budgets");
    } catch (error) {
      console.error("Error deleting budget:", error);
      toast.error("Failed to delete budget.");
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold gap-2 flex justify-between items-center">
        <span className="flex gap-2 items-center">
          <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
          My Expenses
        </span>
        <div className="flex gap-2 items-center">
          <EditBudget budgetInfo={budgetInfo} refreshData={getBudgetInfo} />
          <button className="flex gap-2 rounded-full" onClick={deleteBudget}>
            <Trash className="w-4" /> Delete
          </button>
        </div>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        {budgetInfo ? (
          <div>{budgetInfo.name}</div>
        ) : (
          <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        )}
        <AddExpense budgetId={params.id} refreshData={getBudgetInfo} />
      </div>
      <div className="mt-4">
        <ExpenseListTable expensesList={expensesList} refreshData={getBudgetInfo} />
      </div>
    </div>
  );
}

export default ExpensesScreen;
