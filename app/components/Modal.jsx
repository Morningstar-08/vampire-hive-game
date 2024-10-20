"use client";
import { useState } from "react";

export default function Modal({ isOpen, onClose, onSubmit }) {
  const [username, setUsername] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (username.trim() !== "") {
      onSubmit(username);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="bg-black border border-red-600 p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-red-500 mb-4">Hive Login</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your Hive username"
          className="w-full p-2 rounded-md bg-gray-800 text-white border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-600 mb-4"
        />
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
