import { useState } from "react";

const GameHistory = () => {
  const [selectedEntry, setSelectedEntry] = useState(null);

  const historyEntries = [
    {
      id: 1,
      date: "Oct 31",
      type: "Battle",
      outcome: "Victory",
      reward: "+500",
      powerUsed: "Blood Moon",
    },
    {
      id: 2,
      date: "Oct 30",
      type: "Raid",
      outcome: "Defeat",
      reward: "-200",
      powerUsed: "Shadow Strike",
    },
    {
      id: 3,
      date: "Oct 29",
      type: "Quest",
      outcome: "Victory",
      reward: "+300",
      powerUsed: "Dark Ritual",
    },
  ];

  return (
    <div className="relative m-8  max-w-4xl h-[28rem]">
      {/* Animated border */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-purple-500 to-red-500 rounded-xl blur opacity-75 animate-gradient-x"></div>

      <div className="relative bg-gradient-to-b from-gray-900/90 to-black/90 rounded-xl backdrop-blur-sm border border-purple-500/20 p-4 h-full flex flex-col items-center justify-between">
        {/* Title with gothic styling */}
        <h2
          className="text-2xl font-gothic text-red-200 mb-6"
          style={{ textShadow: "0 0 10px rgba(220, 38, 38, 0.5)" }}
        >
          Game History
        </h2>

        {/* History entries in a column */}
        <div className="space-y-4 w-full max-w-2xl">
          {historyEntries.map((entry) => (
            <div
              key={entry.id}
              className={`relative group cursor-pointer transition-all duration-300 w-full max-w-lg ${
                selectedEntry === entry.id ? "scale-105" : ""
              }`}
              onClick={() =>
                setSelectedEntry(entry.id === selectedEntry ? null : entry.id)
              }
            >
              {/* Entry background with hover effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-red-500 rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-300"></div>

              <div className="relative bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-1.5 rounded-lg border border-purple-500/20 w-full">
                {/* Entry header */}
                <div className="flex justify-between items-center mb-1">
                  <span className="text-purple-200 font-medium">
                    {entry.date}
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      entry.outcome === "Victory"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {entry.outcome}
                  </span>
                </div>

                {/* Entry details */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Type:</span>
                    <span className="text-purple-300">{entry.type}</span>
                  </div>

                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Power:</span>
                    <span className="text-red-300">{entry.powerUsed}</span>
                  </div>

                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Reward:</span>
                    <span
                      className={`font-medium ${
                        entry.reward.startsWith("+")
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {entry.reward}
                    </span>
                  </div>
                </div>

                {/* Power indicator */}
                <div className="mt-1 h-0.5 w-full bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-red-500 animate-pulse"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add a decorative bottom accent */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent blur-sm"></div>
      </div>
    </div>
  );
};

export default GameHistory;

// Add this CSS to your globals.css or relevant stylesheet
const styles = `
  @keyframes gradient-x {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .animate-gradient-x {
    animation: gradient-x 3s ease infinite;
    background-size: 200% 200%;
  }
`;
