// components/WhyVampireGame.js
import { useEffect } from "react";
import VanillaTilt from "vanilla-tilt";

export default function WhyVampireGame() {
  const features = [
    {
      title: "Rarity",
      description:
        "Each NFT is of one of the four rarities- COMMON, RARE, EPIC, and LEGENDARY. Once all the packs have been opened, no more of that NFT will be issued.",
    },
    {
      title: "Uniqueness",
      description:
        "Even if two NFTs look similar, their uniqueness can be easily verified by using the blockchain explorer.",
    },
    {
      title: "Ownership",
      description:
        "You have complete ownership over the assets that you have in your account. You are free to trade, sell, or burn your NFTs.",
    },
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
    // return () => {
    //     tiltElements.forEach((element) => {
    //         element.vanillaTilt.destroy();
    //     });
    // };
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <section className="bg-black text-white py-16">
      {" "}
      {/* Changed background to black */}
      <div className="container mx-auto px-4">
        <h2 className="text-4xl mb-8 text-center">Why Vampire Game?</h2>
        <div className="flex flex-col md:flex-row justify-around">
          {features.map((feature, index) => (
            <div
              key={index}
              className="tilt bg-gray-700 p-8 rounded-lg text-center mb-6 md:mb-0 md:mx-6" // Increased padding and margin
            >
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
