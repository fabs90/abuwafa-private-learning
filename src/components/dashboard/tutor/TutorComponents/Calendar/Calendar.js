import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

export default function Calendar(params) {
  /*
    0: Minggu
    1: Senin
    2: Selasa
    3: Rabu
    4: Kamis
    5: Jumat
    6: Sabtu
  */
  const events = [
    {
      title: "English",
      description: "Offline",
      startTime: "17:00:00",
      endTime: "18:00:00",
      daysOfWeek: [3],

      extendedProps: {
        subject: "English",
        student: "Kenji",
        method: "Offline (Onsite)",
        link: "-",
      },
    },
    {
      title: "Coding",
      description: "Offline",
      startTime: "17:00:00",
      endTime: "18:00:00",
      daysOfWeek: [6],
      extendedProps: {
        subject: "Coding",
        student: "Kenji",
        method: "Offline (Home visit)",
        link: "-",
      },
    },
    {
      title: "Mandarin",
      description: "Online",
      startTime: "16:00:00",
      endTime: "17:00:00",
      startRecur: "2024-12-13", // Start recurrence
      endRecur: "2025-01-03", // End recurrence (3 weeks from start date)
      daysOfWeek: [0],
      extendedProps: {
        subject: "Mandarin",
        student: "Fiqwi",
        method: "Online",
        link: "https://meet.google.com/landing",
      },
    },
    {
      title: "Quran",
      description: "Online",
      start: "2024-12-13T16:00:00",
      end: "2024-12-13T18:00:00",
      extendedProps: {
        subject: "Quran",
        student: "Sumbul",
        method: "Online",
        link: "https://meet.google.com/landing",
      },
    },
  ];

  return (
    <div className="bg-white opacity-1 p-5 rounded-lg ">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        timeZone="local"
        events={events}
        eventContent={(info) => {
          return (
            <div style={{ textAlign: "left" }}>
              <b>{info.event.title}</b>
              <p>{info.event.extendedProps.student}</p>
              {info.event.extendedProps.link &&
              info.event.extendedProps.link != "-" ? (
                <p style={{ margin: 0, fontSize: "0.85rem", color: "#555" }}>
                  <b>Link:</b>{" "}
                  <a
                    href={info.event.extendedProps.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Open</span>
                  </a>
                </p>
              ) : (
                <p style={{ fontSize: "0.85rem", color: "#999" }}>-</p>
              )}
            </div>
          );
        }}
        eventDidMount={(info) => {
          const formatTime = (date) =>
            new Date(date).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            });

          tippy(info.el, {
            content: `
              <b>Student:</b> ${info.event.extendedProps.student}<br>
              <b>Time:</b> ${formatTime(info.event.start)} - ${formatTime(
              info.event.end
            )}<br>
              <b>Method:</b> ${info.event.extendedProps.method}<br>
            `,
            allowHTML: true,
          });
        }}
      />
    </div>
  );
}
