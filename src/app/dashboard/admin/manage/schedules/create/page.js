"use client";
import ButtonForm from "@/components/button/Button";
import DashboardLayoutAdmin from "@/components/dashboard/admin/DashboardLayoutAdmin";
import { FormField } from "@/components/dashboard/tutor/TutorComponents/InputField";
import TutorData from "./TutorData.json";
import {
  Book,
  Calendar1,
  Clock,
  GraduationCap,
  Grid2X2,
  Laptop,
  Link,
  School2,
  UserSquare2,
} from "lucide-react";
import { Breadcrumb } from "@/components/dashboard/admin/Components/Breadcrumb";
import { useEffect, useState } from "react";

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Prevent rendering on the server
  }

  const breadcrumbItems = [
    { label: "Dashboard", link: "/dashboard/admin", icon: Grid2X2 },
    {
      label: "Manage Schedules",
      link: "/dashboard/admin/manage/schedules",
    },
    {
      label: "Create Schedules",
      link: "/dashboard/admin/manage/schedules/creates",
    },
  ];
  const options = [
    {
      value: "1",
      label: "Mathematics",
    },
    {
      value: "2",
      label: "Physics",
    },
    {
      value: "3",
      label: "Biology",
    },
  ];

  const typeOptions = [
    {
      value: "1",
      label: "Offline",
    },
    {
      value: "2",
      label: "Online",
    },
  ];

  const dayOptions = [
    {
      value: "1",
      label: "Monday",
    },
    {
      value: "2",
      label: "Tuesday",
    },
    {
      value: "3",
      label: "Wednesday",
    },
    {
      value: "4",
      label: "Thursday",
    },
    {
      value: "5",
      label: "Friday",
    },
    {
      value: "6",
      label: "Saturday",
    },
    {
      value: "7",
      label: "Sunday",
    },
  ];

  const CurriculumOptions = [
    {
      value: "1",
      label: "CBSE",
    },
    {
      value: "2",
      label: "ICSE",
    },
    {
      value: "3",
      label: "Merdeka",
    },
  ];

  const GradeOptions = [
    {
      value: 1,
      label: "Kelas 1",
    },
    {
      value: 2,
      label: "Kelas 2",
    },
    {
      value: 3,
      label: "Kelas 3",
    },
    {
      value: 4,
      label: "Kelas 4",
    },
    {
      value: 5,
      label: "Kelas 5",
    },
    {
      value: 6,
      label: "Kelas 6",
    },
    {
      value: 7,
      label: "Kelas 7",
    },
    {
      value: 8,
      label: "Kelas 8",
    },
    {
      value: 9,
      label: "Kelas 9",
    },
    {
      value: 13,
      label: "Paket A",
    },
    {
      value: 14,
      label: "Paket C",
    },
  ];

  return (
    <>
      <DashboardLayoutAdmin title="Create Schedules">
        <Breadcrumb items={breadcrumbItems} />
        <form>
          <div className="w-full grid grid-rows-1">
            <div className="grid grid-rows-1 text-sm">
              <div className="md:grid md:grid-rows-1 md:grid-cols-2 gap-2 md:gap-6">
                <div>
                  <div>
                    <FormField
                      label="Subject"
                      type="select2"
                      options={options}
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
                      placeholder="Select Subject"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <FormField
                        label="Type"
                        icon={<Laptop width={16} />}
                        type="select3"
                        options={typeOptions}
                        placeholder="Select Type"
                      />
                    </div>
                    <div>
                      <FormField
                        label="Link"
                        icon={
                          <Link
                            width={16}
                            height={16}
                            className=" z-99 flex-shrink-0"
                          />
                        }
                        placeholder={"Link"}
                        type="text"
                      />
                    </div>
                  </div>
                  <div>
                    <FormField
                      label="Curriculum"
                      icon={<Book width={16} />}
                      type="select3"
                      options={CurriculumOptions}
                      placeholder="Select Curriculum"
                    />
                  </div>
                  <div>
                    <FormField
                      label="Grade"
                      icon={<GraduationCap width={16} />}
                      type="select3"
                      options={GradeOptions}
                      placeholder="Select Grade"
                    />
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <FormField
                        label="Time"
                        icon={<Clock width={16} />}
                        required={true}
                        type="time"
                      />
                    </div>
                    <div>
                      <FormField
                        label="Total Session"
                        icon={<School2 width={16} />}
                        placeholder="Total Session"
                      />
                    </div>
                  </div>
                  <div>
                    <FormField
                      type="select2"
                      label="Days"
                      placeholder={"Select Days"}
                      icon={<Calendar1 width={16} />}
                      options={dayOptions}
                    />
                  </div>
                  <div>
                    <FormField
                      label={"Tutor"}
                      icon={<UserSquare2 width={16} />}
                      type="select2"
                      options={TutorData}
                      placeholder={"Select Tutor"}
                      required={true}
                    />
                  </div>

                  <div>
                    <FormField
                      type="select2"
                      label="Student"
                      placeholder={"Select Student"}
                      icon={<UserSquare2 width={16} />}
                      options={dayOptions}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <ButtonForm type={"submit"} text={"Submit"} />
          </div>
        </form>
      </DashboardLayoutAdmin>
    </>
  );
}
