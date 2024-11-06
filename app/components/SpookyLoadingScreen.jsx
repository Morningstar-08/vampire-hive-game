import React, { useEffect, useState } from 'react';

const EnhancedHorrorAnimation = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [bloodProgress, setBloodProgress] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    // Loading bar only
    const timer = setInterval(() => {
      setBloodProgress((prev) => (prev < 100 ? prev + 1 : prev));
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Spooky Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Spider Webs in Corners */}
        {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((position, i) => (
          <div key={`web-${i}`} className={`absolute ${position} w-32 h-32 opacity-30 animate-web-sway`}>
            <div className="absolute inset-0 border-t border-l border-gray-500 rounded-tl-full transform rotate-45" />
            <div className="absolute inset-0 border-t border-l border-gray-500 rounded-tl-full transform rotate-[60deg]" />
            <div className="absolute inset-0 border-t border-l border-gray-500 rounded-tl-full transform rotate-[75deg]" />
          </div>
        ))}
      </div>

      {/* Bats */}
      {[...Array(15)].map((_, i) => (
        <div
          key={`bat-${i}`}
          className="absolute animate-bat-fly"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${8 + Math.random() * 4}s`,
          }}
        >
          <div className="relative w-16 h-8">
            <div className="absolute w-full h-full animate-bat-wings">
              <div
                className="absolute w-full h-full bg-black"
                style={{
                  clipPath: 'polygon(0% 50%, 50% 0%, 100% 50%, 50% 100%)',
                }}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex space-x-2">
                  <div className="w-1 h-1 bg-red-600 rounded-full animate-pulse" />
                  <div className="w-1 h-1 bg-red-600 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Floating Ghosts */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`ghost-${i}`}
          className="absolute animate-ghost-float"
          style={{
            top: `${Math.random() * 70}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`,
          }}
        >
          <div className="w-16 h-20 bg-gray-200/20 rounded-t-full relative">
            <div className="absolute bottom-0 w-full">
              <div
                className="w-full h-6 bg-gray-200/20 animate-ghost-wave"
                style={{
                  clipPath: 'polygon(0% 0%, 25% 100%, 50% 0%, 75% 100%, 100% 0%)',
                }}
              />
            </div>
            <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-purple-400/50 rounded-full animate-ghost-eyes" />
            <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-purple-400/50 rounded-full animate-ghost-eyes" />
          </div>
        </div>
      ))}

      {/* Blood Drips */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={`drip-${i}`}
            className="absolute w-1 animate-blood-drip"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <div className="w-2 h-2 bg-red-800 rounded-full mb-1" />
            <div className="w-1 h-16 bg-gradient-to-b from-red-800 to-transparent" />
          </div>
        ))}
      </div>

      {/* Fog Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/5 to-transparent animate-fog mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/5 to-transparent animate-fog-reverse mix-blend-overlay" />
      </div>

      {/* Centered Content */}
      <div className="relative z-30 text-center flex flex-col items-center justify-center min-h-screen">
        <div className="mb-16">
          <h1 className="text-7xl font-bold text-red-800 mb-4 animate-horror-pulse tracking-widest">
            Coffin's Oath
          </h1>
          <p className="text-gray-400 animate-pulse text-xl font-gothic mb-6">
            The Night Awakens...
          </p>
        </div>

        {/* Centered Loading Bar */}
        <div className="relative w-96 h-8 bg-gray-900/50 rounded-lg overflow-hidden border border-red-900/30">
          <div
            className="h-full bg-gradient-to-r from-red-900 to-red-600 animate-pulse"
            style={{ width: `${bloodProgress}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm text-red-400 font-gothic tracking-widest">
              {bloodProgress}% LOADING
            </span>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes bat-fly {
            0% {
              transform: translate(0, 0) rotate(0deg) scale(1);
            }
            25% {
              transform: translate(400px, -200px) rotate(45deg) scale(0.8);
            }
            50% {
              transform: translate(800px, 0) rotate(0deg) scale(1.2);
            }
            75% {
              transform: translate(400px, 200px) rotate(-45deg) scale(0.9);
            }
            100% {
              transform: translate(0, 0) rotate(0deg) scale(1);
            }
          }

          @keyframes bat-wings {
            0%, 100% {
              transform: scaleX(1);
            }
            50% {
              transform: scaleX(0.5);
            }
          }

          @keyframes droplet {
            0%, 100% { transform: scaleY(1); opacity: 0.7; }
            50% { transform: scaleY(1.5); opacity: 1; }
          }

          @keyframes ghost-float {
            0%, 100% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(0) translateX(20px); }
            75% { transform: translateY(20px) translateX(10px); }
          }

          @keyframes ghost-wave {
            0%, 100% { transform: scaleY(1); }
            50% { transform: scaleY(0.8); }
          }

          @keyframes ghost-eyes {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }

          @keyframes web-sway {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(5deg); }
          }

          @keyframes blood-drip {
            0% { transform: translateY(-100%) scaleY(0); opacity: 0; }
            5% { transform: translateY(0) scaleY(1); opacity: 1; }
            95% { transform: translateY(100vh) scaleY(1); opacity: 1; }
            100% { transform: translateY(100vh) scaleY(0); opacity: 0; }
          }

          @keyframes fog {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </div>
  );
};

export default EnhancedHorrorAnimation;
