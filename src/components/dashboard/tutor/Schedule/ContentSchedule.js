"use client";
import axios from "axios";
import TutorTable from "../TutorComponents/TutorTable";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const client = axios.create({
  baseURL:
    "https://abuwafa-backend-2583485117.us-central1.run.app/api/schedules",
});

export default function ContentSchedule(params) {
  const [loading, setLoading] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    const tutorId = Cookies.get("user_id");

    console.log("Token:", token);
    console.log("Tutor ID:", tutorId);

    if (!token) {
      console.error("Authorization token is missing!");
      setLoading(false);
      return;
    }

    try {
      client
        .get(`/?tutorId=${tutorId}`, {
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
    <>
      <TutorTable
        data={data}
        hiddenColumns={[
          "id_schedule",
          "id_student",
          "id_tutor",
          "id_subject",
          "tutor_name",
          "total_session",
          "curriculum",
          "time_duration",
          "date",
        ]}
      />
    </>
  );
}
