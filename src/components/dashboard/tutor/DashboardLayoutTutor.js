"use client";

import { BookMarkedIcon, BookOpenText, Grid2X2 } from "lucide-react";
import { SidebarProvider } from "../SidebarContext";
import StudentSidebar, { SidebarItem } from "../student/sidebar";
import TutorNavbar from "./TutorComponents/Navbar";
import bookOpen from "/book_open.svg";
export default function DashboardLayoutTutor({
  children,
  title = "Dashboard",
}) {
  return (
    <>
      <SidebarProvider>
        <div className="flex flex-col h-screen w-full">
          <div className="flex flex-1 w-full">
            <StudentSidebar>
              <SidebarItem
                icon={<Grid2X2 />}
                text="Dashboard"
                href="/dashboard/tutor/"
              />
              <SidebarItem
                icon={<BookMarkedIcon />}
                text="Schedule"
                href="/dashboard/tutor/schedule"
              />
              <SidebarItem
                icon={<BookOpenText />}
                text="Attendance"
                href="/dashboard/tutor/attendance"
              />
              <SidebarItem
                icon={<BookOpenText />}
                text="Paycheck"
                href="/dashboard/tutor/paycheck"
              />
            </StudentSidebar>
            <div className="flex flex-col flex-1 w-full">
              <TutorNavbar
                profileHref="/dashboard/tutor/profile"
                pageTitle={title}
              />
              <main className="flex-1 bg-primary p-6 w-full overflow-x-hidden relative">
                <img
                  src="/img_backdrop.png"
                  alt="Backdrop"
                  className="absolute bottom-0 right-0 w-[62%] h-auto object-cover pointer-events-none z-0"
                />
                {children}
              </main>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
