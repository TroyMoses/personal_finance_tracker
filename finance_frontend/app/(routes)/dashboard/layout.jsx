"use client";
import React, { useEffect } from "react";
import SideNav from "./_components/SideNav";

function DashboardLayout({ children }) {

  // const router = useRouter();
  // useEffect(() => {
  //   checkUserBudgets();
  // }, []);

  // const checkUserBudgets = async () => {
  //   const result = await db
  //     .select()
  //     .from(Budgets)
  //     .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));
  //   console.log(result);
  //   if (result?.length == 0) {
  //     router.replace("/dashboard/budgets");
  //   }
  // };

  return (
    <div>
      <div className="fixed md:w-64 hidden md:block ">
        <SideNav />
      </div>
      <div className="md:ml-64 ">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
