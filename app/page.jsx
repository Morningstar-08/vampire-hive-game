"use client";
import { useAuth } from "./providers/AuthProvider";
import { useState } from "react";
import Modal from "./components/Modal";

export default function Home() {
  const { user, login } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Turn Me Into Vampire</h1>
      {!user ? (
        <>
          <button
            onClick={openModal}
            className="bg-blue-500 px-4 py-2 rounded text-white"
          >
            Login with Hive Keychain
          </button>
          <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={login} />
        </>
      ) : (
        <p className="text-xl">Welcome, @{user}!</p>
      )}
    </div>
  );
}
