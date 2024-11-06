"use client";
import { useAuth } from "./providers/AuthProvider";
import { useState, useEffect } from "react";
import Modal from "./components/Modal";
import Navbar from "./components/navbar";
import HowToPlay from "./components/HowToPlay";
import Cards from "./components/Cards";
import WhyVampireGame from "./components/WhyVampireGame";
import VampireCursor from "./components/VampireCursor";
import SpookyLoadingScreen from "./components/SpookyLoadingScreen";

export default function Home() {
  const { user, login } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <SpookyLoadingScreen />
      ) : (
        <>
          <VampireCursor />
          <div className="relative">
            <div
              className="bg-cover bg-center min-h-screen relative"
              style={{ backgroundImage: "url('/background.jpg')" }}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <Navbar openModal={openModal} />

              {!user ? (
                <main className="flex flex-col items-center justify-center text-center min-h-screen relative z-10 pt-0">
                  <button onClick={openModal} className="play-now-button">
                    Play Now
                  </button>
                  <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onSubmit={login}
                  />
                </main>
              ) : (
                <p className="text-xl">Welcome, @{user}!</p>
              )}
            </div>

            <section id="how-to-play" className="pt-0">
              <HowToPlay />
            </section>

            <section id="cards" className="pt-0">
              <Cards />
            </section>

            <section id="why-vampire-game" className="pt-0">
              <WhyVampireGame />
            </section>

            <footer className="bg-gray-900 text-red-500 py-12 px-4 relative">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-gothic mb-4 text-glow">
                      Coffins Oath
                    </h3>
                    <p className="text-gray-400 italic">
                      Where darkness meets strategy
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-gothic mb-4 text-glow">
                      Quick Links
                    </h3>
                    <a className="block hover:text-red-300 transition-colors">
                      About
                    </a>
                    <a className="block hover:text-red-300 transition-colors">
                      Rules
                    </a>
                    <a className="block hover:text-red-300 transition-colors">
                      Support
                    </a>
                  </div>
                  <div className="text-center md:text-right">
                    <h3 className="text-2xl font-gothic mb-4 text-glow">
                      Policies
                    </h3>
                    <a className="block hover:text-red-300 transition-colors">
                      Terms of Service
                    </a>
                    <a className="block hover:text-red-300 transition-colors">
                      Privacy Policy
                    </a>
                    <a className="block hover:text-red-300 transition-colors">
                      Cookie Policy
                    </a>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-red-900/30 text-center">
                  <p className="opacity-80 hover:opacity-100 transition-opacity">
                    &copy; 2024 Coffin Oath. All Rights Reserved.
                  </p>
                </div>
              </div>

              <style jsx>{`
                .text-glow {
                  color: #a8a4a4; /* Dark red base */
                  text-shadow: 0px 0px 10px #ff0000, 0px 0px 20px #ff0000; /* Red glow effect */
                }

                footer:hover .text-glow {
                  color: #ff4500; /* Lighter red on hover */
                  text-shadow: 0px 0px 15px #ff6347, 0px 0px 30px #ff6347; /* Intensified glow on hover */
                }

                footer {
                  background-color: #231313;
                }

                footer:hover {
                  background-color: #222020;
                  transition: background-color 0.5s ease-in-out;
                }

                .font-gothic {
                  font-family: "Gothic", serif;
                }
              `}</style>
            </footer>
          </div>
        </>
      )}
    </>
  );
}
