"use client";
import axios from "axios";
import TutorTable from "../TutorComponents/TutorTable";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loading from "../../student/loading";

const client = axios.create({
  baseURL:
    "https://abuwafa-backend-2583485117.us-central1.run.app/api/paychecks",
});

export default function ContentPaycheck() {
  const [loading, setLoading] = useState();
  const [data, setData] = useState();

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
          setData(response.data.paychecks);
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
  if (loading) {
    return (
      <div className="flex justify-center items-center my-auto h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <TutorTable
        data={data}
        hiddenColumns={["id_paycheck", "id_tutor", "file"]}
        showDetail={true}
        title={"paycheck"}
      />
    </>
  );
}
