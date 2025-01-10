"use client";

import { Grid2X2 } from "lucide-react";
import { Breadcrumb } from "../Components/Breadcrumb";
import ManageMonthlyReportTutor from "../Components/ManageMonthlyReportTutor";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "@/app/dashboard/admin/monthly-report/loading";
import ManagePaycheckTable from "../Components/ManagePaycheckTable";

// const client = axios.create({
//   baseURL: "https://fakerapi.it/api/v2/creditCards?_quantity=15",
// });

export default function ContentPaycheckAdmin() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   client
  //     .get()
  //     .then((response) => {
  //       setLoading(false);
  //       setData(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error: ", error);
  //     });
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center my-auto h-screen">
        <Loading />
      </div>
    );
  }

  const datas = [
    {
      name: "Hanif",
      month: "January",
      status: "✅",
    },
    {
      name: "Hanif",
      month: "February",
      status: "✅",
    },
    {
      name: "Hanif",
      month: "March",
      status: "❌",
    },
  ];

  return (
    <>
      <ManagePaycheckTable
        data={datas}
        columnName={["Tutor Name", "Month", "Status"]}
      />
    </>
  );
}
