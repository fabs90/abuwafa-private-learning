"use client";
import axios from "axios";
import TutorTable from "../TutorComponents/TutorTable";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loading from "../../student/loading";

const client = axios.create({
  baseURL: "http://localhost:8080/api/paychecks",
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
