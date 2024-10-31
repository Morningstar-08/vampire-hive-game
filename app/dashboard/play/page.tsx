"use client";
import { useAuth } from "../../providers/AuthProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GameStore from "@/app/components/GameStore";
import OpponentCards from "@/app/components/OpponentCards";

export default function Play() {
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

  const [drachmas, setDrachmas] = useState(1000);
  const [player, setPlayer] = useState({
    name: "Damon Salvatore",
    health: 100,
    damage: 10,
    wins: 0,
    losses: 0,
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Play</h1>
      <p>Welcome to your Playing, @{user}!</p>
      <div className=" flex items-center h-screen ">
        <div className="p-8 rounded-lg flex space-x-4">
          {/* Opponent Cards */}
          {/* <OpponentCards /> */}

          {/* Game Store */}
          <GameStore drachmas={drachmas} />
        </div>
      </div>
    </div>
  );
}
