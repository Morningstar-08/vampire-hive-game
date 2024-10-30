import React, { useState, useEffect } from "react"; // Added useEffect import
import GameStore from "./GameStore";
import OpponentCards from "./OpponentCards";

const GameParent = () => {
  const [boosterPurchased, setBoosterPurchased] = useState("meow"); // Initialize with empty string

  // Debug log to track state changes
  // useEffect(() => {
  //   console.log("boosterPurchased state updated:", boosterPurchased);
  // }, [boosterPurchased]);

  const handleBoosterPurchase = (booster) => {
    // Add this function
    console.log("Setting booster:", booster);
    // console.log("Setting booster:");
    setBoosterPurchased(booster);
  };

  return (
    <div>
      <GameStore
        drachmas={100}
        handleBoosterPurchase={handleBoosterPurchase} // Changed prop name to match
        boosterPurchased={boosterPurchased}
      />
      <OpponentCards boosterPurchased={boosterPurchased} />
    </div>
  );
};

export default GameParent;
