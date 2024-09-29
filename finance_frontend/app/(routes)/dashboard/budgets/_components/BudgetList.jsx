"use client";

import React, { useEffect, useState } from 'react';
import CreateBudget from './CreateBudget';
import axios from 'axios';
import BudgetItem from './BudgetItem';

function BudgetList() {
  const [budgetList, setBudgetList] = useState([]);
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

  return (
    <div className='mt-7'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <CreateBudget refreshData={() => getBudgetList()} />
        {budgetList?.length > 0 ? (
          budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          ))
        ) : (
          [1, 2, 3, 4, 5].map((item, index) => (
            <div
              key={index}
              className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'
            ></div>
          ))
        )}
      </div>
    </div>
  );
}

export default BudgetList;
