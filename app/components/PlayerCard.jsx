// import React from "react";

// const PlayerCard = ({ player, powerUps }) => (
//   <div className="flex flex-col items-center space-y-4">
//     <div className="bg-purple-500 p-2 rounded-lg w-100">
//       <div className="p-1 rounded-t-lg text-black">
//         <div>Losses: {player.losses}</div>
//         <div>Wins: {player.wins}</div>
//       </div>
//       <img
//         src="https://preview.redd.it/what-do-you-like-and-dislike-most-about-damon-v0-qkmx0waaybwb1.jpg?width=640&crop=smart&auto=webp&s=5a9fb4508d77dc6a0d0684de3ec1577111c6134f"
//         alt="Character"
//         className="w-full h-32 object-cover"
//       />
//       <div className="text-center text-white">NFT Card</div>
//     </div>
//     <div className="text-white">
//       <div>Health: {player.health}</div>
//       <div>Damage: {player.damage}</div>
//       <div>Humans Killed: {player.damage}</div>
//       <div>
//         Power-ups:{" "}
//         {powerUps.length > 0 ? powerUps.map((p) => p.name).join(", ") : "None"}
//       </div>
//     </div>
//   </div>
// );

// export default PlayerCard;

import React from "react";

const PlayerCard = ({ player = {}, powerUps = [] }) => {
  const {
    wins = 0,
    losses = 0,
    health = 100,
    damage = 10,
    humansDefeated = 0,
  } = player;

  return (
    <div className="relative h-full max-w-xs w-full">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-75" />
      <div className="relative h-full bg-gray-900 rounded-2xl border border-purple-500/30 shadow-2xl">
        <div className="h-full p-3 flex flex-col">
          {/* Stats Header */}
          <div className="flex justify-between text-xs text-purple-200 mb-2">
            <div className="px-2 py-1 rounded-full bg-purple-900/50 border border-purple-500/30">
              Wins: {wins}
            </div>
            <div className="px-2 py-1 rounded-full bg-purple-900/50 border border-purple-500/30">
              Losses: {losses}
            </div>
          </div>

          {/* Character Image */}
          <div className="relative h-24 rounded-xl overflow-hidden mb-2">
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900 to-transparent opacity-60" />
            <img
              src="/api/placeholder/320/192"
              alt="Character"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 w-full p-1 text-center text-white text-sm font-bold bg-gradient-to-t from-purple-900/90 to-transparent">
              Player Character
            </div>
          </div>

          {/* Stats Grid */}
          <div className="space-y-2 text-sm mb-2">
            <div className="flex justify-between items-center">
              <span className="text-purple-200">Health</span>
              <div className="px-2 py-1 rounded-lg bg-purple-900/50 text-purple-100 border border-purple-500/30">
                {health}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-purple-200">Damage</span>
              <div className="px-2 py-1 rounded-lg bg-purple-900/50 text-purple-100 border border-purple-500/30">
                {damage}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-purple-200">Humans Defeated</span>
              <div className="px-2 py-1 rounded-lg bg-purple-900/50 text-purple-100 border border-purple-500/30">
                {humansDefeated}
              </div>
            </div>
          </div>

          {/* Power-ups Section */}
          <div className="pt-2 border-t border-purple-500/30 mt-auto">
            <h3 className="text-xs font-semibold text-purple-300 mb-1">
              Active Power-ups
            </h3>
            <div className="text-xs text-purple-400">
              {powerUps.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {powerUps.map((powerUp, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 rounded-full bg-purple-900/50 border border-purple-500/30"
                    >
                      {powerUp.name}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-purple-500">No active power-ups</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
