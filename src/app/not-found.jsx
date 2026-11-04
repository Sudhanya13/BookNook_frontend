"use client";

import Link from "next/link";
import React, { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "BookNook | 404 - Page Not Found";
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center px-4 text-center">
      <div className="space-y-4 max-w-md">
        <span className="text-sm font-bold tracking-widest text-blue-400 uppercase bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full">
          Error 404
        </span>
        <h1 className="text-5xl font-extrabold text-white tracking-tight">
          Page Not Found
        </h1>
        <p className="text-gray-400">
          Oops! The page you are looking for doesn’t exist or has been moved.
        </p>
        <div className="pt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3.5 rounded-xl font-medium shadow-lg shadow-blue-600/30 hover:bg-blue-500 hover:shadow-blue-500/50 transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
