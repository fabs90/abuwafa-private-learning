"use client";
import {
  BookCopy,
  BookOpenText,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
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

export default function DashboardLayoutAdmin({
  children,
  title = "Dashboard",
}) {
  return (
    <>
      <SidebarProvider>
        <div className="flex flex-col h-screen">
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
                  href="/dashboard/admin/manage/tutors/"
                />
                <SidebarSubItem
                  icon={<GraduationCap width={24} height={24} />}
                  text="Students"
                  href="/dashboard/admin/manage/students"
                />
                <SidebarSubItem
                  icon={<BookCopy width={24} height={24} />}
                  text="Subjects"
                  href="/dashboard/admin/manage/subjects"
                />
                <SidebarSubItem
                  icon={<CalendarDays width={24} height={24} />}
                  text="Schedules"
                  href="/dashboard/admin/manage/schedules"
                />
              </SidebarDropdown>

              <SidebarItem
                icon={<UserCheck />}
                text="Attendance"
                href="/dashboard/admin/attendance"
              />
              <SidebarItem
                icon={<BookOpenText />}
                text="Monthly Report"
                href="/dashboard/admin/monthly-report"
              />
              <SidebarItem
                icon={<Wallet />}
                text="Paycheck"
                href="/dashboard/admin/paycheck"
              />
              <SidebarItem
                icon={<Wallet />}
                text="Invoice"
                href="/dashboard/admin/invoice"
              />
            </StudentSidebar>
            <div className="flex flex-col flex-1 w-full">
              <AdminNavbar
                profileHref="/dashboard/admin/profile"
                pageTitle={title}
              />
              <main className="flex-1 bg-primary p-6 w-full overflow-x-hidden relative z-0">
                {/* <img
                  src="/img/img_backdrop.png"
                  alt="Backdrop"
                  className="absolute overflow-hidden bottom-0 -right-[25%] w-[75%] h-auto object-cover pointer-events-none -z-10 opacity-40 "
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
        </div>
      </SidebarProvider>
    </>
  );
}
