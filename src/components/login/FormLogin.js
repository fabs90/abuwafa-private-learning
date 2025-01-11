"use client";
import Image from "next/image";
import { ChevronDown, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";

export default function FormLogin() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirectReason = searchParams.get("redirect");
  const router = useRouter();

  const exampleUser = {
    username: "username",
    password: "password",
  };

  const exampleAdmin = {
    username: "admin",
    password: "admin",
  };

  const client = axios.create({
    baseURL: "http://localhost:8080/auth/login",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    // Ambil data dari inputan, .get(name) adalah cara untuk mengambil value dari inputan
    const role = form.get("role");
    const username = form.get("username");
    const password = form.get("password");

    if (!role || role === "Select here") {
      alert("Please choose a role!");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Create response
      const response = await client.post("/", {
        // Insert the data
        role,
        username,
        password,
      });

      // Response logic
      if (!response.data.error) {
        // taruh response ke loginResult
        const { loginResult } = response.data;

        // Save token to cookies
        Cookies.set("token", loginResult.token, {
          expires: 1, // Expires in 1 day
          secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
        });

        Cookies.set("role", loginResult.role, {
          expires: 1,
        });

        alert("Login Successful!");

        // Redirect based on role
        if (loginResult.role.toLowerCase() === "admin") {
          router.push("/dashboard/admin");
        } else if (loginResult.role.toLowerCase() === "student") {
          router.push("/dashboard/student");
        } else if (loginResult.role.toLowerCase() === "tutor") {
          router.push("/dashboard/tutor");
        }
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during login."
      );
    } finally {
      setLoading(false);
    }
  };

  // if (role === "admin") {
  //   if (
  //     username !== exampleAdmin.username ||
  //     password !== exampleAdmin.password
  //   ) {
  //     alert(
  //       "Login failed. Please select the role that matches your account."
  //     );
  //     return;
  //   }
  //   setLoading(true);
  //   setTimeout(() => {
  //     router.push("/dashboard/admin");
  //     return;
  //   }, 1500);
  // } else {
  //   if (
  //     username !== exampleUser.username ||
  //     password !== exampleUser.password
  //   ) {
  //     setError(true);
  //     alert("Incorrect username or password.");
  //     return;
  //   }
  // }

  // setLoading(true);
  // setTimeout(() => {
  //   alert("Login Success");
  //   if (role === "student") {
  //     router.push("/dashboard/student");
  //   } else if (role === "tutor") {
  //     router.push("/dashboard/tutor");
  //   }
  // }, 1500);

  return (
    <>
      <div>
        <div
          className="card w-full rounded-lg shadow-lg"
          style={{ backgroundColor: "#edf6f6" }}
        >
          <div className="card-body items-center text-center w-full">
            <Image
              src={"/img/abuwafalogo.png"}
              alt="Logo Abuwafa"
              width={217}
              height={67}
            />
            <div className="mt-6 w-full">
              {loading ? (
                <div className="flex flex-col items-center">
                  <span className="loading loading-spinner loading-lg bg-primary"></span>
                  <p className="mt-4 text-primary font-bold">Redirecting...</p>
                </div>
              ) : (
                <form id="loginForm" method="POST" onSubmit={handleSubmit}>
                  <div className="flex flex-col items-start">
                    {redirectReason === "unauthorized" && (
                      <div
                        role="alert"
                        className="alert alert-error mb-4 flex justify-between items-center"
                      >
                        <div className="flex items-center">
                          <XCircle width={24} height={24} color="#ffffff" />
                          <span className="text-white ml-2">
                            You must log in to access the dashboard!
                          </span>
                        </div>
                      </div>
                    )}

                    {error && (
                      <div role="alert" className="alert alert-error mb-4">
                        <XCircle width={24} height={24} color="#ffffff" />
                        <span className="text-white">{error}</span>
                      </div>
                    )}
                    <label className="text-primary text-sm font-medium mb-1 labelLogin">
                      Role
                    </label>
                    <div className="relative w-full">
                      <select
                        name="role"
                        id="inputSelectLogin"
                        className="mb-4 bg-[#e3f6f6] border border-black focus:outline-none rounded-lg shadow-inner appearance-none px-3"
                        defaultValue="Select here"
                      >
                        <option disabled>Select here</option>
                        <option value={"Student"}>Student</option>
                        <option value={"Tutor"}>Tutor</option>
                        <option value={"Admin"}>Admin</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-[42%] transform -translate-y-1/2  text-primary pointer-events-none w-5 h-5" />
                    </div>
                    <label className="text-primary text-sm font-semibold mb-1 labelLogin">
                      Username
                    </label>
                    <input
                      name="username"
                      id="inputUsernameLogin"
                      type="text"
                      className="rounded-lg border border-black p-3 bg-[#e3f6f6] shadow-inner focus:outline-none"
                      required
                    />
                    <label className="text-primary text-sm font-semibold mb-1">
                      Password
                    </label>
                    <input
                      name="password"
                      id="inputPasswordLogin"
                      type="password"
                      className="rounded-lg border border-black p-3 bg-[#e3f6f6] shadow-inner focus:outline-none w-full mb-3"
                      required
                    />
                    <div
                      id="loginFormText"
                      className="w-full flex flex-row-reverse"
                    >
                      <div>
                        <p>
                          Don’t have an account?
                          <a
                            href="https://wa.me/085899496182?text=Assalamualaikum%20"
                            className="font-bold"
                          >
                            {" "}
                            Contact your Admin
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="mt-9 w-full">
                      <button className="btn btn-primary btn-block  sm:w-[217px] bg-primary text-white p-4">
                        Login
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
