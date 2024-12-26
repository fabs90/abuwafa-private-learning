"use client";
import {
  BookCopy,
  BookOpenText,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  GraduationCap,
  Grid2X2,
  NotebookPen,
  PenBox,
  UserCheck,
  Wallet,
} from "lucide-react";
import { SidebarProvider } from "../SidebarContext";
import StudentSidebar, {
  SidebarDropdown,
  SidebarItem,
  SidebarSubItem,
} from "../student/sidebar";
import AdminNavbar from "./AdminNavbar";

export default function DashboardLayoutAdmin({ children }) {
  return (
    <>
      <SidebarProvider>
        <div className="flex flex-col h-screen w-full">
          <div className="flex flex-1 w-full">
            <StudentSidebar>
              <SidebarItem
                icon={<Grid2X2 />}
                text="Dashboard"
                href="/dashboard/admin/"
              />
              <SidebarDropdown icon={<NotebookPen />} text="Manage">
                <SidebarSubItem
                  icon={<BriefcaseBusiness width={24} height={24} />}
                  text="Tutors"
                  href="/dashboard/admin/students"
                />
                <SidebarSubItem
                  icon={<GraduationCap width={24} height={24} />}
                  text="Students"
                  href="/dashboard/admin/students"
                />
                <SidebarSubItem
                  icon={<BookCopy width={24} height={24} />}
                  text="Subjects"
                  href="/dashboard/admin/students"
                />
                <SidebarSubItem
                  icon={<CalendarDays width={24} height={24} />}
                  text="Schedules"
                  href="/dashboard/admin/students"
                />
              </SidebarDropdown>

              <SidebarItem
                icon={<UserCheck />}
                text="Attendance"
                href="/dashboard/admin/"
              />
              <SidebarItem
                icon={<BookOpenText />}
                text="Monthly Report"
                href="/dashboard/admin/"
              />
              <SidebarItem
                icon={<Wallet />}
                text="Paycheck"
                href="/dashboard/admin/"
              />
            </StudentSidebar>
            <div className="flex flex-col flex-1 w-full">
              <AdminNavbar profileHref="/dashboard/admin" />
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
