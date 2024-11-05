// "use client";
import React, { useEffect, useState } from "react";
import { Client, PrivateKey } from "@hiveio/dhive";
import PlayerCard from "./PlayerCard";
import { useAuth } from "../providers/AuthProvider";
// Create a client instance
const client = new Client([
  "https://api.hive.blog",
  "https://api.hivekings.com",
  "https://api.openhive.network",
]);

//NOT WORKING
export const submitGameResultToMongo = async (gameOver) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("/api/update_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        wins: gameOver,
        losses: !gameOver,
        inventory: ["dummy"],
        nftCard: ["test"],
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to update stats: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Stats updated:", data);
  } catch (error) {
    console.error("Error updating game result:", error);
    throw error;
  }
};

// Function to broadcast game results
// const broadcastGameResult = async (
//   username,
//   postingKey,
//   nftCard,
//   gameResult
// ) => {
//   try {
//     // Convert WIF to PrivateKey object if it's a string
//     const privateKey =
//       typeof postingKey === "string"
//         ? PrivateKey.fromString(postingKey)
//         : postingKey;

//     // Prepare the custom JSON data
//     const customJsonOperation = [
//       "custom_json",
//       {
//         required_auths: [],
//         required_posting_auths: [username],
//         id: "vampireTesting",
//         json: JSON.stringify({
//           app: "vampire_game",
//           player: username,
//           nft_card: nftCard,
//           result: gameResult,
//           timestamp: new Date().toISOString(),
//         }),
//       },
//     ];

//     // Broadcast the transaction
//     const result = await client.broadcast.sendOperations(
//       [customJsonOperation],
//       privateKey
//     );

//     console.log("Transaction broadcast success:", result);
//     return result;
//   } catch (error) {
//     console.error("Transaction broadcast error:", error);
//     throw error;
//   }
// };

const broadcastWithKeychain = async (user, nftCard, gameResult) => {
  const customJsonData = {
    app: "vampire_game",
    player: user,
    nft_card: nftCard,
    result: gameResult,
    timestamp: new Date().toISOString(),
  };

  window.hive_keychain.requestCustomJson(
    user,
    "vampireTesting",
    "Posting",
    JSON.stringify(customJsonData),
    "Broadcast Game Result",
    function (response) {
      if (response.success) {
        alert("Game result broadcasted successfully via Keychain!");
      } else {
        alert("Failed to broadcast game result via Keychain.");
      }
    }
  );
};

const werewolves_list = [
  "The Hybrid",
  "Lycan",
  "Shapeshifter",
  "Poor Sod",
  "Primordial Werewolf",
];

const healthPowerups = [
  "Shadow Veil",
  "Summon Bats",
  "Silver Blade",
  "Life Drain",
  "Crimson Elixir",
  "Vampiric Fury",
  "Bloodlust Surge",
  "Burn Card$",
  "Venomous Fangs$",
  "Mirror Curse$",
];

const HUMANS = [
  { name: "Normal_Human", health: 0 },
  { name: "Normal_Human", health: 0 },
  { name: "Normal_Human", health: 0 },
  // { name: "Homid", health: 20 },
];

const WEREWOLVES = [
  { name: "The_Hybrid", health: 40, damage: 20, type: "damaging" },
  { name: "Lycan", health: 20, damage: 10, type: "damaging" },
  { name: "Shapeshifter", health: 20, damage: 10, type: "damaging" },
  { name: "Poor_Sod", health: 15, damage: 10, type: "damaging" },
  { name: "Primordial_Werewolf", health: 40, damage: 15, type: "damaging" },
];

const WITCHES = [
  { name: "Elemental_Witch", health: 30, damage: 10, type: "damaging" },
  { name: "Green_Witch", health: 25, damage: 7, type: "damaging" },
  { name: "Cosmic_Witch", health: 35, damage: 8, type: "neutral" },
  { name: "Kitchen_Witch", health: 20, heal: 10, type: "healing" },
  { name: "Hedge_Witch", health: 25, heal: 15, type: "healing" },
];

const getRandomElements = (array, count) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const OpponentCard = ({ details, canFlip, onFlip }) => {
  return (
    <div
      className={`border p-2 rounded h-32 w-24 ${
        details.flipped ? "bg-red-600" : "bg-red-800"
      } cursor-pointer`}
      onClick={() => canFlip && onFlip()}
    >
      {details.flipped ? (
        <div className="text-xs">
          <p className="font-bold">{details.name}</p>
          <p>Health: {details.health}</p>
          {details.damage && <p>Damage: {details.damage}</p>}
          {details.heal && <p>Heal: {details.heal}</p>}
        </div>
      ) : (
        <p className="text-center">?</p>
      )}
    </div>
  );
};

