"use client";
import { Calendar, IdCard, Notebook } from "lucide-react";
import { FormField } from "../../tutor/TutorComponents/InputField";
import ButtonForm from "@/components/button/Button";
export default function CreateMonthlyReport(params) {
  return (
    <>
      <form>
        <div className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-2 gap-0 md:gap-4 lg:gap-4">
          <div>
            <div className="w-full">
              <FormField
                label={"Student Name"}
                type="select3"
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
            <div className="w-full">
              <FormField
                label={"Note"}
                icon={
                  <Notebook
                    width={16}
                    height={16}
                    className="opacity-70 flex-shrink-0"
                  />
                }
                placeholder={"Note here"}
              />
            </div>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div className="w-full">
                <FormField
                  label={"Month"}
                  icon={
                    <Calendar
                      width={16}
                      height={16}
                      className="opacity-70 flex-shrink-0"
                    />
                  }
                  type="select3"
                  placeholder={"Month"}
                />
              </div>
              <div className="w-full">
                <FormField
                  label={"Year"}
                  icon={
                    <Calendar
                      width={16}
                      height={16}
                      className="opacity-70 flex-shrink-0"
                    />
                  }
                  type="select3"
                  placeholder={"Year"}
                />
              </div>
            </div>
            <div className="w-full">
              <label className="block text-sm mb-1 mt-4 text-white">File</label>
              <label
                className={`bg-white border-black rounded-lg flex items-center gap-2 w-full`}
              >
                <input
                  type="file"
                  className={`text-black w-full`} // Ensure the input takes full width
                  accept="*/*"
                />
              </label>
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
