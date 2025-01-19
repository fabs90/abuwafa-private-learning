"use client";
import StudentTable from "./StudentTable";
import ScheduleData from "./ScheduleData.json";
import DashboardLayoutStudent from "./DashboardLayoutStudent";
import { Suspense, useEffect, useState } from "react";
import Loading from "./loading";
import { Breadcrumb } from "../admin/Components/Breadcrumb";
import { Grid2X2 } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";

const client = axios.create({
  baseURL: "http://localhost:8080/api/schedules",
});

export default function DashboardStudent() {
  const [loading, setLoading] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    const student_id = Cookies.get("user_id");

    if (!token) {
      console.error("Authorization token is missing!");
      setLoading(false);
      return;
    }

    try {
      client
        .get(`/?studentId=${student_id}`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          const schedules = response.data.schedules;

          // Map the day column to corresponding day names
          const mappedSchedules = schedules.map((schedule) => ({
            ...schedule,
            day: mapDay(schedule.day),
          }));

          setData(mappedSchedules);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error: ", error);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error: ", error);
    }
  }, []);

  // Function to map numeric days to day names
  const mapDay = (day) => {
    const dayMap = {
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
      7: "Sunday",
    };
    return dayMap[day] || day; // Fallback to the original value if not in the map
  };

  return (
    <DashboardLayoutStudent>
      <Suspense fallback={<Loading />}>
        <Breadcrumb
          items={[
            { label: "Dashboard", link: "/dashboard/student", icon: Grid2X2 },
          ]}
        />
        <StudentTable
          data={data}
          hiddenColumns={[
            "id_schedule",
            "date",
            "curriculum",
            "time_duration",
            "total_session",
            "id_tutor",
            "id_student",
          ]}
        />
      </Suspense>
    </DashboardLayoutStudent>
  );
}
