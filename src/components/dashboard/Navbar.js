import React from "react";
import { Bell, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";
import { useSidebar } from "./SidebarContext";

export default function DashboardNavbar() {
  const { expanded, toggleSidebar } = useSidebar(); // Destructure correctly

  return (
    <header className="bg-white shadow-md">
      <div className="flex justify-between items-center p-4">
        <div className="flex flex-row">
          <button
            onClick={toggleSidebar}
            className="ml-3 p-1.5 text-black rounded hover:bg-primary hover:text-white transition-colors duration-300"
          >
            <span
              className={`transition-transform duration-300 ${
                expanded ? "rotate-0" : "rotate-180"
              }`}
            >
              {expanded ? <ChevronLeft /> : <ChevronRight />}
            </span>
          </button>
          <h1 className="ml-6 mt-1 text-xl font-semibold">My Schedule</h1>
        </div>
        <div className="flex items-center">
          <button className="relative p-2 hover:bg-gray-200 rounded-full">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          {/* Add more icons or buttons as needed */}
        </div>
      </div>
    </header>
  );
}
