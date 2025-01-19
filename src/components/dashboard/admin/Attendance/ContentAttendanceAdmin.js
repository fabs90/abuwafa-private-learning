"use client";
import { Grid2x2, UserCheck } from "lucide-react";
import { Breadcrumb } from "../Components/Breadcrumb";
import ManageAttendaceTable from "../Components/ManageAttendanceTable";
import ManageAttendanceFitTable from "../Components/ManageAttendanceFitTable";
import { useEffect, useState } from "react";
import Loading from "@/app/dashboard/admin/monthly-report/loading";
import axios from "axios";
import Cookies from "js-cookie";

const client = axios.create({
  baseURL: "http://localhost:8080/api/attendances",
});
export default function ContentAttendanceAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      console.error("Authorization token is missing!");
      setLoading(false); // Stop loading in case there's no token
      return;
    }

    client
      .get("/", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        setData(response.data); // Set the data after fetching
        setLoading(false); // Stop loading once data is set
      })
      .catch((error) => {
        console.error("Error: ", error);
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center my-auto h-screen">
        <Loading />
      </div>
    );
  }

  const breadcrumbItems = [
    { label: "Dashboard", link: "/dashboard/admin", icon: Grid2x2 },
    {
      label: "Attendance",
      link: "/dashboard/admin/attendance",
    },
  ];
  return (
    <>
      <div className="flex justify-between">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <ManageAttendanceFitTable
        data={data.attendances}
        hiddenColumns={[
          "image",
          "report_generated",
          "topic",
          "result",
          "id_subject",
          "date",
          "id_tutor",
          "id_attendance",
          "id_schedule",
          "id_student",
        ]}
      />
    </>
  );
}
