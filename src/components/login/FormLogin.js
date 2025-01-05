/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import abuwafaLogo from "/public/abuwafaLogo.png";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FormLogin() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const exampleUser = {
    username: "username",
    password: "password",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    // Ambil data dari inputan, .get(name) adalah cara untuk mengambil value dari inputan
    const role = form.get("role");
    const username = form.get("username");
    const password = form.get("password");

    if (
      username !== exampleUser.username &&
      password !== exampleUser.password
    ) {
      setError(true);
      alert("Login gagal. Harap pilih role yang sesuai dengan akun Anda");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      alert("Login Success");
      if (role === "student") {
        router.push("/dashboard/student");
      } else if (role === "tutor") {
        router.push("/dashboard/tutor");
      } else {
        router.push("/dashboard/admin");
      }
    }, 1500); // Delay simulasi 1.5 detik
  };

  return (
    <>
      <div>
        {/* Card */}
        <div
          className="card w-full rounded-lg shadow-lg"
          style={{ backgroundColor: "#edf6f6" }}
        >
          <div className="card-body items-center text-center w-full">
            <Image
              src={abuwafaLogo}
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
                        <option value={"student"}>Student</option>
                        <option value={"tutor"}>Tutor</option>
                        <option value={"admin"}>Admin</option>
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
                          Dont have an account?
                          <a
                            href="https://wa.me/085899496182?text=Assalamualaikum%20"
                            className="font-bold"
                          >
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
