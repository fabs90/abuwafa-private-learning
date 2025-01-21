"use client";
import { useEffect, useState } from "react";
import ManageTutortable from "../../Components/ManageTutorTable";
import axios from "axios";
import Cookies from "js-cookie";
import Loading from "@/app/dashboard/admin/monthly-report/loading";

const client = axios.create({
  baseURL:
    "https://abuwafa-backend-2583485117.us-central1.run.app/api/tutors/profiles/",
});

export default function ContentManageTutor(params) {
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
      <ManageTutortable
        data={data?.profile}
        href="/dashboard/admin/manage/tutors/create"
        hiddenColumns={[
          "phone_tutor",
          "email",
          "address",
          "city",
          "bank",
          "no_rek",
          "password",
          "role",
          "courses_type",
        ]}
      />
    </>
  );
}
