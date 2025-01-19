"use client";
import Loading from "@/app/dashboard/admin/monthly-report/loading";
import ButtonForm from "@/components/button/Button";
import ConfirmAlert from "@/components/dashboard/tutor/TutorComponents/ConfirmAlert";
import {
  FormField,
  PasswordField,
} from "@/components/dashboard/tutor/TutorComponents/InputField";
import axios from "axios";
import { CircleUser, Key, User } from "lucide-react";
import { useState } from "react";

const client = axios.create({
  baseURL: "http://localhost:8080/auth/register",
});

export default function ContentCreateStudent() {
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const studentData = {
      id_student: formData.get("id_student"),
      student_name: formData.get("student_name"),
      phone_student: formData.get("student_phone"),
      parent_name: formData.get("student_parent"),
      address: formData.get("student_address"),
      status: formData.get("student_status"),
      package: formData.get("student_package"),
      school: formData.get("student_school"),
      grade: formData.get("student_grade"),
      username: formData.get("student_username"),
      password: formData.get("student_password"),
      role: "Student",
    };
    setFormData(studentData);
    setIsConfirmVisible(true);
  };

  const handleConfirm = async () => {
    setIsConfirmVisible(false);

    try {
      setError(null);
      const response = await client.post("/", formData);

      if (!response.data.error) {
        router.reload(); // Refresh the page to clear the form
        setLoading(true);
      } else {
        setError(
          response.data.message || "Failed to create student. Please try again."
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred while creating the student."
      );
    } finally {
      alert("Data submitted successfully");
      setLoading(false);
      window.location.reload();
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
      <ConfirmAlert
        isOpen={isConfirmVisible}
        onClose={() => setIsConfirmVisible(false)}
        onConfirm={handleConfirm}
      />
      <form id="createStudent" onSubmit={handleSubmit}>
        <div className="w-full grid grid-rows-1">
          <div className="grid grid-rows-1 text-sm">
            <div className="md:grid md:grid-rows-1 md:grid-cols-2 gap-2 md:gap-6">
              <div>
                <div>
                  <FormField
                    label="ID"
                    icon={
                      <User
                        width={16}
                        height={16}
                        className="opacity-70 flex-shrink-0"
                      />
                    }
                    placeholder="Enter ID Student"
                    name="id_student"
                  />
                </div>
                <div>
                  <FormField
                    label="Name"
                    name="student_name"
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
                    placeholder="Enter Student"
                  />
                </div>

                <div className="md:grid md:grid-cols-2 gap-4">
                  <div>
                    <FormField
                      label="Phone"
                      name="student_phone"
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-4 w-4  opacity-70 flex-shrink-0"
                        >
                          <path d="M21.384,17.752a2.108,2.108,0,0,1-.522,3.359,7.543,7.543,0,0,1-5.476.642C10.5,20.523,3.477,13.5,2.247,8.614a7.543,7.543,0,0,1,.642-5.476,2.108,2.108,0,0,1,3.359-.522L8.333,4.7a2.094,2.094,0,0,1,.445,2.328A3.877,3.877,0,0,1,8,8.2c-2.384,2.384,5.417,10.185,7.8,7.8a3.877,3.877,0,0,1,1.173-.781,2.092,2.092,0,0,1,2.328.445Z" />
                        </svg>
                      }
                      placeholder="Your phone num."
                    />
                  </div>
                  <div>
                    <FormField
                      label="Parent"
                      name="student_parent"
                      icon={
                        <svg
                          viewBox="0 0 17 19"
                          fill="currentColor"
                          className="h-4 w-4 opacity-70 flex-shrink-0"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="m7.181 15.129a1.81 1.81 0 0 0 .223.872h-5.554a1.27 1.27 0 0 1 -1.267-1.267v-1.9a3.176 3.176 0 0 1 3.167-3.167h5.478a3.177 3.177 0 0 0 .557 1.067 3.135 3.135 0 0 0 -2.604 3.086zm-.581-6.412a3.236 3.236 0 1 1 3.236-3.236 3.236 3.236 0 0 1 -3.236 3.236zm9.817 6.412a.875.875 0 0 1 -.872.872h-6.542a.875.875 0 0 1 -.872-.872v-1.309a2.187 2.187 0 0 1 2.18-2.18h3.925a2.187 2.187 0 0 1 2.18 2.18zm-1.915-6.372a2.228 2.228 0 1 1 -2.228-2.228 2.228 2.228 0 0 1 2.228 2.228z" />
                        </svg>
                      }
                      placeholder="Your parent name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1 mt-4 text-white">
                    Address
                  </label>
                  <textarea
                    name="student_address"
                    className="textarea border-neutral text-black w-full"
                    placeholder="Bio"
                  ></textarea>
                </div>
              </div>
              <div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <FormField
                      label="Status"
                      name="student_status"
                      icon={
                        <svg
                          fill="currentColor"
                          className="h-4 w-4 opacity-70 flex-shrink-0"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g fill="#292d32">
                            <path d="m19 8c1.6569 0 3-1.34315 3-3s-1.3431-3-3-3-3 1.34315-3 3 1.3431 3 3 3z" />
                            <path d="m19.8 9.42c-.02 0-.04.01-.06.01-.1.02-.2.03-.31.05-.42.04-.87.02-1.33-.07-.12-.03-.22-.05-.33-.09-.33-.08-.64-.21-.93-.38-.12-.06-.24-.14-.35-.21-.48-.33-.89-.74-1.22-1.22-.07-.11-.15-.23-.21-.35-.17-.29-.3-.6-.38-.93-.04-.11-.06-.21-.09-.33-.09-.46-.11-.91-.07-1.33.02-.11.03-.21.05-.31 0-.02.01-.04.01-.06.12-.62-.34-1.2-.98-1.2h-6.08c-.14 0-.28.01-.41.02-.12.01-.23.02-.35.04-.12.01-.24.03-.35.05-2.41.35-3.95 1.88-4.3 4.3-.02.11-.04.23-.05.35-.02.12-.03.23-.04.35-.01.13-.02.27-.02.41v7.96c0 .14.01.28.02.41.01.12.02.23.04.35.01.12.03.24.05.35.35 2.42 1.89 3.95 4.3 4.3.11.02.23.04.35.05.12.02.23.03.35.04.13.01.27.02.41.02h7.96c.14 0 .28-.01.41-.02.12-.01.23-.02.35-.04.12-.01.24-.03.35-.05 2.41-.35 3.95-1.88 4.3-4.3.02-.11.04-.23.05-.35.02-.12.03-.23.04-.35.01-.13.02-.27.02-.41v-6.08c0-.64-.58-1.1-1.2-.98zm-13.05 3.08h5c.41 0 .75.34.75.75s-.34.75-.75.75h-5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75zm9 5.5h-9c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h9c.41 0 .75.34.75.75s-.34.75-.75.75z" />
                          </g>
                        </svg>
                      }
                      placeholder="status"
                      type="select2"
                      selectOptions={[
                        {
                          label: "Active",
                          value: "Active",
                        },
                        {
                          label: "Nonactive",
                          value: "Nonactive",
                        },
                      ]}
                    />
                  </div>
                  <div>
                    <FormField
                      label="Package"
                      name="student_package"
                      icon={
                        <svg
                          fill="currentColor"
                          className="h-4 w-4 opacity-70 flex-shrink-0"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="m0 0h24v24h-24z" fill="none" />
                          <path d="m5 13.18v2.81c0 .73.4 1.41 1.04 1.76l5 2.73c.6.33 1.32.33 1.92 0l5-2.73c.64-.35 1.04-1.03 1.04-1.76v-2.81l-6.04 3.3c-.6.33-1.32.33-1.92 0zm6.04-9.66-8.43 4.6c-.69.38-.69 1.38 0 1.76l8.43 4.6c.6.33 1.32.33 1.92 0l8.04-4.39v5.91c0 .55.45 1 1 1s1-.45 1-1v-6.41c0-.37-.2-.7-.52-.88l-9.52-5.19c-.6-.32-1.32-.32-1.92 0z" />
                        </svg>
                      }
                      type="text"
                      placeholder={"Your package"}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <FormField
                      label="School"
                      name="student_school"
                      icon={
                        <svg
                          fill="currentColor"
                          className="h-4 w-4 opacity-70 flex-shrink-0"
                          viewBox="0 0 15 15"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g fill="#000">
                            <path d="m7.5 8c-.27614 0-.5.22386-.5.5s.22386.5.5.5.5-.22386.5-.5-.22386-.5-.5-.5z" />
                            <path
                              clipRule="evenodd"
                              d="m12 6.19098-4-2v-1.19098h3v-3h-4v4.19098l-4 2v1.80902h-2v6h-1v1h6v-4h3v4h6v-1h-1v-6h-2zm1 7.80902v-5h-1v5zm-10 0h-1v-5h1zm3-5.5c0-.82843.67157-1.5 1.5-1.5s1.5.67157 1.5 1.5-.67157 1.5-1.5 1.5-1.5-.67157-1.5-1.5z"
                              fillRule="evenodd"
                            />
                            <path d="m8 15v-3h-1v3z" />
                          </g>
                        </svg>
                      }
                      type="text"
                      placeholder="Your school name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 mt-4 text-white">
                      Grade
                    </label>
                    <label className="input input-bordered border-neutral flex items-center gap-2 ">
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70 flex-shrink-0"
                      >
                        <path d="m0 0h24v24h-24z" fill="none" />
                        <path d="m5 13.18v2.81c0 .73.4 1.41 1.04 1.76l5 2.73c.6.33 1.32.33 1.92 0l5-2.73c.64-.35 1.04-1.03 1.04-1.76v-2.81l-6.04 3.3c-.6.33-1.32.33-1.92 0zm6.04-9.66-8.43 4.6c-.69.38-.69 1.38 0 1.76l8.43 4.6c.6.33 1.32.33 1.92 0l8.04-4.39v5.91c0 .55.45 1 1 1s1-.45 1-1v-6.41c0-.37-.2-.7-.52-.88l-9.52-5.19c-.6-.32-1.32-.32-1.92 0z" />
                      </svg>
                      <input
                        name="student_grade"
                        type="text"
                        className="text-black"
                        placeholder="Your Grade"
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <div>
                    <FormField
                      label="Account Username"
                      name="student_username"
                      icon={
                        <CircleUser
                          width={16}
                          height={16}
                          className=" opacity-70 flex-shrink-0"
                        />
                      }
                      type="text"
                      placeholder="Enter username"
                    />
                  </div>
                  <div>
                    <FormField
                      type="password"
                      name="student_password"
                      label="Change Password"
                      icon={
                        <Key
                          width={16}
                          height={16}
                          className=" opacity-70 flex-shrink-0"
                        />
                      }
                      placeholder="Enter password"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <ButtonForm text="Save" type="submit" />
        </div>
      </form>
    </>
  );
}
