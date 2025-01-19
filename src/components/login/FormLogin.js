"use client";
import Image from "next/image";
import { ChevronDown, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";

export default function FormLogin() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const searchParams = useSearchParams();
  const redirectReason = searchParams?.get("redirect");
  const router = useRouter();

  const client = axios.create({
    baseURL: "http://localhost:8080/auth/login",
  });

  // const client = axios.create({
  //   baseURL: "https://abuwafa-api-2583485117.us-central1.run.app/auth/login",
  // });

  const redirectTo = (url) => {
    if (typeof url === "string" && url.trim() !== "") {
      router.push(url);
    } else {
      console.error("Invalid URL for router.push:", url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
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

      const response = await client.post("/", { role, username, password });

      if (!response.data.error) {
        const { loginResult } = response.data;
        console.log("Token: ", loginResult.token);

        Cookies.set("token", loginResult.token, {
          expires: 1,
          secure: process.env.NODE_ENV === "production",
        });
        Cookies.set("role", loginResult.role, { expires: 1 });

        if (loginResult.role.toLowerCase() === "admin") {
          Cookies.set("user_id", loginResult.id_admin, { expires: 1 });
          redirectTo("/dashboard/admin");
        } else if (loginResult.role.toLowerCase() === "student") {
          Cookies.set("user_id", loginResult.id_student, { expires: 1 });
          redirectTo("/dashboard/student");
        } else if (loginResult.role.toLowerCase() === "tutor") {
          console.log(loginResult.id_tutor);
          Cookies.set("user_id", loginResult.id_tutor, { expires: 1 });
          redirectTo("/dashboard/tutor");
        }
        alert("Login Successful!");
        setIsRedirecting(true);
      } else {
        setError(response.data.message || "Login failed. Please try again.");
        setLoading(false);
        return;
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during login."
      );
      setLoading(false);
      return;
    }
  };

  useEffect(() => {
    if (isRedirecting) {
      const handleRouteComplete = () => {
        setLoading(false);
        setIsRedirecting(false);
      };

      if (router?.asPath?.startsWith("/")) {
        router
          .push(router.asPath)
          .then(handleRouteComplete)
          .catch(handleRouteComplete);
      }
    }
  }, [isRedirecting, router]);

  return (
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
  );
}
