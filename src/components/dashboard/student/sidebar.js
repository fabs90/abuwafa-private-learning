"use client";
import Image from "next/image";
import abuwafaLogo from "/public/abuwafaLogo.png";
import { ChevronLast, ChevronLeft } from "lucide-react";
import { createContext, useContext, useState } from "react";
import { useSidebar } from "../SidebarContext";

const SidebarContext = createContext();
export default function StudentSidebar({ children }) {
  const { expanded } = useSidebar();
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white shadow-sm">
        <div className="p-3 sm:p-6 md:p-6 pb-2 flex justify-between items-center">
          <Image
            src={abuwafaLogo}
            alt="Logo Abuwafa"
            className={`overflow-hidden transition-all ${
              expanded ? "w-48 p-2 mx-3" : "w-0 p-4 mx-0"
            }`}
          />
          {/* <button
            onClick={() => setExpanded((e) => !e)}
            className="p-1.5 ml-1 md:ml-5 lg:md-5 text-black rounded  hover:bg-primary hover:text-white"
          >
            {expanded ? <ChevronLeft /> : <ChevronLast />}
          </button> */}
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 p-3">{children}</ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`
        relative flex items-center py-2 md:py-3 lg:py-3 px-2 md:px-3 lg:px-3 mx-2 md:mx-4 lg:mx-4 mt-4 mb-3
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-primary text-white"
            : "hover:bg-primary hover:text-white text-gray-600"
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
  );
}
