"use client";
import { useAuth } from "../providers/AuthProvider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>Welcome to your dashboard, @{user}!</p>
      {/* Add your dashboard components here */}
      {/* <button onClick={() => router.push("/dashboard/play")}>Play game</button> */}
      <button onClick={() => router.push("/dashboard/vampire")}>
        Play game
      </button>
    </div>
  );
}
