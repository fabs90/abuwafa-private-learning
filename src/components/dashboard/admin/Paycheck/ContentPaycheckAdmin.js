"use client";

import { Grid2X2 } from "lucide-react";
import { Breadcrumb } from "../Components/Breadcrumb";
import ManageMonthlyReportTutor from "../Components/ManageMonthlyReportTutor";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "@/app/dashboard/admin/monthly-report/loading";
import ManagePaycheckTable from "../Components/ManagePaycheckTable";
import Cookies from "js-cookie";

const client = axios.create({
  baseURL: "http://localhost:8080/api/paychecks",
});

export default function ContentPaycheckAdmin() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");

    client
      .get("/", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        setLoading(false);
        setData(response.data.paychecks);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, []);

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

  return (
    <>
      <ManagePaycheckTable
        data={data}
        hiddenColumns={["id_paycheck", "id_tutor", "file"]}
      />
    </>
  );
}
