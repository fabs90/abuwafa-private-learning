"use client";
import StudentSidebar, { SidebarItem } from "./sidebar";
import { Calendar, Newspaper, NotepadText } from "lucide-react";
import DashboardNavbar from "../Navbar";
import { useState } from "react";
import { SidebarProvider } from "../SidebarContext";

export default function DashboardStudent() {
  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen">
        <div className="flex flex-1">
          <StudentSidebar>
            <SidebarItem icon={<Calendar />} text="Schedule" />
            <SidebarItem icon={<Newspaper />} text="Monthly Report" />
            <SidebarItem icon={<NotepadText />} text="Invoice" />
          </StudentSidebar>
          <div className="flex flex-col flex-1">
            <DashboardNavbar />
            <main className="flex-1 bg-primary p-6">
              <p>Your content goes here.</p>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
