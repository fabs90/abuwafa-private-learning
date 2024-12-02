/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import abuwafaLogo from "/public/abuwafaLogo.png";
import { ChevronDown } from "lucide-react";
export default function FormLogin() {
  return (
    <>
      <div>
        {/* Card */}
        <div
          className="card w-full  rounded-lg shadow-lg"
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
              {/* Form */}
              <form method="POST">
                <div className="flex flex-col items-start">
                  <label className="text-teal-500 text-sm font-semibold mb-1 labelLogin">
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
                      <option>Student</option>
                      <option>Tutor</option>
                      <option>Admin</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-[42%] transform -translate-y-1/2  text-teal-500 pointer-events-none w-5 h-5" />
                  </div>
                  <label className="text-teal-500 text-sm font-semibold mb-1 labelLogin">
                    Username
                  </label>
                  <input
                    name="username"
                    id="inputUsernameLogin"
                    type="text"
                    className="rounded-lg border border-black p-3 bg-[#e3f6f6] shadow-inner focus:outline-none "
                  />
                  <label className="text-teal-500 text-sm font-semibold mb-1">
                    Password
                  </label>
                  <input
                    name="password"
                    id="inputPasswordLogin"
                    type="text"
                    className="rounded-lg border border-black p-3 bg-[#e3f6f6] shadow-inner focus:outline-none w-full mb-3"
                  />
                  <div
                    id="loginFormText"
                    className="w-full flex flex-row-reverse"
                  >
                    <div>
                      <p>
                        Dont have an account?{" "}
                        <a href="/register" className="font-bold">
                          Register
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
