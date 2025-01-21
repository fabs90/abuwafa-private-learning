import ContentListAttendanceAdmin from "@/components/dashboard/admin/Attendance/ContentListAttendanceAdmin";
import { Breadcrumb } from "@/components/dashboard/admin/Components/Breadcrumb";
import DashboardLayoutAdmin from "@/components/dashboard/admin/DashboardLayoutAdmin";
import axios from "axios";
import { Grid2X2, UserCheck } from "lucide-react";
import React from "react";

const client = axios.create({
  baseURL:
    "https://abuwafa-backend-2583485117.us-central1.run.app/api/attendance/schedule/",
});

export default function Page({ params }) {
  const slug = React.use(params).slug;

  const breadcrumbItems = [
    { label: "Dashboard", link: "/dashboard/admin", icon: Grid2X2 },
    {
      label: "Attendance",
      link: "/dashboard/admin/attendance",
      icon: UserCheck,
    },
    {
      label: "Attendance List",
      link: "/dashboard/admin/attendance/slug/list",
    },
  ];
  return (
    <>
      <DashboardLayoutAdmin title={`List Attendance ${slug}`}>
        <Breadcrumb items={breadcrumbItems} />
        <ContentListAttendanceAdmin slug={slug} />
      </DashboardLayoutAdmin>
    </>
  );
}
