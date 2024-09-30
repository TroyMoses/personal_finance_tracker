import { Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import axios from "axios";

function ExpenseListTable({ expensesList, refreshData }) {
  /**
   * Delete expense using Django API
   */

  const deleteExpense = async (expense) => {
    try {
      const token = localStorage.getItem("access_token");
      // DELETE request to the Django API
      const res = await axios.delete(
        `http://localhost:8000/api/expenses/${expense.id}/`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      if (res.status === 204) {
        toast("Expense Deleted!");
        refreshData(); // Refresh the data after deletion
      } else {
        toast.error("Failed to delete expense");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Error deleting expense");
    }
  };

  return (
    <div className="mt-3">
      <h2 className="font-bold text-lg">Latest Expenses</h2>
      <div className="grid grid-cols-4 rounded-tl-xl rounded-tr-xl bg-slate-200 p-2 mt-3">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Action</h2>
      </div>
      {expensesList.map((expense, index) => (
        <div
          key={index}
          className="grid grid-cols-4 bg-slate-50 rounded-bl-xl rounded-br-xl p-2"
        >
          <h2>{expense.name}</h2>
          <h2>{expense.amount}</h2>
          <h2>{expense.date}</h2>
          <h2>
            <Trash
              className="text-red-500 cursor-pointer"
              onClick={() => deleteExpense(expense)}
            />
          </h2>
        </div>
      ))}
    </div>
  );
}

export default ExpenseListTable;

