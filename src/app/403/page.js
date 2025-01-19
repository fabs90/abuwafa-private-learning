"use client";
import { useRouter } from "next/navigation";

/* eslint-disable @next/next/no-html-link-for-pages */
export default function Forbidden() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary">
      <h1 className="text-4xl font-bold text-secondarySiena">403</h1>
      <p className="text-lg text-white mt-2">
        You do not have access to this page.
      </p>
      <button
        onClick={() => router.back()} // Navigate back to the previous page
        className="mt-4 px-4 py-2 bg-blueYoender hover:bg-darkerBlueYoender text-white rounded"
      >
        Back
      </button>
    </div>
  );
}
