"use client";
import Loading from "@/app/dashboard/admin/monthly-report/loading";
import ButtonForm from "@/components/button/Button";
import axios from "axios";
import Cookies from "js-cookie";
import { Mail, CircleUser, Key, Banknote, Grid2X2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Breadcrumb } from "../../admin/Components/Breadcrumb";
import ConfirmAlert from "../TutorComponents/ConfirmAlert";

const client = axios.create({
  baseURL: "http://localhost:8080/api/tutors/profile/",
});

export default function ContentTutorProfile(params) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false); // State untuk ConfirmAlert
  const [formValues, setFormValues] = useState(null); // Simpan data form sementara
  const token = Cookies.get("token");
  const id_user = Cookies.get("user_id");

  useEffect(() => {
    if (!token) {
      console.error("Authorization token is missing!");
      setLoading(false);
      return;
    }

    try {
      client
        .get(`?id_tutor=${id_user}`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((res) => {
          setData(res.data.profile);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error: ", error);
      setLoading(false);
    }
  }, []);

  const onSubmitClick = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updates = Object.fromEntries(formData.entries());
    setFormValues(updates); // Simpan sementara data form
    console.log(formValues);

    setIsConfirmOpen(true); // Buka dialog konfirmasi
  };

  const onConfirm = async () => {
    if (!token) {
      console.error("Authorization token is missing!");
      return;
    }

    try {
      setLoading(true);

      const response = await client.patch(`${id_user}`, formValues, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.error) {
        console.error(response.data.message);
        alert(response.data.message);
      } else {
        alert("Profile updated successfully!");
        setData({ ...data, ...formValues });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
      setIsConfirmOpen(false); // Tutup dialog setelah submit
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
      <Breadcrumb
        items={[
          { label: "Dashboard", link: "/dashboard/", icon: Grid2X2 },
          {
            label: "Profile",
            link: "/dashboard/tutor/profile",
          },
        ]}
      />
      <ConfirmAlert
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={onConfirm}
      />
      <form onSubmit={onSubmitClick}>
        <div className="w-full grid grid-rows-1">
          <div className="grid grid-rows-1 text-sm">
            <div className="md:grid md:grid-rows-1 md:grid-cols-2 gap-2 md:gap-6">
              <div>
                <div>
                  <FormField
                    label="Name"
                    name="tutor_name"
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
                    placeholder="Enter your name"
                    defaultValue={data?.tutor_name}
                  />
                </div>

                <div className="md:grid md:grid-cols-2 gap-4">
                  <div>
                    <FormField
                      label="Phone"
                      name="phone_tutor"
                      fitted={true}
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
                      defaultValue={data?.phone_tutor}
                      placeholder="Your phone num."
                    />
                  </div>
                  <div>
                    <FormField
                      label="Email"
                      name="email"
                      fitted={true}
                      icon={
                        <Mail
                          width={16}
                          height={16}
                          className="opacity-70 flex-shrink-0"
                        />
                      }
                      defaultValue={data?.email}
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1 mt-4 text-white">
                    Address
                  </label>
                  <textarea
                    name="address"
                    className="textarea border-neutral text-black w-full"
                    style={{ height: "142px" }}
                    placeholder="Bio"
                    defaultValue={data?.address}
                  ></textarea>
                </div>
              </div>
              <div>
                <div>
                  <FormField
                    label="Status"
                    name="status"
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
                    type="text"
                    readOnly
                    defaultValue={data?.status}
                  />
                </div>
                <div>
                  <FormField
                    label="Account Username"
                    name="username"
                    icon={
                      <CircleUser
                        width={16}
                        height={16}
                        className=" opacity-70 flex-shrink-0"
                      />
                    }
                    readOnly={true}
                    defaultValue={data?.username}
                    type="text"
                    placeholder="Your account username"
                  />
                </div>
                <div>
                  <FormField
                    label="Change Password"
                    name="password"
                    icon={
                      <Key
                        width={16}
                        height={16}
                        className=" opacity-70 flex-shrink-0"
                      />
                    }
                    type="password"
                    placeholder="Fill to change the password"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FormField
                      label="Bank"
                      name="tutor_bankAcc"
                      defaultValue={data?.bank}
                      icon={
                        <Banknote
                          width={16}
                          height={16}
                          className=" opacity-70 flex-shrink-0"
                        />
                      }
                      type="text"
                      placeholder="Bank"
                      required={true}
                    />
                  </div>
                  <div>
                    <FormField
                      label="Account Number"
                      name="tutor_numberAcc"
                      icon={
                        <Banknote
                          width={16}
                          height={16}
                          className=" opacity-70 flex-shrink-0"
                        />
                      }
                      type="text"
                      placeholder="Account number"
                      required={true}
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
const FormField = ({
  label,
  name = "",
  placeholder,
  icon,
  type = "text",
  readOnly = false,
  defaultValue = "",
  fitted = false,
}) => (
  <div>
    <label
      className={`block text-sm mb-1 ${
        fitted ? "mt-[10px]" : "mt-4"
      } text-white`}
    >
      {label}
    </label>
    <label
      className={`input input-bordered border-neutral flex items-center gap-2 w-full md:w-full lg:w-full ${
        readOnly ? "opacity-50" : "opacity-100"
      }`}
    >
      {icon}
      <input
        type={type}
        name={name}
        className="text-black w-fit md:w-full lg:w-full"
        placeholder={placeholder}
        readOnly={readOnly}
        defaultValue={defaultValue}
      />
    </label>
  </div>
);
