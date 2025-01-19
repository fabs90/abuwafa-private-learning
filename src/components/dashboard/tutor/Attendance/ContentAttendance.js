"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loading from "@/app/dashboard/admin/monthly-report/loading";
import AttendanceTutorTable from "../TutorComponents/AttendanceTutorTable";

const client = axios.create({
  baseURL: "http://localhost:8080/api/attendance",
});

export default function ContentAttendanceTutor(params) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format the date as needed
  };

  useEffect(() => {
    const token = Cookies.get("token");
    const id_user = Cookies.get("user_id");

    if (!token) {
      console.error("Authorization token is missing!");
      setLoading(false);
      return;
    }

    try {
      client
        .get(`/${id_user}`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          const formattedData = response.data.attendances.map((attendance) => ({
            ...attendance,
            date: formatDate(attendance.date), // Use the formatted date string
          }));
          setData(formattedData);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error: ", error);
      setLoading(false);
    }
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
      <AttendanceTutorTable
        data={data}
        isAttendance={true}
        hiddenColumns={[
          "id_attendance",
          "id_schedule",
          "id_tutor",
          "id_student",
          "id_subject",
          "report_generated",
          "topic",
          "method",
          "result",
          "image",
        ]}
      />
    </>
  );
}
