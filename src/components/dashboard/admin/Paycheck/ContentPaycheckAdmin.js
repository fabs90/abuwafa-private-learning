"use client";

import { Grid2X2 } from "lucide-react";
import { Breadcrumb } from "../Components/Breadcrumb";
import ManageMonthlyReportTutor from "../Components/ManageMonthlyReportTutor";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "@/app/dashboard/admin/monthly-report/loading";

const client = axios.create({
  baseURL: "https://fakerapi.it/api/v2/creditCards?_quantity=15",
});

export default function ContentPaycheckAdmin() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .get()
      .then((response) => {
        setLoading(false);
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
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
        linkHref="http://localhost:3000/dashboard/admin/paycheck"
        primaryColumn="owner"
      />
    </>
  );
}
