"use client";

import { useEffect, useState } from "react";
import ManageInvoiceTable from "../Components/ManageInvoiceTable";
import Loading from "@/app/dashboard/admin/monthly-report/loading";
import axios from "axios";
import Cookies from "js-cookie";

const client = axios.create({
  baseURL: "http://localhost:8080/api/invoices",
});

export default function ContentInvoiceAdmin(params) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    const student_id = Cookies.get("user_id");

    if (!token) {
      console.error("Authorization token is missing!");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      try {
        client
          .get("/", {
            headers: {
              Authorization: `${token}`,
            },
          })
          .then((res) => {
            setData(res.data.invoices);
            setLoading(false);
          });
      } catch (error) {
        console.error("Error: ", error);
        setLoading(false);
      }
    }, 1500);
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
      <ManageInvoiceTable
        data={data}
        hiddenColumns={["id_invoice", "id_student", "file"]}
      />
    </>
  );
}
