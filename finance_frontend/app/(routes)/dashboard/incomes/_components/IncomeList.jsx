"use client";
import React, { useEffect, useState } from "react";
import CreateIncomes from "./CreateIncomes";
import axios from "axios";
import IncomeItem from "./IncomeItem";

function IncomeList() {
  const [incomeList, setIncomeList] = useState([]);

  useEffect(() => {
    getIncomeList();
  }, []);

  /**
   * Fetch income list from Django API
   */
  const getIncomeList = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await axios.get("http://localhost:8000/api/incomes/", {
        headers: { Authorization: `Token ${token}` },
      });
      console.log("Income List:", res);
      setIncomeList(res.data); 
    } catch (error) {
      console.error("Error fetching income list:", error);
    }
  };

  return (
    <div className="mt-7">
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <CreateIncomes refreshData={getIncomeList} />
        {incomeList?.length > 0
          ? incomeList.map((budget, index) => (
              <IncomeItem budget={budget} key={index} />
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default IncomeList;
