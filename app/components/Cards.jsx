// components/RarityCards.js
import { useEffect } from "react";

// You can use CDN or import Vanilla Tilt if you're using npm/yarn
import VanillaTilt from "vanilla-tilt";

export default function Cards() {
  // Card types for rarity
  const cardTypes = [
    { name: "Vampire", image: "/nft.jpeg" },
    { name: "Warewolf", image: "/The_Hybrid.jpg" },
    { name: "Witch", image: "/witch.jpg" },
    { name: "Human", image: "/Normal_Human.jpg" },
  ];

  // Card types for power-ups and boosters
  const powerUpCards = [
    { name: "Venoumous Fangs", image: "/Venoumous Fangs.jpg" },
    { name: "Silver Blade", image: "/Silver Blade.jpg" },
    { name: "Life Drain", image: "/Life Drain.jpg" },
    { name: "Bloodlust Surge", image: "/bloodlustsurge.jpg" },
  ];

  // Initialize Vanilla Tilt after the component mounts
  useEffect(() => {
    const tiltElements = document.querySelectorAll(".tilt");
    tiltElements.forEach((element) => {
      VanillaTilt.init(element, {
        max: 25, // Maximum tilt rotation in degrees
        speed: 400, // Speed of the tilt effect
        glare: true, // Enable glare effect
        "max-glare": 0.5, // Maximum glare effect
      });
    });

    // Cleanup on component unmount
    return () => {
      tiltElements.forEach((element) => {
        element.vanillaTilt.destroy();
      });
    };
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <section className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl mb-8 text-center">Card Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardTypes.map((card, index) => (
            <div
              key={index}
              className="tilt p-4 rounded-lg text-center"
              style={{ backgroundColor: "rgb(55, 65, 81)" }} // Updated card background color
            >
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-45 object-contain rounded-lg mb-4"
              />
              <h3 className="text-xl">{card.name}</h3>
            </div>
          ))}
        </div>

        {/* Power-Ups and Boosters Section */}
        <h2 className="text-4xl mb-8 mt-12 text-center">
          Power-Ups and Boosters
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {powerUpCards.map((card, index) => (
            <div
              key={index}
              className="tilt p-4 rounded-lg text-center"
              style={{ backgroundColor: "rgb(55, 65, 81)" }} // Updated card background color
            >
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-45 object-contain rounded-lg mb-4"
              />
              <h3 className="text-xl">{card.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
