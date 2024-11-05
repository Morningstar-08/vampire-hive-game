import { useState } from "react";

const NFTCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated border effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-red-500 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-x"></div>

        <div className="relative w-72 h-96 rounded-xl bg-gradient-to-b from-black/60 to-purple-900/30 backdrop-blur-sm border border-purple-500/20 p-3 overflow-hidden">
          {/* Glowing corner accents */}
          <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-purple-500 opacity-40 blur-md"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-red-500 opacity-40 blur-md"></div>

          {/* Card content */}
          <div className="relative h-full flex flex-col">
            {/* NFT Image container */}
            <div className="relative w-full h-3/4 rounded-lg overflow-hidden mb-4 border border-purple-500/30">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-purple-900/40"></div>
              {/* Placeholder for NFT image */}
              <img
                src="/nft.jpeg"
                alt="NFT Character"
                className="w-full h-full object-cover"
              />

              {/* Floating power orbs */}
              <div
                className={`absolute -top-2 -right-2 w-12 h-12 rounded-full bg-purple-500/20 backdrop-blur-sm border border-purple-500/40 transition-all duration-500 ${
                  isHovered ? "animate-pulse" : ""
                }`}
              ></div>
              <div
                className={`absolute -bottom-2 -left-2 w-12 h-12 rounded-full bg-red-500/20 backdrop-blur-sm border border-red-500/40 transition-all duration-500 ${
                  isHovered ? "animate-pulse" : ""
                }`}
              ></div>
            </div>

            {/* Card title */}
            <h3
              className="text-2xl font-gothic text-center text-purple-200 mb-2"
              style={{ textShadow: "0 0 10px rgba(147, 51, 234, 0.5)" }}
            >
              Powers
            </h3>

            {/* Subtitle with animated gradient */}
            <div className="relative">
              <p className="text-sm text-center text-gray-400 animate-pulse">
                choose nft card
              </p>
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            </div>

            {/* Power level indicators */}
            <div className="mt-auto space-y-2">
              <div className="h-1 w-full bg-gradient-to-r from-purple-900 via-red-700 to-purple-900 rounded-full animate-pulse"></div>
              <div className="h-1 w-3/4 bg-gradient-to-r from-purple-900 via-red-700 to-purple-900 rounded-full animate-pulse delay-75"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
