"use client";
import StudentSidebar, { SidebarItem } from "./sidebar";
import { Calendar, Newspaper, NotepadText } from "lucide-react";
import DashboardNavbar from "./Navbar";
import { useState } from "react";
import { SidebarProvider } from "../SidebarContext";
export default function DashboardLayoutStudent({ children }) {
  return (
    <>
      <SidebarProvider>
        <div className="flex flex-col h-screen w-full">
          <div className="flex flex-1 w-full">
            <StudentSidebar>
              <SidebarItem
                icon={<Calendar />}
                text="Schedule"
                href="/dashboard/student/"
              />
              <SidebarItem
                icon={<Newspaper />}
                text="Monthly Report"
                href="/dashboard/student/monthly-report"
              />
              <SidebarItem
                icon={<NotepadText />}
                text="Invoice"
                href="/dashboard/student/invoice"
              />
            </StudentSidebar>
            <div className="flex flex-col flex-1 w-full">
              <DashboardNavbar />
              <main className="flex-1 bg-primary p-6 w-full overflow-x-hidden realtive z-50">
                <img
                  src="/img_backdrop.png"
                  alt="Backdrop"
                  className="absolute bottom-0 right-0 w-3/4 sm:w-1/2 h-auto object-cover pointer-events-none"
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
