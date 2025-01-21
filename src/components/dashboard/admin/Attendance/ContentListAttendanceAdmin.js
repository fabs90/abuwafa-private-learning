"use client";
import axios from "axios";
import ManageAttendaceTable from "../Components/ManageAttendanceTable";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loading from "@/app/dashboard/admin/monthly-report/loading";

const client = axios.create({
  baseURL:
    "https://abuwafa-backend-2583485117.us-central1.run.app/api/attendance/schedule/",
});

export default function ContentListAttendanceAdmin({ slug }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const token = Cookies.get("token");
  const id_schedule = slug;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.get(`${id_schedule}`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        // Transform the data to convert ISO date strings to normal date format
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
        setData(transformedData); // Set the transformed data
        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchData();
  }, [id_schedule, token]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center">
        <Loading />
      </div>
    ); // You can replace this with your loading component
  }

  return (
    <>
      <ManageAttendaceTable
        data={data}
        hiddenColumns={[
          "id_subject",
          "image",
          "report_generated",
          "time",
          "id_student",
          "id_tutor",
          "id_schedule",
          "id_attendance",
          "topic",
          "result",
        ]}
        isDetailAttendance={true}
      />
    </>
  );
}
