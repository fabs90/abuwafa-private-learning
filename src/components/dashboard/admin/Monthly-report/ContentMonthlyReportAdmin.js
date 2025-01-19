"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ManageMonthlyReportTutor from "../Components/ManageMonthlyReportTutor";
import Loading from "@/app/dashboard/admin/monthly-report/loading";
export default function ContentMonthlyReportAdmin(params) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center my-auto h-screen">
  //       <Loading />
  //     </div>
  //   );
  // }

  return (
    <>
      <ManageMonthlyReportTutor primaryColumn="userId" />
    </>
  );
}
