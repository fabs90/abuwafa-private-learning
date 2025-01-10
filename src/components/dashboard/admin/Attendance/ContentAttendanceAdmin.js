"use client";
import { Grid2x2, UserCheck } from "lucide-react";
import { Breadcrumb } from "../Components/Breadcrumb";
import ManageAttendaceTable from "../Components/ManageAttendanceTable";
import ManageAttendanceFitTable from "../Components/ManageAttendanceFitTable";
import { useEffect, useState } from "react";
import Loading from "@/app/dashboard/admin/monthly-report/loading";
export default function ContentAttendanceAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const tutorName = [
    {
      id: 1,
      name: "John Doe",
      slug: "john-doe",
    },
    {
      id: 2,
      name: "John Smith",
      slug: "john-smith",
    },
    {
      id: 3,
      name: "Siti Nurbaya",
      slug: "siti-nurbaya",
    },
    {
      id: 4,
      name: "Ethan Hunt",
      slug: "ethan-hunt",
    },
    {
      id: 5,
      name: "James Bond",
      slug: "james-bond",
    },
  ];
  useEffect(() => {
    setTimeout(() => {
      setData(tutorName);
      setLoading(false);
    }, 1000);
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
        data={tutorName}
        hiddenColumns={["id", "slug"]}
      />
    </>
  );
}
