"use client";
import { useAuth } from "../../providers/AuthProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GameStore from "@/app/components/GameStore";
import { Coins, Gem, Plus } from "lucide-react";
import VampireCursor from "@/app/components/VampireCursor";

export default function Play() {
  const { user } = useAuth();
  const router = useRouter();

  // Redirect if user is not logged in
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  // Parent state for drachmas
  const [drachmas, setDrachmas] = useState(1000);

  // Callback function to update drachmas
  const handleDrachmasChange = (newDrachmas: number) => {
    setDrachmas(newDrachmas);
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="h-screen w-screen flex bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/playgame.jpg')`,
      }}
    >
      <VampireCursor />
      {/* Main Game Area */}
      <div className="">
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
      </div>

      {/* GameStore Component */}
      <div className="w-full h-full border-purple-500/30">
        {/* Pass down the callback to GameStore */}
        <GameStore
          drachmas={drachmas}
          onDrachmasChange={handleDrachmasChange}
        />
      </div>
    </div>
  );
}
