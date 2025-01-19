"use client";
import { IdCard, Notebook } from "lucide-react";
import { FormField } from "../../tutor/TutorComponents/InputField";
import ButtonForm from "@/components/button/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loading from "@/app/dashboard/admin/monthly-report/loading";

// Create axios instances with proper error handling
const createAxiosInstance = (baseURL) => {
  const instance = axios.create({ baseURL });

  instance.interceptors.request.use(
    (config) => {
      const token = Cookies.get("token");
      if (token) {
        config.headers.Authorization = `${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

const clientTutor = createAxiosInstance(
  "http://localhost:8080/api/tutors/profiles"
);

const clientPaycheck = createAxiosInstance(
  "http://localhost:8080/api/paycheck"
);

const fetchTutorData = async (token) => {
  try {
    const response = await clientTutor.get("/", {
      headers: { Authorization: `${token}` },
    });

    const data = response.data.profile;

    if (Array.isArray(data)) {
      return data; // Pastikan data adalah array
    }

    console.error("Expected an array but received:", data);
    return [];
  } catch (error) {
    console.error("Error fetching tutor data:", error);
    return [];
  }
};

export default function CreatePaycheckAdmin(params) {
  const [tutorData, setTutorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = Cookies.get("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const [tutors] = await Promise.all([fetchTutorData(token)]);
        console.log("Fetched tutor data:", tutors); // Debugging log
        setTutorData(tutors);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const TutorOptions = Array.isArray(tutorData)
    ? tutorData.map((tutor) => ({
        label: tutor.tutor_name,
        value: tutor.id_tutor,
      }))
    : [];

  const handleTutorChange = (selectedOption) => {
    setSelectedTutor(selectedOption);
  };

  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      if (!selectedTutor || !selectedMonth) {
        alert("Please select both tutor and month");
        return;
      }

      // Get the file from the input
      const fileInput = e.target.querySelector('input[type="file"]');
      const file = fileInput.files[0];

      // Create the current year-month format
      const currentYear = new Date().getFullYear();
      const monthValue = selectedMonth.value.padStart(2, "0");
      const formattedMonth = `${currentYear}-${monthValue}`;

      // Append all data to FormData
      formData.append("tutor_name", selectedTutor.label);
      formData.append("id_tutor", selectedTutor.value);
      formData.append("month", formattedMonth);
      formData.append("status", e.target.status.value);
      if (file) {
        formData.append("file", file);
      }

      const response = await clientPaycheck.post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.error === false) {
        alert("Paycheck created successfully");
        // Reset form or redirect as needed
        window.location.reload();
      }
    } catch (error) {
      console.error("Error creating paycheck:", error);
      alert("Failed to create paycheck. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center my-auto h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-2 gap-0 md:gap-4 lg:gap-4">
          <div>
            <div className="w-full">
              <FormField
                label={"Tutor Name"}
                name="tutor_name"
                type="select2"
                selectOptions={TutorOptions}
                onChange={handleTutorChange}
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
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="w-full">
                <FormField
                  label={"Month"}
                  name="month"
                  icon={
                    <IdCard
                      width={16}
                      height={16}
                      className="opacity-70 flex-shrink-0"
                    />
                  }
                  type="select2"
                  selectOptions={[
                    { label: "January", value: "01" },
                    { label: "February", value: "02" },
                    { label: "March", value: "03" },
                    { label: "April", value: "04" },
                    { label: "May", value: "05" },
                    { label: "June", value: "06" },
                    { label: "July", value: "07" },
                    { label: "August", value: "08" },
                    { label: "September", value: "09" },
                    { label: "October", value: "10" },
                    { label: "November", value: "11" },
                    { label: "December", value: "12" },
                  ]}
                  onChange={handleMonthChange}
                  placeholder={"Month"}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="w-full">
              <label className="block text-sm mb-1 mt-4 text-white">File</label>
              <label
                className={`bg-white border-black rounded-lg flex items-center gap-2 w-full`}
              >
                <input
                  type="file"
                  name="paycheck_file"
                  className={`text-black w-full`} // Ensure the input takes full width
                  accept="*/*"
                />
              </label>
            </div>
            <div className="w-full">
              <FormField
                label={"Status"}
                name="status"
                icon={
                  <IdCard
                    width={16}
                    height={16}
                    className="opacity-70 flex-shrink-0"
                  />
                }
                selectOptions={[
                  {
                    label: "Paid",
                    value: "paid",
                  },
                  {
                    label: "Unpaid",
                    value: "unpaid",
                  },
                ]}
                type="select2"
                placeholder={"Paycheck Status"}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-6 mx-auto">
          <ButtonForm type="submit" text="Submit" />
        </div>
      </form>
    </>
  );
}
