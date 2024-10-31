"use client";
import { useHiveKeychainAuth } from "../auth/route";
import { useState } from "react";
import OpponentCards from "../../components/OpponentCards";
import GameStore from "../../components/GameStore";
// import PlayerCard from "../../components/PlayerCard";

export default function Home() {
  const [drachmas, setDrachmas] = useState(10000);
  const [player, setPlayer] = useState({
    name: "Damon Salvatore",
    health: 100,
    damage: 10,
    wins: 0,
    losses: 0,
  });
  const [powerUps, setPowerUps] = useState([]);

  return (
    <div className=" flex items-center h-screen ">
      <div className="p-8 rounded-lg flex space-x-4">
        {/* <GameParent /> */}
        {/* <GameStore drachmas={drachmas} /> */}
      </div>
    </div>
  );
}
