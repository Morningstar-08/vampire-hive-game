import React, { useState, useEffect } from "react";

const GameStore = ({ drachmas, handleBoosterPurchase, boosterPurchased }) => {
  // Define the base items and special items separately
  const items = [
    { name: "Shadow Veil", cost: 20 }, // Makes the vampire immune to damage for 1 round but the enemy does get intended damage
    { name: "Bloodlust Surge", cost: 20 }, // reduces attack damage of enemy by 3 for next 2 turns
    { name: "Life Drain", cost: 200 }, // Steals health from the enemy, restoring 10% health
    { name: "Summon Bats", cost: 80 }, // Distracts the enemy, reducing their chance to hit
    { name: "Crimson Elixir", cost: 100 }, // Restores 30% health
    { name: "Vampiric Fury", cost: 150 }, // increases attack damage for next 3 rounds
    { name: "Silver Blade", cost: 200 }, // Reduces damage from werewolf attacks for next round (could go to waste if next card isn't werewolf)
  ];

  const specialItems = [
    { name: "Burn Card⭐", cost: 100 }, // Instantly removes a weak card from the deck (witch first priority, then werewolf)
    { name: "Venomous Fangs⭐", cost: 150 }, // (+10 damage) single use
    { name: "Mirror Curse⭐", cost: 400 }, // Reflects all enemy damage back at them for 1 round (single use)
  ];

  const [drachmasCount, setDrachmasCount] = useState(drachmas);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [canBuy, setCanBuy] = useState(true);

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

  console.log("Props in GameStore: ", drachmas, handleBoosterPurchase);

  const handleBooster = (item) => {
    console.log("GameStore - Item clicked:", item.name); // Debug log
    if (!canBuy) return;

    if (drachmasCount >= item.cost) {
      setDrachmasCount((prev) => prev - item.cost);
      setCanBuy(false);
      // handleBoosterPurchase(item.name);
      console.log("GameStore - Calling onBoosterPurchase with:", item.name);

      // Add safety check for onBoosterPurchase
      // if (typeof onBoosterPurchase === "function") {
      //   console.log("GameStore - Calling onBoosterPurchase with:", item.name);
      //   onBoosterPurchase(item.name);
      // } else {
      //   console.error("onBoosterPurchase is not a function");
      // }

      setTimeout(() => {
        setCanBuy(true);
      }, 2000);
    }
  };

  // const handleBooster = (item) => {
  //   console.log("item brought: ", item);
  //   // if (item.name === "Shadow Veil") {
  //   //   handleShadowVeil();
  //   // }
  //   // Call the parent's onBoosterPurchase function
  //   if (typeof onBoosterPurchase === "function") {
  //     onBoosterPurchase(item.name);
  //   }
  // };

  // const broughtItem = (item) => {
  //   if (!canBuy) return;
  //   // console.log("item brought: ", item);
  //   setDrachmasCount((prev) => {
  //     if (prev >= item.cost) {
  //       console.log(prev);
  //       return prev - item.cost;
  //     }
  //     return prev;
  //   });
  //   setCanBuy(false);
  //   handleBooster(item);
  //   setTimeout(() => {
  //     setCanBuy(true);
  //   }, 2000);
  // };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg h-80 overflow-y-auto">
      <h2 className="text-white text-lg font-semibold mb-4">In-Store Market</h2>

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
              Cost: <span className="font-semibold">{item.cost} Drachmas</span>
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
  );
};

export default GameStore;
