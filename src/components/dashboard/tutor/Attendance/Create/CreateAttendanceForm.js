"use client";
import {
  Baby,
  CalendarDaysIcon,
  Clock,
  FileUp,
  House,
  NotebookIcon,
} from "lucide-react";
import { FormField } from "../../TutorComponents/InputField";
import ButtonForm from "@/components/button/Button";
import { useEffect, useState } from "react";
import TutorTable from "../../TutorComponents/TutorTable";
import { useRouter } from "next/navigation";
import AttendanceTable from "../../TutorComponents/AttendanceTable";
import AttendanceData from "./AttendanceData.json";
import ConfirmAlert from "../../TutorComponents/ConfirmAlert";

const CountdownModal = ({ show, onClose }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    document.getElementById("countdown_modal").showModal();
    const targetTime = new Date();
    targetTime.setHours(23, 59, 59, 999);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetTime - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          hours: Math.floor(diff / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (value) => String(value).padStart(2, "0");

  if (!show) return null;

  return (
    <dialog id="countdown_modal" className="modal mx-auto">
      <div className="modal-box bg-accent text-white rounded-lg shadow-lg">
        <form method="dialog">
          <button
            type="button"
            className="btn btn-close text-black border-none absolute right-2 top-1 p-0 me-3"
            onClick={onClose}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-secondarySiena text-2xl text-center mx-auto mb-4">
          Wait! 🤔
        </h3>
        <p className="text-center text-black text-lg">
          Are you present in today&apos;s class?
          <br />
          Please submit your attendance before{" "}
          <b className="text-primary">23:59</b>.
        </p>
        <div className="flex justify-center mt-6">
          <div className="bg-primary px-4 py-3 mx-auto rounded-lg shadow-inner">
            <span className="countdown countdown-text mx-2">
              {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:
              {formatTime(timeLeft.seconds)}
            </span>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default function CreateAttendanceForm(props) {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  let curr = new Date();
  curr.setDate(curr.getDate());
  const date = curr.toISOString().split("T")[0];

  const handleConfirm = () => {
    alert("Data has been saved");
    setIsConfirmVisible(false);
    // Logic submit form dapat dilakukan di sini
    document.getElementById("attendanceForm").submit();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsConfirmVisible(true);
  };

  return (
    <>
      <CountdownModal
        show={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />

      <ConfirmAlert
        isOpen={isConfirmVisible}
        onClose={() => setIsConfirmVisible(false)}
        onConfirm={handleConfirm}
      />

      <div className="rounded-lg">
        <form id="attendanceForm" onSubmit={handleSubmit}>
          <div className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-2 gap-0 md:gap-4 lg:gap-4">
            <div className="">
              <div className="w-full">
                <FormField
                  label={"Tutor Name"}
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
                  readOnly={true}
                  defaultValue="Hanif Cahyadi"
                />
              </div>
              <div className="w-full">
                <FormField
                  label={"Time"}
                  icon={<Clock width={16} />}
                  defaultValue="14.30-15.30"
                />
              </div>
              <div className="w-full">
                <FormField
                  label={"Date"}
                  icon={<CalendarDaysIcon width={16} />}
                  defaultValue={date}
                  type="date"
                  readOnly={true}
                />
              </div>
            </div>

            <div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <FormField
                    label="Session"
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
                    defaultValue="2"
                  />
                </div>
                <div className="">
                  <FormField
                    label="Subject"
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
                    defaultValue="English"
                  />
                </div>
              </div>
              <div className="w-full">
                <FormField
                  label="Student Name"
                  icon={<Baby width={16} />}
                  defaultValue="Kenji"
                  type="text"
                  readOnly={true}
                />
              </div>
              <div className="w-full">
                <FormField
                  label="Method"
                  icon={<House width={16} />} // Replace with your icon
                  defaultValue="Offline"
                  type="text"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm mb-1 mt-4 text-white">
                  Image
                </label>
                <label
                  className={`bg-white border-black rounded-lg flex items-center gap-2 w-full`}
                >
                  <input
                    type="file"
                    className={`text-black w-full`} // Ensure the input takes full width
                    accept="image/*"
                  />
                </label>
              </div>
              <div className="w-full">
                <FormField
                  label="Daily Report"
                  icon={<NotebookIcon width={16} />}
                  type="text"
                  required={true}
                  placeholder={"Write your daily report here"}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <ButtonForm type="submit" text="Save" />
          </div>
        </form>
      </div>

      <div className="mt-6">
        <AttendanceTable data={AttendanceData} hiddenColumns={["month"]} />
      </div>
    </>
  );
}
