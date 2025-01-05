"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ManageMonthlyReportTutor from "../Components/ManageMonthlyReportTutor";
export default function ContentMonthlyReportAdmin(params) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts?_start=0&_limit=15")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  }, []);

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
