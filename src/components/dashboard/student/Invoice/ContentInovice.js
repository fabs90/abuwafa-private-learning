"use client";
import { Grid2X2 } from "lucide-react";
import { Breadcrumb } from "../../admin/Components/Breadcrumb";
import StudentTable from "../StudentTable";
import InoviceData from "./InvoiceData.json";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "@/app/dashboard/admin/monthly-report/loading";
import Cookies from "js-cookie";

const client = axios.create({
  baseURL:
    "https://abuwafa-backend-2583485117.us-central1.run.app/api/invoice/list",
});

export default function ContentInovice(params) {
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
          .get(`/${student_id}`, {
            headers: {
              Authorization: `${token}`,
            },
          })
          .then((res) => {
            setData(res.data.invoice);
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
      <Breadcrumb
        items={[
          { label: "Dashboard", link: "/dashboard", icon: Grid2X2 },
          {
            label: "Invoice",
            link: "/dashboard/student/invoice",
          },
        ]}
      />
      <StudentTable
        data={data}
        isInvoice={true}
        hiddenColumns={["file", "id_invoice"]}
      />
    </>
  );
}
