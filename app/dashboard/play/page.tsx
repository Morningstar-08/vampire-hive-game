"use client";
import { useAuth } from "../../providers/AuthProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GameStore from "@/app/components/GameStore";
import { Coins, Gem, Plus } from "lucide-react";

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

  return (
    // <div className="container mx-auto p-4">
    //   <h1 className="text-3xl font-bold mb-4">Play</h1>
    //   <p>Welcome to your Playing, @{user}!</p>
    //   <div className=" flex items-center h-screen ">
    //     <div className="p-8 rounded-lg flex space-x-4">
    //       <GameStore drachmas={drachmas} />
    //     </div>
    //   </div>
    // </div>

    <div
      className="h-screen w-screen flex bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/playgame.jpg')`,
      }}
    >
      {/* Main Game Area - Takes up all space except for GameStore width */}
      <div className="w-full h-full">
        {/* Currency Display */}
        <div className="absolute top-4 right-[22%] transform translate-x-[-1rem] flex items-center space-x-4">
          {/* Drachmas Display */}
          <div className="group relative">
            <div className="flex items-center bg-gradient-to-r from-yellow-900/50 to-yellow-800/50 rounded-lg p-2 pr-4 border border-yellow-600/30 hover:border-yellow-500/50 transition-all duration-300">
              <div className="relative">
                <div className="absolute -left-1 -top-1 w-10 h-10 bg-yellow-500/20 rounded-full animate-pulse" />
                <Coins className="w-8 h-8 text-yellow-400 relative z-10" />
              </div>
              <div className="ml-3">
                <div className="text-sm text-yellow-400/80">Drachmas Owned</div>
                <div className="text-xl font-bold text-yellow-400">
                  {drachmas.toLocaleString()}
                </div>
              </div>
              <button className="ml-3 p-1 rounded-full bg-yellow-500/20 hover:bg-yellow-500/30 transition-colors">
                <Plus className="w-4 h-4 text-yellow-400" />
              </button>
            </div>
            {/* Tooltip */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full bg-black/90 text-yellow-400 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Click + to buy more Drachmas
            </div>
          </div>

          {/* Hive Coins Display */}
          <div className="group relative">
            <div className="flex items-center bg-gradient-to-r from-purple-900/50 to-purple-800/50 rounded-lg p-2 pr-4 border border-purple-600/30 hover:border-purple-500/50 transition-all duration-300">
              <div className="relative">
                <div className="absolute -left-1 -top-1 w-10 h-10 bg-purple-500/20 rounded-full animate-pulse" />
                <Gem className="w-8 h-8 text-purple-400 relative z-10" />
              </div>
              <div className="ml-3">
                <div className="text-sm text-purple-400/80">
                  Hive Coins Owned
                </div>
                <div className="text-xl font-bold text-purple-400">
                  {drachmas.toLocaleString()}
                </div>
              </div>
              <button className="ml-3 p-1 rounded-full bg-purple-500/20 hover:bg-purple-500/30 transition-colors">
                <Plus className="w-4 h-4 text-purple-400" />
              </button>
            </div>
            {/* Tooltip */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full bg-black/90 text-purple-400 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Click + to buy more Hive Coins
            </div>
          </div>
        </div>

        {/* This wrapper ensures OpponentCards takes up the full available width */}
        {/* <div className="w-full h-full">
          <OpponentCards boosterPurchased={booster} />
        </div> */}
        <div className="w-full h-full  border-purple-500/30">
          <GameStore drachmas={drachmas} />
        </div>
      </div>

      {/* Game Store - Fixed width on the right */}
    </div>
  );
}
