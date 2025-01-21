"use client";
import { Breadcrumb } from "@/components/dashboard/admin/Components/Breadcrumb";
import DashboardLayoutAdmin from "@/components/dashboard/admin/DashboardLayoutAdmin";
import AttendanceTable from "@/components/dashboard/tutor/TutorComponents/AttendanceTable";
import { FormField } from "@/components/dashboard/tutor/TutorComponents/InputField";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Baby,
  CalendarDaysIcon,
  Clock,
  Cone,
  Grid2X2,
  House,
  NotebookIcon,
  UserCheck,
} from "lucide-react";

import React, { useEffect, useState } from "react";
export default function Page({ params }) {
  // Get the slug
  const slug = React.use(params).slug;
  const [curr, setCurrentTime] = useState(null);
  const [date, setDate] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const currentTime = new Date();
    setCurrentTime(currentTime);
    setDate(currentTime.toISOString().split("T")[0]); // Set the date when currentTime is available
  }, []);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        setLoading(true);
        const token = Cookies.get("token");
        console.log("Token:", token);

        if (!token) {
          throw new Error("Authorization token is missing.");
        }

        console.log("Fetching data for slug:", slug);

        const response = await axios.get(
          `https://abuwafa-backend-2583485117.us-central1.run.app/api/attendance/detail/${slug}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        setData(response.data.attendance);
        console.log("Attendance data:", response.data.attendance);

        if (response.data.attendance?.date) {
          const formattedDate = new Date(response.data.attendance.date)
            .toISOString()
            .split("T")[0];
          setDate(formattedDate);
        }
      } catch (err) {
        console.error("Error fetching attendance details:", err);
        setError(err.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchAttendanceData();
    }
  }, [slug]);

  const breadcrumbItems = [
    { label: "Dashboard", link: "/dashboard/admin", icon: Grid2X2 },
    {
      label: "Attendance",
      link: "/dashboard/admin/attendance",
    },
    {
      label: "Attendance List",
      link: `/dashboard/admin/attendance/${slug}/list`,
    },
    {
      label: "Attendance Detail",
      link: `/dashboard/admin/attendance/${slug}/detail`,
    },
  ];

  return (
    <>
      <DashboardLayoutAdmin title="Attendance Detail">
        <div className="flex justify-between">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <div className="text-accent text-md font-semibold mt-3">
          Status Attendance:{" "}
          {data?.attendance_status === "Present" ? (
            <span className="text-accent">
              {data?.attendance_status || "N/A"}
            </span>
          ) : (
            <span className="text-secondarySiena">
              {data?.attendance_status || "N/A"}
            </span>
          )}
        </div>
        <div className="rounded-lg">
          <form id="attendanceForm">
            <div className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-2 gap-0 md:gap-4 lg:gap-4">
              <div>
                <div className="w-full">
                  <FormField
                    label={"Tutor Name"}
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                      >
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                      </svg>
                    }
                    defaultValue={data?.tutor_name || ""}
                  />
                </div>
                <div className="w-full">
                  <FormField
                    label={"Time"}
                    icon={<Clock width={16} />}
                    defaultValue={data?.time || ""}
                    placeholder="Format: Jam.Menit-Jam.Menit"
                  />
                </div>
                <div className="w-full">
                  <FormField
                    label={"Date"}
                    icon={<CalendarDaysIcon width={16} />}
                    type="date"
                    defaultValue={date}
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm mb-1 mt-4 text-white">
                    Image
                  </label>
                  <div className="card bg-base-100 w-96 shadow-xl rounded-lg">
                    <figure className="rounded-lg">
                      <img
                        className="w-1/2"
                        src={
                          data?.image
                            ? `http://localhost:3000/uploads/attendances/${data.image}`
                            : "/img/contoh-attendance.png"
                        }
                        alt="Attendance"
                      />
                    </figure>
                  </div>
                </div>
              </div>

              <div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <FormField
                      label="Session"
                      icon={
                        <svg
                          fill="currentColor"
                          className="h-4 w-4 opacity-70 flex-shrink-0"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g fill="#292d32">
                            <path d="m19 8c1.6569 0 3-1.34315 3-3s-1.3431-3-3-3-3 1.34315-3 3 1.3431 3 3 3z" />
                            <path d="m19.8 9.42c-.02 0-.04.01-.06.01-.1.02-.2.03-.31.05-.42.04-.87.02-1.33-.07-.12-.03-.22-.05-.33-.09-.33-.08-.64-.21-.93-.38-.12-.06-.24-.14-.35-.21-.48-.33-.89-.74-1.22-1.22-.07-.11-.15-.23-.21-.35-.17-.29-.3-.6-.38-.93-.04-.11-.06-.21-.09-.33-.09-.46-.11-.91-.07-1.33.02-.11.03-.21.05-.31 0-.02.01-.04.01-.06.12-.62-.34-1.2-.98-1.2h-6.08c-.14 0-.28.01-.41.02-.12.01-.23.02-.35.04-.12.01-.24.03-.35.05-2.41.35-3.95 1.88-4.3 4.3-.02.11-.04.23-.05.35-.02.12-.03.23-.04.35-.01.13-.02.27-.02.41v7.96c0 .14.01.28.02.41.01.12.02.23.04.35.01.12.03.24.05.35.35 2.42 1.89 3.95 4.3 4.3.11.02.23.04.35.05.12.02.23.03.35.04.13.01.27.02.41.02h7.96c.14 0 .28-.01.41-.02.12-.01.23-.02.35-.04.12-.01.24-.03.35-.05 2.41-.35 3.95-1.88 4.3-4.3.02-.11.04-.23.05-.35.02-.12.03-.23.04-.35.01-.13.02-.27.02-.41v-6.08c0-.64-.58-1.1-1.2-.98zm-13.05 3.08h5c.41 0 .75.34.75.75s-.34.75-.75.75h-5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75zm9 5.5h-9c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h9c.41 0 .75.34.75.75s-.34.75-.75.75z" />
                          </g>
                        </svg>
                      }
                      placeholder="status"
                      type="text"
                      defaultValue={data?.session || ""}
                    />
                  </div>
                  <div className="">
                    <FormField
                      label="Subject"
                      icon={<Baby width={16} />}
                      defaultValue={data?.subject || ""}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <FormField
                    label="Student Name"
                    icon={<Baby width={16} />}
                    defaultValue={data?.student_name || ""}
                    type="text"
                  />
                </div>
                <div className="w-full">
                  <FormField
                    label="Method"
                    icon={<House width={16} />}
                    defaultValue={data?.method || ""}
                    type="text"
                  />
                </div>
                <div className="w-full">
                  <FormField
                    label="Topic"
                    icon={<Cone width={16} />}
                    type="text"
                    required={true}
                    placeholder="Write your topic here"
                    defaultValue={data?.topic || ""}
                  />
                </div>
                <div className="w-full">
                  <FormField
                    label="Result"
                    icon={<NotebookIcon width={16} />}
                    type="text"
                    required={true}
                    placeholder="Write your result here"
                    defaultValue={data?.result || ""}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </DashboardLayoutAdmin>
    </>
  );
}
