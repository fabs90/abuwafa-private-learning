"use client";

import { BookMarkedIcon, BookOpenText, Grid2X2 } from "lucide-react";
import { SidebarProvider } from "../SidebarContext";
import StudentSidebar, { SidebarItem } from "../student/sidebar";
import TutorNavbar from "./TutorComponents/Navbar";
export default function DashboardLayoutTutor({
  children,
  title = "Dashboard",
}) {
  return (
    <>
      <SidebarProvider>
        <div className="flex h-screen overflow-auto">
          {/* Sidebar */}
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

          {/* Main Content */}
          <div className="flex flex-col flex-1 w-full">
            {/* Sticky Navbar */}
            <TutorNavbar
              profileHref="/dashboard/tutor/profile"
              pageTitle={title}
              className="sticky top-0 w-full z-20 bg-white shadow"
            />
            <main className="flex-1 bg-primary p-6 w-full overflow-x-hidden relative z-0">
              {/* <img
                src="/img/img_backdrop.png"
                alt="Backdrop"
                className="absolute bottom-0 right-0 w-[50%] h-auto object-cover pointer-events-none -z-10 opacity-40 right-8"
              /> */}
              <img
                src="/img/img_backdrop.png"
                alt="Backdrop"
                className="absolute overflow-hidden bottom-0 -right-[15%] w-[85%] h-auto object-cover pointer-events-none -z-10 opacity-40 "
              />
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
