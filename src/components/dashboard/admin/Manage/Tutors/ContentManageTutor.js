"use client";
import { useEffect, useState } from "react";
import ManageTutortable from "../../Components/ManageTutorTable";
import Loading from "@/components/dashboard/student/loading";
import axios from "axios";
import Cookies from "js-cookie";

const client = axios.create({
  baseURL: "http://localhost:8080/api/tutors/profiles",
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
