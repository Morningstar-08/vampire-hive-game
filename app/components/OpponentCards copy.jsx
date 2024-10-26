import React, { useEffect, useState } from "react";
import PlayerCard from "../components/PlayerCard";

const HUMANS = [
  { name: "Normal Human 1", health: 0 },
  { name: "Normal Human 2", health: 0 },
  { name: "Homid", health: 20 },
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

const OpponentCards = () => {
  const [opponentCards, setOpponentCards] = useState([]);
  const [player, setPlayer] = useState({ health: 100, damage: 10 });
  const [humansDefeated, setHumansDefeated] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [canFlip, setCanFlip] = useState(true);
  const [lastFlippedIndex, setLastFlippedIndex] = useState(null);
  const [cardsToReplace, setCardsToReplace] = useState([]);
  const [powerUps, setPowerUps] = useState([]);

  useEffect(() => {
    initializeCards();
  }, []);

  useEffect(() => {
    if (player.health <= 0) {
      setGameOver(true);
      console.log("Game Over: Player lost");
      alert("Game Over! You lost.");
    }
  }, [player.health]);

  const initializeCards = () => {
    // const selectedHumans = getRandomElements(HUMANS, 3);
    // const selectedWerewolves = getRandomElements(WEREWOLVES, 4);
    // const selectedWitches = getRandomElements(WITCHES, 3);

    // testing
    const selectedHumans = getRandomElements(HUMANS, 9);
    const selectedWerewolves = getRandomElements(WEREWOLVES, 0);
    const selectedWitches = getRandomElements(WITCHES, 1);

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

  const handleHealthChange = (newHealth) => {
    setPlayer((prev) => ({ ...prev, health: newHealth }));
  };

  const handleDamageChange = (newDamage) => {
    setPlayer((prev) => ({ ...prev, damage: newDamage }));
  };

  const handleHumanCard = (card, index) => {
    setPlayer((prev) => {
      const newHealth = prev.health + card.health;
      console.log("Player healed:", card.health, "New health:", newHealth);
      return { ...prev, health: newHealth };
    });
    setHumansDefeated((prev) => prev + 1);
    setCardsToReplace((prev) => [...prev, index]);
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

  const checkGameOver = () => {
    if (humansDefeated === 3) {
      setGameOver(true);
      setPlayer((prev) => ({ ...prev, wins: prev.wins + 1 }));
      console.log("Game Over: Player won");
      alert("Congratulations! You won!");
    } else if (player.health <= 0) {
      setGameOver(true);
      setPlayer((prev) => ({ ...prev, losses: prev.losses + 1 }));
      console.log("Game Over: Player lost");
      alert("Game Over! You lost.");
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
