"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ManageMonthlyReportTutor from "../Components/ManageMonthlyReportTutor";
import Loading from "@/app/dashboard/admin/monthly-report/loading";
import Cookies from "js-cookie";
export default function ContentMonthlyReportAdmin(params) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDistinctAttendances = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(
          "http://localhost:8080/api/attendances/distinct",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(response.data);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching distinct attendances:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDistinctAttendances();
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
      <ManageMonthlyReportTutor data={data} />
    </>
  );
}