const Card = ({ details, canFlip, onFlip }) => {
  return (
    <div
      className={`relative transform transition-all duration-300 flex-shrink-0 ${
        canFlip ? "hover:scale-105 cursor-pointer" : ""
      }`}
      onClick={() => canFlip && onFlip()}
    >
      <div className="w-32 h-48 rounded-xl overflow-hidden backdrop-blur-sm border border-purple-500/30 relative">
        <div
          className={`w-full h-full transition-all duration-500 ${
            details.flipped ? "bg-purple-900/80" : "bg-purple-800/60"
          }`}
        >
          {details.flipped ? (
            <div
              className="p-2 text-center text-purple-100 h-full flex flex-col justify-center items-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4)), url('/${details.name}.jpg')`,
                backgroundSize: "cover",
              }}
            >
              <p className="font-bold mb-2 text-sm bg-gradient-to-r from-purple-400 to-pink-300 text-transparent bg-clip-text">
                {details.name}
              </p>
              <div className="space-y-1">
                <p className="text-sm flex items-center justify-center space-x-1">
                  <span className="text-purple-300">Health:</span>
                  <span className="font-semibold">{details.health}</span>
                </p>
                {details.damage && (
                  <p className="text-sm flex items-center justify-center space-x-1">
                    <span className="text-purple-300">Damage:</span>
                    <span className="font-semibold text-red-400">
                      {details.damage}
                    </span>
                  </p>
                )}
                {details.heal && (
                  <p className="text-sm flex items-center justify-center space-x-1">
                    <span className="text-purple-300">Heal:</span>
                    <span className="font-semibold text-green-400">
                      {details.heal}
                    </span>
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col justify-center items-center">
              <div className="w-12 h-12 rounded-full bg-purple-700/50 border border-purple-400/30 flex items-center justify-center mb-2">
                <span className="text-xl text-purple-300">?</span>
              </div>
              <p className="text-purple-300 text-sm">Card</p>
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent pointer-events-none" />
      </div>
      <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 -z-10 blur-sm" />
    </div>
  );
};

const OpponentCards = ({ boosterPurchased }) => {
  const { user } = useAuth();
  const [opponentCards, setOpponentCards] = useState([]);
  const [humansDefeated, setHumansDefeated] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [canFlip, setCanFlip] = useState(false);
  const [lastFlippedIndex, setLastFlippedIndex] = useState(null);
  const [cardsToReplace, setCardsToReplace] = useState([]);
  const [powerUps, setPowerUps] = useState([]);
  const [activePowerups, setActivePowerups] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [player, setPlayer] = useState({
    health: 100,
    damage: 10,
    wins: 0,
    losses: 0,
    humansDefeated: 0,
  });
  let updatedPlayerHealth = player.health;

  useEffect(() => {
    initializeCards();
    setGameStarted(true);
  }, []);

  const initializeCards = () => {
    const selectedHumans = getRandomElements(HUMANS, 3);
    const selectedWerewolves = getRandomElements(WEREWOLVES, 4);
    const selectedWitches = getRandomElements(WITCHES, 3);

    const allCards = [
      ...selectedHumans,
      ...selectedWerewolves,
      ...selectedWitches,
    ];
    const shuffledCards = allCards.sort(() => 0.5 - Math.random());
    setOpponentCards(
      shuffledCards.map((card) => ({ ...card, flipped: false }))
    );
    console.log("Initial cards:", shuffledCards);
  };

  const handleGameOver = async (isWin) => {
    // Only submit game result if the game has actually started and ended
    if (!gameStarted || gameOver) {
      return;
    }

    try {
      // await submitGameResultToMongo(isWin);
      setPlayer((prev) => ({
        ...prev,
        wins: isWin ? (prev.wins || 0) + 1 : prev.wins,
        losses: !isWin ? (prev.losses || 0) + 1 : prev.losses,
      }));
      setGameOver(true); // Set game over after successful submission
      const gameResult = isWin ? "win" : "lose";
      await broadcastWithKeychain(user, "test-vamp123", gameResult);
    } catch (error) {
      console.error("Failed to handle game over:", error);
      // Only show alert if game was actually played
      if (gameStarted) {
        alert("Failed to update game statistics. Please try again.");
      }
    }
  };

  const shuffleDeck = () => {
    setOpponentCards((prevCards) => {
      const deadCards = prevCards.filter(
        (card) => card.health === 0 && card.type === "damaging"
      );
      const liveCards = prevCards.filter(
        (card) => card.health > 0 || card.type !== "damaging"
      );
      const shuffledLiveCards = liveCards
        .sort(() => 0.5 - Math.random())
        .map((card) => ({ ...card, flipped: false }));
      const newDeck = [...deadCards, ...shuffledLiveCards];
      console.log("Shuffled deck:", newDeck);
      return newDeck;
    });
  };

  const replaceCards = () => {
    const allCards = [...HUMANS, ...WEREWOLVES, ...WITCHES];
    const updatedCards = [...opponentCards];

    cardsToReplace.forEach((index) => {
      const newCard = getRandomElements(allCards, 1)[0];
      updatedCards[index] = { ...newCard, flipped: false };
      console.log("Card replaced at index", index, "New card:", newCard);
    });

    setOpponentCards(updatedCards);
    setCardsToReplace([]);
  };

  const removePowerup = (powerup) => {
    setActivePowerups((prevPowerups) =>
      prevPowerups.filter((p) => p !== powerup)
    );
  };

  const handleFlip = (index) => {
    if (!canFlip || gameOver) return;

    const card = opponentCards[index];
    const updatedCards = [...opponentCards];
    updatedCards[index] = { ...card, flipped: true };
    setOpponentCards(updatedCards);
    setLastFlippedIndex(index);

    console.log("Card flipped:", card);

    if (
      !werewolves_list.includes(card.name) &&
      (activePowerups.includes("Silver Blade") ||
        activePowerups.includes("Crimson Elixir") ||
        activePowerups.includes("Shadow Veil"))
    ) {
      console.log(activePowerups[0], "removed wo effect");
      removePowerup(activePowerups[0]);
    }

    if (
      !(card.type === "damaging") &&
      (activePowerups.includes("Burn Card$") ||
        activePowerups.includes("Mirror Curse$") ||
        activePowerups.includes("Venomous Fangs$") ||
        activePowerups.includes("Life Drain") ||
        activePowerups.includes("Summon Bats"))
    ) {
      console.log(activePowerups[0], "removed wo effect");
      removePowerup(activePowerups[0]);
    }

    if (card.name.includes("Human") && card.name !== "Homid") {
      handleHumanCard(card, index);
    } else if (card.name === "Homid") {
      handleHomidCard(card, index);
    } else if (card.type === "damaging") {
      handleDamagingCard(card, index);
    } else if (card.type === "healing") {
      handleHealingCard(card, index);
    }

    setCanFlip(false);
    checkGameOver();
  };

  const handleHumanCard = (card, index) => {
    if (activePowerups.includes("Bloodlust Surge")) {
      console.log("bloodlust healing card function");
      player.damage = player.damage + 1;
      removePowerup(activePowerups[0]);
    }
    const newHumansDefeated = humansDefeated + 1;
    setPlayer((prev) => {
      const newHealth = prev.health + card.health;
      console.log("Player healed:", card.health, "New health:", newHealth);
      return { ...prev, health: newHealth, humansDefeated: newHumansDefeated };
    });

    setHumansDefeated((prev) => prev + 1);
    setCardsToReplace((prev) => [...prev, index]);
    if (newHumansDefeated === 3) {
      handleGameOver(true);
    }
  };

  const handleHomidCard = (card, index) => {
    setPlayer((prev) => {
      const newDamage = prev.damage + 5;
      console.log("Player damage increased by 5. New damage:", newDamage);
      return { ...prev, damage: newDamage };
    });
    setCardsToReplace((prev) => [...prev, index]);
  };

  let updatedOppCardHealth;
  const handlePowerupEffect = (card) => {
    updatedOppCardHealth = card.health;
    if (activePowerups.includes("Shadow Veil")) {
      console.log("shadow veil: no effect on player card");
      updatedPlayerHealth = player.health;
      updatedOppCardHealth = card.health - player.damage;
    } else if (activePowerups.includes("Life Drain")) {
      console.log("life drain: steals 10% health from enemy");
      const percentage = 0.1 * updatedOppCardHealth;
      updatedPlayerHealth = updatedPlayerHealth + percentage;
      updatedOppCardHealth = updatedOppCardHealth - percentage;
    } else if (activePowerups.includes("Summon Bats")) {
      console.log("summon bats: reduces enemy damage by 15%");
      updatedPlayerHealth = updatedPlayerHealth - 0.85 * card.damage;
      updatedOppCardHealth = card.health - player.damage;
    } else if (activePowerups.includes("Crimson Elixir")) {
      if (werewolves_list.includes(card.name)) {
        console.log(
          "Crimson Elixir: reduces damage by 30 percent if next card is a werewolf"
        );
        updatedPlayerHealth = updatedPlayerHealth - 0.7 * card.damage;
        updatedOppCardHealth = card.health - player.damage;
      } else {
        console.log("crimson elixer gone to waste");
        updatedPlayerHealth = updatedPlayerHealth - card.damage;
        updatedOppCardHealth = card.health - player.damage;
      }
    } else if (activePowerups.includes("Silver Blade")) {
      if (werewolves_list.includes(card.name)) {
        console.log("silver blade: damage done increased by 5");
        updatedPlayerHealth = updatedPlayerHealth - card.damage;
        updatedOppCardHealth = card.health - (player.damage + 5);
      } else {
        console.log("silver blade gone to waste");
        updatedPlayerHealth = updatedPlayerHealth - card.damage;
        updatedOppCardHealth = card.health - player.damage;
      }
    } else if (activePowerups.includes("Bloodlust Surge")) {
      console.log("bloodlust gone to waste");
      updatedPlayerHealth = updatedPlayerHealth - card.damage;
      updatedOppCardHealth = card.health - player.damage;
    } else if (activePowerups.includes("Burn Card$")) {
      console.log(
        "burn card: removes a damaging card and the player gets no damage"
      );
      updatedPlayerHealth = player.health;
      updatedOppCardHealth = 0;
    } else if (activePowerups.includes("Venomous Fangs$")) {
      console.log(
        "venomous fangs: +10 damage if damaging card and takes damage too"
      );
      updatedPlayerHealth = updatedPlayerHealth - card.damage;
      updatedOppCardHealth = card.health - (player.damage + 10);
    } else if (activePowerups.includes("Mirror Curse$")) {
      console.log("mirror curse: reflects all enemy damage back at them");
      updatedPlayerHealth = player.health;
      updatedOppCardHealth = card.health - card.damage;
    }
    removePowerup(activePowerups[0]);
  };

  const handleDamagingCard = (card, index) => {
    updatedOppCardHealth = card.health;
    if (healthPowerups.every((powerup) => !activePowerups.includes(powerup))) {
      console.log("no powerup, default health updation");
      updatedPlayerHealth = player.health - card.damage;
      updatedOppCardHealth = card.health - player.damage;
    } else {
      handlePowerupEffect(card, index);
    }

    setPlayer((prev) => {
      // Check for game over due to health here
      if (updatedPlayerHealth <= 0) {
        handleGameOver(false); // Player lost
      }
      return { ...prev, health: updatedPlayerHealth };
    });

    const updatedCards = [...opponentCards];
    updatedCards[index] = {
      ...card,
      health: Math.max(0, updatedOppCardHealth),
      flipped: true,
    };
    setOpponentCards(updatedCards);
    console.log("Damaging card updated:", updatedCards[index]);
  };

  const handleHealingCard = (card, index) => {
    if (activePowerups.includes("Bloodlust Surge")) {
      console.log("bloodlust surge: damage increased by 1 for entire game");
      player.damage = player.damage + 1;
      removePowerup(activePowerups[0]);
    }

    setPlayer((prev) => {
      const newHealth = prev.health + card.heal;
      console.log("Player healed:", card.heal, "New health:", newHealth);
      return { ...prev, health: newHealth };
    });
    setCardsToReplace((prev) => [...prev, index]);
  };

  useEffect(() => {
    if (gameOver !== undefined) {
      handleGameOver(gameOver);
    }
  }, [gameOver]);

  const checkGameOver = () => {
    if (humansDefeated === 3) {
      setGameOver(true);
      handleGameOver(true);
      console.log("Game Over: Player won");
      alert("Congratulations! You won!");
    }
  };

  const handleNextTurn = () => {
    replaceCards();
    shuffleDeck();
    setCanFlip(true);
    setLastFlippedIndex(null);
    console.log("Next turn started");
  };

  useEffect(() => {
    if (boosterPurchased && boosterPurchased !== "") {
      handlePowerups();
    }
  }, [boosterPurchased]);

  const handlePowerups = () => {
    setPowerUps((prevPowerUps) => {
      return [...prevPowerUps, boosterPurchased];
    });
    // Immediately activate the booster purchased
    setActivePowerups((prev) => {
      return [...prev, boosterPurchased];
    });
    console.log(boosterPurchased, "activatedd");
  };

  useEffect(() => {
    console.log("oppcards; all powerups purchased: ", powerUps);
    console.log("active powerup: ", activePowerups);
  }, [powerUps]);

  return (
    // <div className="bg-red-950 p-4 rounded-lg">
    //   {/* Horizontal row of opponent cards */}
    //   <div className="mb-4">
    //     <div className="text-black mb-2">Opponent Cards</div>
    //     <div className="flex justify-center gap-2 overflow-x-auto">
    //       {opponentCards.map((card, index) => (
    //         <OpponentCard
    //           key={index}
    //           details={card}
    //           canFlip={
    //             canFlip &&
    //             !gameOver &&
    //             (card.health > 0 || card.type !== "damaging")
    //           }
    //           onFlip={() => handleFlip(index)}
    //         />
    //       ))}
    //     </div>
    //   </div>

    //   {/* Bottom section with player card and next turn button */}
    //   <div className="flex items-center justify-center gap-4">
    //     {/* Player Stats Card */}
    //     <div className="bg-red-800 p-3 rounded-lg shadow-lg w-48">
    //       <div className="bg-red-800 h-24 mb-2 rounded-lg flex items-center justify-center">
    //         <p className="text-gray-600 text-sm">Image Placeholder</p>
    //       </div>
    //       <h2 className="text-white text-sm font-bold mb-1">Player Stats</h2>
    //       <div className="text-sm">
    //         <p className="mb-1">Health: {player.health}</p>
    //         <p className="mb-1">Damage: {player.damage}</p>
    //         <p className="mb-1">Humans Defeated: {humansDefeated}/3</p>
    //         <p className="mb-1">Powerup: {activePowerups}</p>
    //       </div>
    //     </div>

    //     {!canFlip && !gameOver && (
    //       <button
    //         id="nextTurn"
    //         className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
    //         onClick={handleNextTurn}
    //       >
    //         Next Turn
    //       </button>
    //     )}
    //   </div>

    //   {gameOver && <div className="text-red-500 mt-4">Game Over!</div>}
    // </div>
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-black">
      <div className=" mx-auto px-4 py-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-300 text-transparent bg-clip-text drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
            Opponent Cards
          </h1>
        </div>

        {/* Opponent Cards Row */}
        <div className="mb-8">
          <div className="relative">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-purple-500/5 blur-3xl rounded-3xl" />

            {/* Cards container */}
            <div className="relative backdrop-blur-sm rounded-3xl p-3 border border-purple-500/10">
              {/* Scrollable container */}
              <div className="overflow-x-auto pb-2 hide-scrollbar">
                {/* Fixed-width container to ensure cards stay in one row */}
                <div className="flex gap-2 min-w-min mx-auto justify-center">
                  {opponentCards.map((card, index) => (
                    <Card
                      key={index}
                      details={card}
                      canFlip={
                        canFlip &&
                        !gameOver &&
                        (card.health > 0 || card.type !== "damaging")
                      }
                      onFlip={() => handleFlip(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Player Card Section */}
        {console.log(activePowerups)}
        <div className="flex justify-center mb-8">
          <PlayerCard player={player} powerUps={activePowerups} />
        </div>

        {/* Action Button */}

        {!canFlip && !gameOver && (
          <div className="flex justify-center">
            <button
              id="nextTurn"
              className="bg-purple-500 text-white px-9 py-4 rounded hover:bg-purple-700 transition-colors"
              //   className={`px-8 py-3 rounded-lg font-semibold text-white
              // ${
              //   gameOver
              //     ? "bg-purple-900/50 cursor-not-allowed"
              //     : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              // }
              // transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/50`}
              onClick={handleNextTurn}
              disabled={gameOver}
            >
              Next Turn
            </button>
          </div>
        )}
      </div>

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default OpponentCards;
