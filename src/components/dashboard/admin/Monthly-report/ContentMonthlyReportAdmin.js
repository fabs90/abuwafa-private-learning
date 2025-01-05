"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ManageMonthlyReportTutor from "../Components/ManageMonthlyReportTutor";
import Loading from "@/app/dashboard/admin/monthly-report/loading";
export default function ContentMonthlyReportAdmin(params) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts?_start=0&_limit=15")
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center my-auto h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <ManageMonthlyReportTutor
        data={data}
        hiddenColumns={["id", "userId"]}
        linkHref="http://localhost:3000/dashboard/admin/monthly-report"
        primaryColumn="userId"
      />
    </>
  );
}
