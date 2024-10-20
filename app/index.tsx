// page.tsx
"use client";

import Navbar from "./components/navbar";
import HowToPlay from "./components/HowToPlay";
import Cards from "./components/Cards";
import WhyVampireGame from "./components/WhyVampireGame";
import { useState } from "react";


export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Navbar />

      <div
        className="bg-cover bg-center min-h-screen relative"
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <main className="flex flex-col items-center justify-center text-center min-h-screen relative z-10 pt-16">
          <button
            onClick={() => setIsModalOpen(true)} // Open the modal on button click
            className="play-now-button"
          >
            Play Now
          </button>
        </main>
      </div>

      {/* Sections */}
      <section id="how-to-play" className="pt-16">
        <HowToPlay />
      </section>

      <section id="cards" className="pt-16">
        <Cards />
      </section>

      <section id="why-vampire-game" className="pt-16">
        <WhyVampireGame />
      </section>



      {/* Footer */}
      <footer className="footer-section bg-gray-800 text-white py-8 text-center">
        <p>&copy; 2024 Vampire Card Game. All Rights Reserved.</p>
        <div className="space-x-4 mt-4">
          <a href="/terms" className="hover:text-red-400">
            Terms of Service
          </a>
          <a href="/privacy" className="hover:text-red-400">
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
}
