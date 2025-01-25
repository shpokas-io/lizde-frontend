import React from "react";

export default function SearcBar() {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search"
        className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus-ring-blue-500 focus:outline-none sm:w-96"
      />
      <button className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
        🔍
      </button>
    </div>
  );
}
