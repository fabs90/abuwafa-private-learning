"use client";
import ButtonForm from "@/components/button/Button";
import { Breadcrumb } from "@/components/dashboard/admin/Components/Breadcrumb";
import DashboardLayoutAdmin from "@/components/dashboard/admin/DashboardLayoutAdmin";
import { FormField } from "@/components/dashboard/tutor/TutorComponents/InputField";
import axios from "axios";
import Cookies from "js-cookie";
import { Book, Grid2X2 } from "lucide-react";
import { useEffect, useState } from "react";
import SuccessAlert from "@/components/dashboard/tutor/TutorComponents/SuccessAlert";

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

const clientSubject = createAxiosInstance(
  "https://abuwafa-backend-2583485117.us-central1.run.app/api/subject"
);

export default function Page() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  // Check if success status exists in localStorage
  useEffect(() => {
    if (localStorage.getItem("subjectCreated") === "true") {
      setIsSuccess(true);
      localStorage.removeItem("subjectCreated");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    const form = new FormData(e.target);

    const payload = {
      id_subject: "",
      subject: form.get("subject"),
      description: form.get("description"),
    };

    try {
      const response = await clientSubject.post("/", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSuccessMessage(response.data.message);
      localStorage.setItem("subjectCreated", true);
      window.location.reload();
    } catch (err) {
      console.error("Error response:", err.response);
      setError(
        err.response?.data?.message ||
          "An error occurred while creating the subject."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
      }, 3000); // Close after 3 seconds

      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [isSuccess]);

  const breadcrumbItems = [
    { label: "Dashboard", link: "/dashboard/admin", icon: Grid2X2 },
    {
      label: "Manage Subjects",
      link: "/dashboard/admin/manage/subjects",
    },
    {
      label: "Create Subjects",
      link: "/dashboard/admin/manage/subjects/creates",
    },
  ];
  return (
    <>
      <DashboardLayoutAdmin title="Create Subjects">
        <SuccessAlert isOpen={isSuccess} onClose={() => setIsSuccess(false)} />
        <Breadcrumb items={breadcrumbItems} />
        <form onSubmit={handleSubmit}>
          <div className="w-full grid grid-rows-1">
            <div className="grid grid-rows-1 text-sm">
              <div className="md:grid md:grid-rows-1 md:grid-cols-2 gap-2 md:gap-6">
                <div>
                  <div>
                    <FormField
                      label="Subject Title"
                      type="text"
                      icon={<Book width={16} />}
                      placeholder="Subject title"
                      name="subject"
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <div>
                      <label className="block text-sm mb-1 mt-4 text-white">
                        Description
                      </label>
                      <textarea
                        className="textarea border-neutral text-black w-full"
                        placeholder="Bio"
                        rows={1}
                        name="description"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <ButtonForm type={"submit"} text={"Submit"} />
            </div>
          </div>
        </form>
      </DashboardLayoutAdmin>
    </>
  );
}
