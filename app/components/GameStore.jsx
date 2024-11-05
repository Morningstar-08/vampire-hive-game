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
    // { name: "Vampiric Fury", cost: 150 }, // if next card killed is human, then probability of a human replacing it is 90%
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
  const [purchasedItems, setPurchasedItems] = useState(new Set()); // Track purchased items

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

  const getItemDescription = (itemName) => {
    const descriptions = {
      "Shadow Veil":
        "Makes the vampire immune to damage for 1 round but the enemy does get intended damage",
      "Life Drain":
        "Steals health from the enemy, restoring 10% health (player doesn't do intended damage, only steals health)",
      "Summon Bats": "Distracts the enemy, reducing their damage by 15%",
      "Crimson Elixir": "Reduces damage from werewolf attacks for next round",
      "Silver Blade": "Increases attack damage by 5 if next card is werewolf",
      "Bloodlust Surge":
        "Increases attack damage by 1 throughout game if next card is human or healing witch",
      "Burn Card$":
        "Instantly removes a damaging card from the deck (no damage received)",
      "Venomous Fangs$":
        "Adds +10 damage if next card is damaging (single use)",
      "Mirror Curse$": "Reflects all enemy damage back at them (single use)",
    };
    return descriptions[itemName] || "Description not available";
  };

  const handleBooster = (item) => {
    const nextTurnButton = document.getElementById("nextTurn");
    const isNextTurnVisible =
      nextTurnButton &&
      window.getComputedStyle(nextTurnButton).display !== "none";

    if (!isNextTurnVisible || !canBuy) return;
    console.log("GameStore - Item clicked:", item.name); // Debug log
    setBoosterPurchased(item.name);
    if (drachmasCount >= item.cost) {
      setBoosterPurchased(item.name);
      setDrachmasCount((prev) => prev - item.cost);
      setCanBuy(false);
      setPurchasedItems((prev) => new Set([...prev, item.name])); // Add to purchased items
    }
  };

  return (
    <div className="flex">
      {/* Left side - OpponentCards */}
      <div className="h-full w-full">
        <OpponentCards boosterPurchased={boosterPurchased} />
      </div>

      {/* Right side - Game Store */}
      {/* <div className="w-80 bg-gray-900 p-4 rounded-lg">
        <h2 className="text-white text-lg font-semibold mb-4">
          In-Store Market
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {displayedItems
            .filter((item) => !purchasedItems.has(item.name))
            .map((item, index) => (
              <div
                key={index}
                className="relative bg-gray-700 p-3 rounded-lg shadow-md transition-all duration-200"
              >
                <button
                  className="absolute top-2 right-2 w-5 h-5 rounded-full bg-gray-600 text-white text-xs flex items-center justify-center hover:bg-gray-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(getItemDescription(item.name));
                  }}
                >
                  i
                </button>

                <h3 className="text-white text-sm font-bold mb-2 text-center pr-6">
                  {item.name}
                </h3>
                <div className="text-gray-300 text-xs text-center mb-3">
                  Cost:{" "}
                  <span className="font-semibold">{item.cost} Drachmas</span>
                </div>
                <button
                  className="bg-purple-500 hover:bg-purple-600 w-full text-white py-1 rounded-md text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={purchasedItems.has(item.name)}
                  onClick={() => {
                    if (canBuy) handleBooster(item);
                  }}
                >
                  Buy Now
                </button>
              </div>
            ))}
        </div>
        <div className="text-white mt-4 text-center">
          <p className="text-sm font-bold">
            {drachmasCount > 0
              ? `Available Drachmas: ${drachmasCount}`
              : "Purchase more Drachmas"}
          </p>
        </div>
      </div> */}
      <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white p-6 rounded-lg shadow-lg h-full w-full border border-purple-800 relative z-10">
        <h2 className="text-lg sm:text-2xl font-bold mb-6 text-center text-purple-500">
          In-Store Market
        </h2>

        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-6">
          {displayedItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col bg-gray-700 hover:bg-purple-600 p-5 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 w-full sm:w-[48%] lg:w-[46%] text-center"
              onClick={() => broughtItem(item)}
            >
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-purple-300">
                {item.name}
              </h3>
              <div className="text-sm mb-4">
                Cost:{" "}
                <span className="font-semibold">{item.cost} Drachmas</span>
                <div className="absolute -inset-2 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500" />
              </div>
              <button className="bg-purple-400 hover:bg-purple-700 w-full text-white py-3 rounded-md text-sm sm:text-base">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameStore;
