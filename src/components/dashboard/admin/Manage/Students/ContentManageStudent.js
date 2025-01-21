"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loading from "@/app/dashboard/admin/monthly-report/loading";
import ManageStudentAdminTable from "../../Components/ManageStudentAdminTable";

const client = axios.create({
  baseURL:
    "https://abuwafa-backend-2583485117.us-central1.run.app/api/students/profiles",
});

export default function ContentManageStudent(params) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token"); // Get token from cookies

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
        setData(response.data); // Set the data after fetching
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

  return (
    <>
      <ManageStudentAdminTable
        data={data?.profile}
        rowsPerPage={5}
        href="/dashboard/admin/manage/students/create"
        hiddenColumns={[
          "city",
          "phone_student",
          "parent_name",
          "address",
          "package",
          "grade",
          "curriculum",
          "password",
          "role",
          "parent_name",
        ]}
        primary_key="student_id"
      />
    </>
  );
}
