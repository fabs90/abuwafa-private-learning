"use client";
import axios from "axios";
import ManageTutortable from "../../Components/ManageTutorTable";
import ScheduleData from "./dataschedules.json";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loading from "@/components/dashboard/student/loading";
import ManageScheduleTable from "../../Components/ManageScheduleTable";

const client = axios.create({
  baseURL: "http://localhost:8080/api/schedules",
});

export default function ContentManageSchedules() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");

    console.log(token);

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
      .then((res) => {
        setData(res.data.schedules);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error: ", error);
        setLoading(false);
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
      <ManageScheduleTable
        data={data}
        rowsPerPage={5}
        href="/dashboard/admin/manage/schedules/create"
        hiddenColumns={[
          "id_schedule",
          "id_student",
          "id_tutor",
          "id_subject",
          "date",
          "link",
          "method",
          "time_duration",
          "total_session",
        ]}
      />
    </>
  );
}
