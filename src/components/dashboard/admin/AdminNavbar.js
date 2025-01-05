"use client";
import React, { useState, useRef, useEffect } from "react";
import { Bell, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSidebar } from "../SidebarContext";

export default function AdminNavbar(props) {
  const pageTitle = props.pageTitle;
  const router = useRouter();
  const { expanded, toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Map pathnames to titles
  const getTitle = () => {
    return pageTitle;
    switch (pathname) {
      case "/dashboard/admin/schedule":
        return "Schedule";
      case "/dashboard/admin/attendance":
        return "Attendance";

      default:
        return "Dashboard";
    }
  };

  const handleLogout = (e) => {
    e.stopPropagation();
    router.push("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
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

  const title = getTitle(); // Get title based on pathname

  return (
    <header className="bg-accent shadow-md">
      <div className="flex justify-between items-center p-4">
        <div className="flex flex-row">
          <button
            onClick={toggleSidebar}
            className="ml-1 md:ml-3 lg:ml-3 p-1.5 text-neutral rounded hover:bg-primary hover:text-white transition-colors duration-300"
          >
            <span
              className={`transition-transform duration-300 ${
                expanded ? "rotate-0" : "rotate-180"
              }`}
            >
              {expanded ? <ChevronLeft /> : <ChevronRight />}
            </span>
          </button>
          <h1 className="mx-2  md:ml-6 lg:ml-6 mt-2 md:mt-1 lg:mt-1 text-sm  md:text-xl lg:text-xl text-neutral font-semibold">
            {title}
          </h1>
        </div>
        <div className="flex items-center">
          <div className="flex-1">
            <button
              className="p-2 md:p-1.5 lg:p-1.5 mr-3 md:mr-3 lg:mr-3 text-neutral rounded hover:bg-primary hover:text-white transition-colors duration-300"
              onClick={handleLogout}
            >
              <LogOut className="w-5 transform scale-x-[-1]" />
            </button>
          </div>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="avatar relative p-0 md:p-2 lg:p-2 rounded-full mr-0 md:mr-8 lg:mr-8"
            >
              <div className="w-7 md:w-9 lg:w-9 rounded-full">
                <img src="https://img.freepik.com/free-vector/online-tutor-concept-illustration_114360-20299.jpg?t=st=1733837286~exp=1733840886~hmac=796583944c56f47eb95cc81f4c34247efcb5ae67de645e0ed063a0036fb32459&w=740" />
              </div>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <ul className="py-2">
                  <li>
                    <a
                      href="/dashboard/tutor/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Add more icons or buttons as needed */}
        </div>
      </div>
    </header>
  );
}
