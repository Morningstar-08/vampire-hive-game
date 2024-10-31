import React, { useState, useEffect } from "react";
import OpponentCards from "./OpponentCards";

const GameStore = ({ drachmas }) => {
  const [prevButtonVisibility, setPrevButtonVisibility] = useState(false);
  // Check if Next Turn button is visible and update canBuy accordingly
  useEffect(() => {
    const checkNextTurnVisibility = () => {
      const nextTurnButton = document.getElementById("nextTurn");
      const isNextTurnVisible =
        nextTurnButton &&
        window.getComputedStyle(nextTurnButton).display !== "none";

      // Only update states if visibility has changed
      if (isNextTurnVisible !== prevButtonVisibility) {
        setPrevButtonVisibility(isNextTurnVisible);

        if (isNextTurnVisible) {
          // Button has just become visible - reset states
          setCanBuy(true);
          setBoosterPurchased("");
          console.log("Next Turn button visible - enabling purchases");
        } else {
          // Button has just become hidden
          console.log("Next Turn button hidden - disabling purchases");
        }
      }
    };

    // Check immediately and set up interval for continuous checking
    checkNextTurnVisibility();
    const intervalId = setInterval(checkNextTurnVisibility, 100);

    // Cleanup interval
    return () => clearInterval(intervalId);
  }, [prevButtonVisibility]);

  // Define the base items and special items separately
  const items = [
    //has some impact on players health
    { name: "Shadow Veil", cost: 20 }, // Makes the vampire immune to damage for 1 round but the enemy does get intended damage
    { name: "Life Drain", cost: 200 }, // Steals health from the enemy, restoring 10% health (meaning the player doesnt do intended damage, only steals the health)
    { name: "Summon Bats", cost: 80 }, // Distracts the enemy, reducing their chance to hit; reduces the damage they cause by 15%
    { name: "Crimson Elixir", cost: 200 }, // Reduces damage from werewolf attacks for next round (could go to waste if next card isn't werewolf)
    //has impact on damage
    { name: "Silver Blade", cost: 100 }, // increases attack damage by 5 if next card is werewolf
    { name: "Vampiric Fury", cost: 150 }, // if next card killed is human, then probability of a human replacing it is 90%
    { name: "Bloodlust Surge", cost: 20 }, // increases attack damage by 1 throughout game if next card is human or healing witch
  ];

  const specialItems = [
    { name: "Burn Card$", cost: 500 }, // Instantly removes a damaging card from the deck (whichever you click on next) and the player gets no damage
    { name: "Venomous Fangs$", cost: 150 }, // (+10 damage if next card is damaging) single use
    { name: "Mirror Curse$", cost: 400 }, // Reflects all enemy damage back at them (single use)
  ];

  const [drachmasCount, setDrachmasCount] = useState(drachmas);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [canBuy, setCanBuy] = useState(true);
  const [boosterPurchased, setBoosterPurchased] = useState("");

  console.log("drachmas= ", drachmasCount);

  const getRandomItems = (items, count) => {
    const shuffled = items.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    const randomItems = getRandomItems(items, 4);
    const randomSpecialItem =
      specialItems[Math.floor(Math.random() * specialItems.length)];
    setDisplayedItems([...randomItems, randomSpecialItem]);
  }, []);

  // Log the booster purchased whenever it changes
  useEffect(() => {
    console.log("GameStore; booster purchased:", boosterPurchased);
  }, [boosterPurchased]);

  const handleBooster = (item) => {
    const nextTurnButton = document.getElementById("nextTurn");
    const isNextTurnVisible =
      nextTurnButton &&
      window.getComputedStyle(nextTurnButton).display !== "none";

    if (!isNextTurnVisible || !canBuy) return;
    console.log("GameStore - Item clicked:", item.name); // Debug log
    setBoosterPurchased(item.name);
    if (drachmasCount >= item.cost) {
      setDrachmasCount((prev) => prev - item.cost);
      setCanBuy(false);
    }
  };

  return (
    <div className="flex space-x-4 h-full">
      {" "}
      {/* OpponentCards section */}
      <div className="flex-1 bg-black p-4 rounded-lg h-80 overflow-y-auto h-full">
        {" "}
        {/* Black background for OpponentCards */}
        <OpponentCards boosterPurchased={boosterPurchased} />{" "}
        {/* Pass any necessary props */}
      </div>
      {/* Flex container for side-by-side layout */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg h-80 overflow-y-auto flex-1">
        {" "}
        {/* GameStore section */}
        <h2 className="text-white text-lg font-semibold mb-4">
          In-Store Market
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {displayedItems.map((item, index) => (
            <div
              key={index}
              className="bg-gray-700 hover:bg-gray-600 p-3 rounded-lg shadow-md cursor-pointer transition-all duration-200"
              onClick={() => {
                if (canBuy) handleBooster(item);
              }}
            >
              <h3 className="text-white text-sm font-bold mb-2 text-center">
                {item.name}
              </h3>
              <div className="text-gray-300 text-xs text-center mb-4">
                Cost:{" "}
                <span className="font-semibold">{item.cost} Drachmas</span>
              </div>
              <button className="bg-purple-500 hover:bg-purple-600 w-full text-white py-1 rounded-md text-xs">
                Buy Now
              </button>
            </div>
          ))}
        </div>
        <div className="text-white mt-4 text-center">
          <p className="text-sm">
            <span className="font-bold">
              {drachmasCount > 0
                ? "Available Drachmas: " + drachmasCount
                : "Purchase more Drachmas"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameStore;
