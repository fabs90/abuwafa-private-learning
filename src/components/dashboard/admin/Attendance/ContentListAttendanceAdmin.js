"use client";
import axios from "axios";
import ManageAttendaceTable from "../Components/ManageAttendanceTable";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const client = axios.create({
  baseURL: "http://localhost:8080/api/attendance/schedule/",
});

export default function ContentListAttendanceAdmin({ slug }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const token = Cookies.get("token");
  const id_schedule = slug;

  useEffect(() => {
    try {
      const response = client
        .get(`${id_schedule}`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((res) => {
          setData(res.data.attendances);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error fetching tutor data:", error);
      setLoading(false);
      return;
    }
  }, [id_schedule, token]);

  return (
    <>
      <ManageAttendaceTable
        data={data}
        hiddenColumns={[
          "id_subject",
          "image",
          "report_generated",
          "date",
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
