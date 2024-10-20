"use client";
import { useAuth } from "./providers/AuthProvider";

export default function Home() {
  const { user, login } = useAuth();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Turn Me Into Vampire</h1>
      {!user ? (
        <button
          onClick={() => login(prompt("Enter your Hive username"))}
          className="bg-blue-500 px-4 py-2 rounded text-white"
        >
          Login with Hive Keychain
        </button>
      ) : (
        <p className="text-xl">Welcome, @{user}!</p>
      )}
    </div>
  );
}