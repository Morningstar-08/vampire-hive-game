import React from "react";

const PlayerCard = ({ player, powerUps }) => (
  <div className="flex flex-col items-center space-y-4">
    <div className="bg-purple-500 p-2 rounded-lg w-100">
      <div className="p-1 rounded-t-lg text-black">
        <div>Losses: {player.losses}</div>
        <div>Wins: {player.wins}</div>
      </div>
      <img
        src="https://preview.redd.it/what-do-you-like-and-dislike-most-about-damon-v0-qkmx0waaybwb1.jpg?width=640&crop=smart&auto=webp&s=5a9fb4508d77dc6a0d0684de3ec1577111c6134f"
        alt="Character"
        className="w-full h-32 object-cover"
      />
      <div className="text-center text-white">NFT Card</div>
    </div>
    <div className="text-white">
      <div>Health: {player.health}</div>
      <div>Damage: {player.damage}</div>
      <div>Humans Killed: {player.damage}</div>
      <div>
        Power-ups:{" "}
        {powerUps.length > 0 ? powerUps.map((p) => p.name).join(", ") : "None"}
      </div>
    </div>
  </div>
);

export default PlayerCard;
