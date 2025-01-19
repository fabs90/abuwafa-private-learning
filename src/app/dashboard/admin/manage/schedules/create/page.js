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
import Cookies from "js-cookie";
import axios from "axios";
import Loading from "@/components/dashboard/student/loading";
import ConfirmAlert from "@/components/dashboard/tutor/TutorComponents/ConfirmAlert";
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

const clientStudent = createAxiosInstance(
  "http://localhost:8080/api/students/profiles"
);
const clientTutor = createAxiosInstance(
  "http://localhost:8080/api/tutors/profiles"
);

const clientSubject = createAxiosInstance("http://localhost:8080/api/subjects");

const attendancePost = createAxiosInstance(
  "http://localhost:8080/api/attendance/create"
);

const fetchStudentData = async (token) => {
  try {
    const response = await clientStudent.get("/", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = response.data.profile;

    if (Array.isArray(data)) {
      return data; // Pastikan data adalah array
    }

    console.error("Expected an array but received:", data);
    return [];
  } catch (error) {
    console.error("Error fetching student data:", error);
    return [];
  }
};

const fetchTutorData = async (token) => {
  try {
    const response = await clientTutor.get("/", {
      headers: { Authorization: `Bearer ${token}` },
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
const fetchSubjectData = async (token) => {
  try {
    const response = await clientSubject.get("/", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = response.data.subjects;

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

export default function Page() {
  const [studentData, setStudentData] = useState([]);
  const [tutorData, setTutorData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorStudents, setErrorStudents] = useState(null);
  const [errorTutors, setErrorTutors] = useState(null);
  const [error, setError] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedStudentGrade, setSelectedStudentGrade] = useState(null);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [formScheduleData, setFormScheduleData] = useState(null);
  const [formAttendanceData, setFormAttendanceData] = useState(null);
  const [successAlert, setSuccessAlert] = useState(false);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = Cookies.get("token");

      if (!token) {
        setErrorStudents(new Error("Authorization token is missing!"));
        setErrorTutors(new Error("Authorization token is missing!"));
        setLoading(false);
        return;
      }

      try {
        const [students, tutors, subjects] = await Promise.all([
          fetchStudentData(token),
          fetchTutorData(token),
          fetchSubjectData(token),
        ]);

        setStudentData(students);
        setTutorData(tutors);
        setSubjectData(subjects);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const StudentOptions = Array.isArray(studentData)
    ? studentData.map((student) => ({
        label: student.student_name,
        value: student.id_student,
        grade: student.grade,
      }))
    : [];

  const TutorOptions = Array.isArray(tutorData)
    ? tutorData.map((tutor) => ({
        label: tutor.tutor_name,
        value: tutor.id_tutor,
      }))
    : [];

  const SubjectOptions = Array.isArray(subjectData)
    ? subjectData.map((subject) => ({
        label: subject.subject,
        value: subject.id_subject,
      }))
    : [];

  const handleStudentChange = (selectedOption) => {
    setSelectedStudent(selectedOption); // Update the state with the selected option
    setSelectedStudentGrade(selectedOption?.grade || null);
  };

  const handleTutorChange = (selectedOption) => {
    setSelectedTutor(selectedOption);
  };
  const handleSubjectChange = (selectedOption) => {
    setSelectedSubject(selectedOption);
  };

  const breadcrumbItems = [
    { label: "Dashboard", link: "/dashboard/admin", icon: Grid2X2 },
    { label: "Manage Schedules", link: "/dashboard/admin/manage/schedules" },
    {
      label: "Create Schedules",
      link: "/dashboard/admin/manage/schedules/creates",
    },
  ];

  function generateRandomNumber() {
    const year = new Date().getFullYear().toString().slice(-2); // Last 2 digits of the year
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0"); // Random month
    const randomDigits = String(Math.floor(Math.random() * 100000)).padStart(
      5,
      "0"
    ); // Random 5 digits

    const id = `${year}${month}${randomDigits}`;
    return parseInt(id);
  }

  const scheduleId = generateRandomNumber();

  const handleNewSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const subject = form.get("subject");
    const type = form.get("type");
    const link = form.get("link");
    const curriculum = form.get("curriculum");
    const time = form.get("time");
    const totalSession = form.get("totalSession");
    const day = form.get("days");
    const tutor = form.get("tutor");
    const student = form.get("student");

    const selectedDay = day;
    const today = new Date();
    const dayOfWeek = parseInt(selectedDay);
    const daysToAdd = (dayOfWeek - today.getDay() + 7) % 7 || 7;
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + daysToAdd);

    const formattedDate = nextDate.toISOString().split("T")[0];

    const FormScheduleLoad = {
      id_schedule: scheduleId,
      student_name: selectedStudent?.label,
      id_student: student,
      tutor_name: selectedTutor?.label,
      id_tutor: tutor,
      day: day,
      date: formattedDate,
      subject: selectedSubject?.label,
      id_subject: selectedSubject?.value,
      time: time,
      method: type,
      link: link,
      grade: selectedStudentGrade,
      curriculum: curriculum,
      time_duration: time,
      total_session: totalSession,
    };
    console.log("Data: ", FormScheduleLoad);
    setFormScheduleData(FormScheduleLoad);

    const formAttendanceLoad = {
      id_schedule: scheduleId,
      tutor_name: selectedTutor?.label,
      id_tutor: tutor,
      student_name: selectedStudent?.label,
      id_student: student,
      time: time,
      date: formattedDate,
      session: totalSession,
      method: type,
      subject: selectedSubject?.label,
      id_subject: selectedSubject?.value,
    };
    console.log("Data Attendance: ", formAttendanceLoad);
    setFormAttendanceData(formAttendanceLoad);
    setIsConfirmVisible(true);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Create FormData object from the form element
  //   const form = new FormData(e.target);

  //   const subject = form.get("subject");
  //   const type = form.get("type");
  //   const link = form.get("link");
  //   const curriculum = form.get("curriculum");
  //   const time = form.get("time");
  //   const totalSession = form.get("totalSession");
  //   const day = form.get("days");
  //   const tutor = form.get("tutor");
  //   const student = form.get("student");

  //   const selectedDay = day;
  //   const today = new Date();
  //   const dayOfWeek = parseInt(selectedDay);
  //   const daysToAdd = (dayOfWeek - today.getDay() + 7) % 7 || 7;
  //   const nextDate = new Date(today);
  //   nextDate.setDate(today.getDate() + daysToAdd);

  //   const formattedDate = nextDate.toISOString().split("T")[0];
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8080/api/schedule/",
  //       {
  //         id_schedule: scheduleId,
  //         student_name: selectedStudent?.label,
  //         id_student: student,
  //         tutor_name: selectedTutor?.label,
  //         id_tutor: tutor,
  //         day: day,
  //         date: formattedDate,
  //         subject: selectedSubject?.label,
  //         id_subject: selectedSubject?.value,
  //         time: time,
  //         method: type,
  //         link: link,
  //         curriculum: curriculum,
  //         time_duration: time,
  //         total_session: totalSession,
  //       },
  //       {
  //         headers: {
  //           Authorization: `${token}`,
  //         },
  //       }
  //     );

  //     await attendancePost.post(`/${scheduleId}`, {
  //       id_attendance: null,
  //       id_schedule: scheduleId,
  //       tutor_name: selectedTutor?.label,
  //       id_tutor: tutor,
  //       student_name: selectedStudent?.label,
  //       id_student: student,
  //       date: formattedDate,
  //       sessions: totalSession,
  //       method: type,
  //       subject: selectedSubject?.label,
  //       id_subject: selectedSubject?.value,
  //     });
  //   } catch (err) {
  //     console.error("Error response:", err.response); // Log the error response
  //     setError(
  //       err.response?.data?.message ||
  //         "An error occurred while creating the schedule."
  //     );
  //   } finally {
  //     alert("Data submitted successfully");
  //     setLoading(false);
  //     window.location.reload();
  //   }
  // };

  const handleConfirm = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/schedule/",
        formScheduleData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      await attendancePost.post(`/${scheduleId}`, formAttendanceData, {
        headers: {
          Authorization: `${token}`,
        },
      });
    } catch (err) {
      console.error("Error response:", err.response); // Log the error response
      setError(
        err.response?.data?.message ||
          "An error occurred while creating the schedule."
      );
    } finally {
      alert("Data submitted successfully");
      setLoading(false);
      setSuccessAlert(true);
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

  return (
    <>
      <DashboardLayoutAdmin title="Create Schedules">
        <SuccessAlert
          isOpen={successAlert}
          onClose={() => setSuccessAlert(false)}
        />
        <ConfirmAlert
          isOpen={isConfirmVisible}
          onClose={() => setIsConfirmVisible(false)}
          onConfirm={handleConfirm}
        />
        <Breadcrumb items={breadcrumbItems} />
        <form onSubmit={handleNewSubmit}>
          <div className="w-full grid grid-rows-1">
            <div className="grid grid-rows-1 text-sm">
              <div className="md:grid md:grid-rows-1 md:grid-cols-2 gap-2 md:gap-6">
                <div>
                  <div>
                    <FormField
                      label="Subject"
                      name="subject" // Added name attribute
                      type="select2"
                      required={true}
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
                      selectOptions={SubjectOptions}
                      onChange={handleSubjectChange}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <FormField
                        label="Type"
                        name="type" // Added name attribute
                        required={true}
                        icon={<Laptop width={16} />}
                        type="select3"
                        selectOptions={typeOptions}
                        placeholder="Select Type"
                      />
                    </div>
                    <div>
                      <FormField
                        label="Link"
                        name="link" // Added name attribute
                        required={true}
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
                      name="curriculum" // Added name attribute
                      required={true}
                      icon={<Book width={16} />}
                      type="select3"
                      placeholder="Select Curriculum"
                      selectOptions={[
                        {
                          label: "Singapore",
                          value: "singapore",
                        },
                        {
                          label: "International",
                          value: "international",
                        },
                        {
                          label: "National",
                          value: "nasional",
                        },
                        {
                          label: "Cambridge",
                          value: "cambridge",
                        },
                      ]}
                    />
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <FormField
                        label="Time"
                        name="time" // Added name attribute
                        required={true}
                        icon={<Clock width={16} />}
                        placeholder={"H:M-H:M"}
                      />
                    </div>
                    <div>
                      <FormField
                        label="Total Session"
                        name="totalSession" // Added name attribute
                        required={true}
                        type={"number"}
                        icon={<School2 width={16} />}
                        placeholder="Total Session"
                      />
                    </div>
                  </div>
                  <div>
                    <FormField
                      type="select2"
                      label="Days"
                      name="days" // Added name attribute
                      required={true}
                      placeholder={"Select Days"}
                      selectOptions={dayOptions}
                      icon={<Calendar1 width={16} />}
                    />
                  </div>
                  <div>
                    <FormField
                      label={"Tutor"}
                      name="tutor"
                      required={true}
                      onChange={handleTutorChange}
                      icon={<UserSquare2 width={16} />}
                      type="select2"
                      selectOptions={TutorOptions}
                      placeholder={"Select Tutor"}
                    />
                  </div>

                  <div>
                    <FormField
                      type="select2"
                      label="Student"
                      required={true}
                      onChange={handleStudentChange}
                      name="student"
                      placeholder={"Select Student"}
                      icon={<UserSquare2 width={16} />}
                      selectOptions={StudentOptions}
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
