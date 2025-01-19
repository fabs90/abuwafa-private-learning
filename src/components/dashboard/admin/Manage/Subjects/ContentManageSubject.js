"use client";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Loading from "@/app/dashboard/admin/monthly-report/loading";
import ManageSubjectTable from "../../Components/ManageSubjectTable";

const client = axios.create({
  baseURL: "http://localhost:8080/api/subjects",
});

export default function ContentManageSubject(params) {
  const [data, setData] = useState(true);
  const [loading, setLoading] = useState(null);

  useState(() => {
    const token = Cookies.get("token");

    if (!token) {
      console.error("Authorization token is missing!");
      setLoading(false);
      return;
    }

    try {
      client
        .get(`/`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((res) => {
          // console.log(res.data);
          setData(res.data.subjects);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error: ", error);
      setLoading(false);
    }
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
      <ManageSubjectTable
        data={data}
        hiddenColumns={["id_subject"]}
        href="/dashboard/admin/manage/subjects/create"
      />
    </>
  );
}
