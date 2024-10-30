// "use client";
import React, { useEffect, useState } from "react";
import PlayerCard from "../components/PlayerCard";
import * as hiveTx from "hive-tx";

// export const updateWinsLoss = async () => {
//   return gameOver;
// };

export const submitGameResultToMongo = async (gameOver) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("/api/userStats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        isWin: gameOver,
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

const HUMANS = [
  { name: "Normal Human 1", health: 0 },
  { name: "Normal Human 2", health: 0 },
  { name: "Normal Human 2", health: 0 },
  // { name: "Homid", health: 20 },
];

const WEREWOLVES = [
  { name: "The Hybrid", health: 40, damage: 20, type: "damaging" },
  { name: "Lycan", health: 20, damage: 10, type: "damaging" },
  { name: "Shapeshifter", health: 20, damage: 10, type: "damaging" },
  { name: "Poor Sod", health: 15, damage: 10, type: "damaging" },
  { name: "Primordial Werewolf", health: 40, damage: 15, type: "damaging" },
];

const WITCHES = [
  { name: "Elemental Witch", health: 30, damage: 10, type: "damaging" },
  { name: "Green Witch", health: 25, damage: 7, type: "damaging" },
  { name: "Cosmic Witch", health: 35, damage: 8, type: "neutral" },
  { name: "Kitchen Witch", health: 20, heal: 10, type: "healing" },
  { name: "Hedge Witch", health: 25, heal: 15, type: "healing" },
];

const getRandomElements = (array, count) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const Card = ({ details, canFlip, onFlip }) => {
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

const OpponentCards = ({ boosterPurchased }) => {
  console.log("OpponentCards - Received boosterPurchased:", boosterPurchased); // Debug log

  useEffect(() => {
    console.log("OpponentCards - useEffect triggered with:", boosterPurchased); // Debug log

    if (boosterPurchased === "Shadow Veil") {
      console.log("Shadow Veil activated: No damage to vampire this round.");
    }
  }, [boosterPurchased]);

  const [opponentCards, setOpponentCards] = useState([]);
  const [player, setPlayer] = useState({
    health: 100,
    damage: 10,
    wins: 0,
    losses: 0,
  });
  const [humansDefeated, setHumansDefeated] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [canFlip, setCanFlip] = useState(true);
  const [lastFlippedIndex, setLastFlippedIndex] = useState(null);
  const [cardsToReplace, setCardsToReplace] = useState([]);
  const [powerUps, setPowerUps] = useState([]);
  const [nftCardPlayed, setNftCardPlayed] = useState(null); // Add for NFT Card tracking
  const [hiveCoinsStaked, setHiveCoinsStaked] = useState(0); // For Hive coins
  const [gameStarted, setGameStarted] = useState(false); // Add this state
  const [hiveCoinsWallet, setHiveCoinsWallet] = useState(100); // available hive coins in user's wallet

  useEffect(() => {
    initializeCards();
    setGameStarted(true);
  }, []);

  useEffect(() => {
    initializeCards();
  }, []);

  // useEffect(() => {
  //   if (player.health <= 0) {
  //     setGameOver(true);
  //     // submitGameResultToHive(false); // Player lost
  //     alert("Game Over! You lost.");
  //   }
  // }, [player.health]);

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

  // Submit the game result to hive blockchain
  const submitGameResultToHive = async () => {
    try {
      const game = {
        wins: 1,
        losses: 2,
        nftCardUsed: "TestingVampire",
      };
      const operations = [
        [
          "custom_json",
          {
            required_auths: [],
            required_posting_auths: ["kammeows"],
            id: "vampireTesting", //to identify the card, like find it later on
            json: JSON.stringify(game),
          },
        ],
      ];
      const tx = new hiveTx.Transaction();
      await tx.create(operations);

      const privateKey = hiveTx.PrivateKey.from(
        process.env.NEXT_PUBLIC_HIVE_POSTING_KEY
      );
      await tx.sign(privateKey);
      const result = await tx.broadcast();
      console.log(result);
      if (result && result.id) {
        console.log("Transaction successful:", result);
        return result;
      } else {
        console.error("Transaction failed:", result);
        throw new Error("Transaction failed to broadcast");
      }
    } catch (error) {
      console.error("Error submitting game result:", error);
    }
  };

  // const handleGameOver = async (gameOver) => {
  //   await submitGameResultToMongo(gameOver);
  // };

  const handleGameOver = async (isWin) => {
    // Only submit game result if the game has actually started and ended
    if (!gameStarted || gameOver) {
      return;
    }

    try {
      await submitGameResultToMongo(isWin);
      setPlayer((prev) => ({
        ...prev,
        wins: isWin ? (prev.wins || 0) + 1 : prev.wins,
        losses: !isWin ? (prev.losses || 0) + 1 : prev.losses,
      }));
      setGameOver(true); // Set game over after successful submission
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

  const handleFlip = (index) => {
    if (!canFlip || gameOver) return;

    const card = opponentCards[index];
    const updatedCards = [...opponentCards];
    updatedCards[index] = { ...card, flipped: true };
    setOpponentCards(updatedCards);
    setLastFlippedIndex(index);

    console.log("Card flipped:", card);

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
    setPlayer((prev) => {
      const newHealth = prev.health + card.health;
      console.log("Player healed:", card.health, "New health:", newHealth);
      return { ...prev, health: newHealth };
    });
    const newHumansDefeated = humansDefeated + 1;

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

  const handleDamagingCard = (card, index) => {
    const updatedPlayerHealth = player.health - card.damage;
    const updatedCardHealth = card.health - player.damage;

    setPlayer((prev) => {
      const newHealth = Math.max(0, updatedPlayerHealth);
      console.log("Player took damage:", card.damage, "New health:", newHealth);
      // Check for game over due to health here
      if (newHealth <= 0) {
        handleGameOver(false); // Player lost
      }
      return { ...prev, health: newHealth };
    });

    const updatedCards = [...opponentCards];
    updatedCards[index] = {
      ...card,
      health: Math.max(0, updatedCardHealth),
      flipped: true,
    };
    setOpponentCards(updatedCards);
    console.log("Damaging card updated:", updatedCards[index]);
  };

  const handleHealingCard = (card, index) => {
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

  return (
    <div className="bg-red-950 p-4 rounded-lg">
      <div className="text-black mb-2">Opponent Cards</div>
      <div className="grid grid-cols-5 gap-2">
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

      <div className="mt-4">
        <h2 className="text-white">Player Stats</h2>
        <p>Health: {player.health}</p>
        <p>Damage: {player.damage}</p>
        <p>Humans Defeated: {humansDefeated}/3</p>
      </div>

      {!canFlip && !gameOver && (
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleNextTurn}
        >
          Next Turn
        </button>
      )}

      {gameOver && <div className="text-red-500 mt-4">Game Over!</div>}
    </div>
  );
};

export default OpponentCards;
