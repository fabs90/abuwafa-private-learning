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
  baseURL:
    "https://abuwafa-backend-2583485117.us-central1.run.app/api/attendances",
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
        const transformedData = response.data.attendances.map((item) => {
          const date = new Date(item.date); // Replace 'item.date' with the actual date field name
          const formattedDate = `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`; // d/m/y format

          return {
            ...item,
            date: formattedDate, // Replace the ISO date with the formatted date
          };
        });
        setData(transformedData); // Set the data after fetching
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
        data={data}
        hiddenColumns={[
          "image",
          "report_generated",
          "topic",
          "result",
          "id_subject",
          "id_tutor",
          "id_attendance",
          "id_schedule",
          "id_student",
          "time",
        ]}
      />
    </>
  );
}
