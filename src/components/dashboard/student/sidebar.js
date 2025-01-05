"use client";
import Image from "next/image";
import abuwafaLogo from "/abuwafaLogo.png";
import { ChevronLast, ChevronLeft, ChevronUp } from "lucide-react";
import { createContext, useContext, useState } from "react";
import { useSidebar } from "../SidebarContext";
import Link from "next/link";

const SidebarContext = createContext();
export default function StudentSidebar({ children }) {
  const { expanded } = useSidebar();
  return (
    <aside className="h-full">
      <nav className="h-full flex flex-col bg-accent">
        <div className="p-3 sm:p-6 md:p-6 pb-2 flex justify-between items-center">
          <div
            className={`overflow-hidden transition-all ${
              expanded ? "w-48 p-3 md:p-0 lg:p-0" : "w-0"
            }`}
          >
            <Image
              src={abuwafaLogo}
              alt="Logo Abuwafa"
              width={192} // Set a fixed width
              height={48} // Set a fixed height to maintain aspect ratio
              className="object-contain" // Ensure the image scales properly
            />
          </div>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 p-3">{children}</ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, href, active, alert }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <Link href={href || "#"} passHref>
      <li
        className={`
        relative flex items-center py-2 md:py-3 lg:py-3 px-2 md:px-3 lg:px-3 mx-2 md:mx-4 lg:mx-4 mt-4 mb-3
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-primary text-white"
            : "hover:bg-primary hover:text-white text-neutral"
        }
      `}
      >
        <span
          className={`flex items-center transition-all ${
            expanded ? "" : "justify-center"
          }`}
        >
          <span className="w-6 h-6">{icon}</span>
        </span>
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-3/4 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
        {alert && expanded && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-primary text-white`}
          />
        )}
      </li>
    </Link>
  );
}

export function SidebarDropdown({ icon, text, children }) {
  const { expanded } = useContext(SidebarContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="relative">
      <div
        className={`
          flex items-center justify-between py-2 md:py-3 lg:py-3 px-2 md:px-3 lg:px-3 mx-2 md:mx-4 lg:mx-4 mt-4 mb-3
          font-medium rounded-md cursor-pointer
          transition-colors group hover:bg-primary hover:text-white text-neutral
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <span className="w-6 h-6">{icon}</span>
          {expanded && <span className="ml-3">{text}</span>}
        </div>
        {expanded && (
          <span
            className={`transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <ChevronUp />
          </span>
        )}
      </div>

      <ul
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? "max-h-screen" : "max-h-0"}
        `}
        style={{
          paddingLeft: expanded ? "2rem" : "1.5rem", // Adjust padding for better alignment
        }}
      >
        {children}
      </ul>
    </li>
  );
}

export function SidebarSubItem({ text, href, icon }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <Link href={href || "#"} passHref>
      <li
        className={`
          flex items-center py-2 md:py-2 lg:py-2 px-2 md:px-3 lg:px-3 my-2
          font-medium rounded-md cursor-pointer
          transition-colors group hover:bg-primary hover:text-white text-neutral
        `}
      >
        <div className="flex items-center">
          <span className="w-6 h-6">{icon}</span>
          {expanded && <span className="ml-3">{text}</span>}
        </div>
      </li>
    </Link>
  );
}
