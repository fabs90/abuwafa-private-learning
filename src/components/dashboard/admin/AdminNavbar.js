"use client";
import React, { useState, useRef, useEffect } from "react";
import { Bell, ChevronLeft, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useSidebar } from "../SidebarContext";
import Cookies from "js-cookie";

export default function AdminNavbar({ pageTitle }) {
  const router = useRouter();
  const pathname = usePathname();
  const { expanded, toggleSidebar } = useSidebar();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Check if the current path is the dashboard
  const isDashboard = pathname === "/dashboard/admin";

  const handleLogout = (e) => {
    e.stopPropagation();
    // Clear authentication data (e.g., token) from cookies
    Cookies.remove("token");
    Cookies.remove("user_id");
    Cookies.remove("role");

    // Optionally clear cookies if you're using them for server-side authentication
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    router.push("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleBack = () => {
    router.back();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-accent shadow-md">
      <div className="flex justify-between items-center p-4">
        <div className="flex flex-row">
          {!isDashboard && ( // Conditionally render the Back button
            <button
              onClick={toggleBack}
              className="ml-1 md:ml-3 lg:ml-3 p-1.5 text-neutral rounded hover:bg-primary hover:text-white transition-colors duration-300"
            >
              <ChevronLeft />
            </button>
          )}
          <h1 className="mx-2 md:ml-6 lg:ml-6 mt-2 md:mt-1 lg:mt-1 text-sm md:text-xl lg:text-xl text-neutral font-semibold">
            {pageTitle || "Dashboard"}
          </h1>
        </div>
        <div className="flex items-center">
          <button
            className="p-2 md:p-1.5 lg:p-1.5 mr-3 md:mr-3 lg:mr-3 text-neutral rounded hover:bg-primary hover:text-white transition-colors duration-300"
            onClick={handleLogout}
          >
            <LogOut className="w-5 transform scale-x-[-1]" />
          </button>
          <div className="relative" ref={dropdownRef}>
            <button
              // onClick={toggleDropdown}
              className="avatar relative p-0 md:p-2 lg:p-2 rounded-full mr-0 md:mr-8 lg:mr-8 pointer-events-none"
            >
              <div className="w-7 md:w-9 lg:w-9 rounded-full">
                <img
                  src="https://img.freepik.com/free-vector/online-tutor-concept-illustration_114360-20299.jpg"
                  alt="Avatar"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
