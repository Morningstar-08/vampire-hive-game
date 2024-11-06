// export default function HowToPlay() {
//   return (
//     <section
//       id="how-to-play"
//       className="bg-[rgb(9,9,10)] text-white py-16 flex justify-center items-center"
//     >
//       <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
//         {/* Left side: Text */}
//         <div className="md:w-1/2 text-center md:text-left">
//           <h2 className="text-5xl mb-5 text-red-500">How to Play</h2>
//           <p className="text-lg">
//             Welcome to the Vampire Card Game! Here’s how you play:
//           </p>
//           <ul className="list-disc list-inside text-gray-600 mt-4 text-lg">
//             <li>Each player starts with a deck of cards.</li>
//             <li>Players draw cards at the beginning of each round.</li>
//             <li>Use your cards strategically to attack or defend.</li>
//             <li>First player to defeat their opponent wins!</li>
//           </ul>
//         </div>

//         {/* Right side: Image */}
//         <div className="md:w-1/2 mt-8 md:mt-0 md:ml-8 flex justify-center">
//           <img
//             src="/how-to-play.png"
//             alt="How to Play"
//             className="w-full max-w-xs md:max-w-md rounded-lg"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

import { useEffect, useState } from "react";

export default function HowToPlay() {
  const [isVisible, setIsVisible] = useState(false);

  // Use Intersection Observer to detect when the section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting); // Set the visibility based on whether the section is in view
        });
      },
      { threshold: 0.3 } // Trigger the observer when 30% of the section is visible
    );

    const target = document.getElementById("how-to-play");
    observer.observe(target);

    // Cleanup the observer on component unmount
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-to-play"
      className={`bg-cover bg-center text-white py-16 flex justify-center items-center relative ${
        isVisible ? "animate-fadeIn" : ""
      }`}
      style={{ backgroundImage: "url('/how-to-play.jpg')" }}
    >
      {/* Overlay effect */}
      <div className="absolute inset-0 bg-black opacity-80"></div>

      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
        {/* Left side: Text */}
        <div
          className={`md:w-1/2 text-center md:text-left ${
            isVisible
              ? "text-4xl font-bold text-red-500 scale-105 transition-all duration-500"
              : ""
          }`}
        >
          <h2 className="mb-5">How to Play</h2>
          <p className="text-lg mb-6">
            Welcome to the Vampire Card Game! Here’s how you play:
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-8 text-lg space-y-4">
            <li>
              Stake Your Assets: To start, stake one of your vampire NFT cards
              and some drachmas. This adds excitement as you risk your assets
              for a chance to win.
            </li>
            <li>
              Win/Loss Impact: The value of your vampire NFT card is influenced
              by your win/loss record. Winning increases its value, while losing
              decreases it.
            </li>
            <li>
              Card Metadata: Your card’s performance (wins/losses) is tracked on
              the Hive blockchain, affecting its market value and demand among
              players.
            </li>
            <li>
              Game Objective: Your goal is to kill 3 Human cards while avoiding
              health loss. Each turn, flip a card from the deck, which may
              contain Werewolves (attack), Witches (heal or attack), or Humans
              (kill for victory).
            </li>
            <li>
              Deck Dynamics: As you play, the deck is shuffled after every turn,
              and cards are replaced, requiring strategic planning to succeed
              while keeping your health intact.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
