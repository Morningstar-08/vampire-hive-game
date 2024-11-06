// "use client";
// import { useAuth } from "./providers/AuthProvider";
// import { useState } from "react";
// import Modal from "./components/Modal";
// import Navbar from "./components/navbar";
// import HowToPlay from "./components/HowToPlay";
// import Cards from "./components/Cards";
// import WhyVampireGame from "./components/WhyVampireGame";
// import VampireCursor from "./components/VampireCursor";

// export default function Home() {
//   const { user, login } = useAuth();
//   const [isModalOpen, setModalOpen] = useState(false);

//   const openModal = () => setModalOpen(true);
//   const closeModal = () => setModalOpen(false);

//   return (
//     <>
//       <VampireCursor />
//       <div>
//         <div
//           className="bg-cover bg-center min-h-screen relative"
//           style={{ backgroundImage: "url('/background.jpg')" }}
//         >
//           <Navbar openModal={openModal} />
//           <div className="absolute inset-0 bg-black opacity-50"></div>

//           {!user ? (
//             <>
//               <main className="flex flex-col items-center justify-center text-center min-h-screen relative z-10 pt-16">
//                 <button
//                   onClick={openModal} // Open the modal on button click
//                   className="play-now-button"
//                 >
//                   Play Now
//                 </button>
//                 <Modal
//                   isOpen={isModalOpen}
//                   onClose={closeModal}
//                   onSubmit={login}
//                 />
//               </main>
//             </>
//           ) : (
//             <p className="text-xl">Welcome, @{user}!</p>
//           )}
//         </div>

//         {/* Sections */}
//         <section id="how-to-play" className="pt-16">
//           <HowToPlay />
//         </section>

//         <section id="cards" className="pt-16">
//           <Cards />
//         </section>

//         <section id="why-vampire-game" className="pt-16">
//           <WhyVampireGame />
//         </section>

//         {/* Footer */}
//         <footer className="footer-section bg-gray-800 text-white py-8 text-center">
//           <p>&copy; 2024 Vampire Card Game. All Rights Reserved.</p>
//           <div className="space-x-4 mt-4">
//             <a href="/terms" className="hover:text-red-400">
//               Terms of Service
//             </a>
//             <a href="/privacy" className="hover:text-red-400">
//               Privacy Policy
//             </a>
//           </div>
//         </footer>
//       </div>
//     </>
//   );
// }

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

            <footer className="bg-black text-red-500 py-12 px-4">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-gothic mb-4">Coffin's Oath</h3>
                    <p className="text-gray-400">
                      Where darkness meets strategy
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-gothic mb-4">Quick Links</h3>
                    <nav className="space-y-2">
                      <a className="block hover:text-red-400 transition-colors">
                        About
                      </a>
                      <a className="block hover:text-red-400 transition-colors">
                        Rules
                      </a>
                      <a className="block hover:text-red-400 transition-colors">
                        Support
                      </a>
                    </nav>
                  </div>
                  <div className="text-center md:text-right">
                    <h3 className="text-xl font-gothic mb-4">Legal</h3>
                    <nav className="space-y-2">
                      <a className="block hover:text-red-400 transition-colors">
                        Terms of Service
                      </a>
                      <a className="block hover:text-red-400 transition-colors">
                        Privacy Policy
                      </a>
                      <a className="block hover:text-red-400 transition-colors">
                        Cookie Policy
                      </a>
                    </nav>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-red-900/30 text-center">
                  <p>&copy; 2024 Coffin&apos;s Oath. All Rights Reserved.</p>
                </div>
              </div>
            </footer>
          </div>

          <style jsx>{`
            @keyframes float {
              0%,
              100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-10px);
              }
            }

            .animate-float {
              animation: float 4s ease-in-out infinite;
            }

            .font-gothic {
              font-family: "Gothic", serif;
            }
          `}</style>
        </>
      )}
    </>
  );
}
