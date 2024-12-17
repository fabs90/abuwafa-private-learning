"use client";

import { BookMarkedIcon, BookOpenText, Grid2X2 } from "lucide-react";
import { SidebarProvider } from "../SidebarContext";
import StudentSidebar, { SidebarItem } from "../student/sidebar";
import TutorNavbar from "./Navbar";
import bookOpen from "/public/book_open.svg";
export default function DashboardLayoutTutor({ children }) {
  return (
    <>
      <SidebarProvider>
        <div className="flex flex-col h-screen w-full dashboard-background">
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
              {/* <SidebarItem
                icon={<BookOpenText />}
                text="Monthly Report"
                href="/dashboard/tutor/monthly-report"
              /> */}
            </StudentSidebar>
            <div className="flex flex-col flex-1 w-full">
              <TutorNavbar profileHref="/dashboard/tutor/profile" />
              <main className="flex-1 bg-primary p-6 w-full overflow-x-hidden">
                {children}
              </main>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
