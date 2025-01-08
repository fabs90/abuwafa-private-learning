import React, { useState, useRef, useEffect } from "react";
import { Bell, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { useSidebar } from "../../SidebarContext";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function TutorNavbar({ pageTitle }) {
  const router = useRouter();
  const { expanded, toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Check if the current path is the dashboard
  const isDashboard = pathname === "/dashboard/admin";

  const handleLogout = (e) => {
    e.stopPropagation();
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
              onClick={toggleDropdown}
              className="avatar relative p-0 md:p-2 lg:p-2 rounded-full mr-0 md:mr-8 lg:mr-8"
            >
              <div className="w-7 md:w-9 lg:w-9 rounded-full">
                <img
                  src="https://img.freepik.com/free-vector/online-tutor-concept-illustration_114360-20299.jpg"
                  alt="Avatar"
                />
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
        </div>
      </div>
    </header>
  );
}
