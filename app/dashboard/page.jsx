"use client";
import { useAuth } from "../providers/AuthProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InventoryCard from "../components/InventoryCard";
import ShopCard from "../components/ShopCard";
import GameHistory from "../components/GameHistory";
import NFTCard from "../components/NFTCard";
import VampireCursor from "../components/VampireCursor";
import EnhancedHorrorAnimation from "../components/SpookyLoadingScreen";

const UserStats = ({ username, hiveCoins, drachmas }) => (
  <div className="max-w-4xl m-8 relative bg-gray-900/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 bg-purple-900/50 rounded-full border border-purple-500/30" />
      <span className="text-2xl font-bold text-purple-100">{username}</span>
    </div>
    <div className="space-y-3">
      <div className="flex justify-between text-base">
        <span className="text-gray-300">Hive Coins:</span>
        <span className="text-purple-300 font-medium">{hiveCoins}</span>
      </div>
      <div className="flex justify-between text-base">
        <span className="text-gray-300">Drachmas:</span>
        <span className="text-purple-300 font-medium">{drachmas}</span>
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   if (!user) {
  //     router.push("/");
  //   }
  // });

  // if (!user) {
  //   return <p>Loading...</p>;
  // }

  const [userProfile, setUserProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Not authenticated");
          setLoading(false);
          return;
        }
        const res = await fetch("/api/user_profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setUserProfile(data);
        setError(null);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user profile:", err, error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [user, router]);

  if (loading)
    return (
      <div>
        {" "}
        <EnhancedHorrorAnimation />{" "}
      </div>
    );

  const mockData = {
    hiveCoins: 1000,
    drachmas: 500,
  };

  return (
    // <div
    //   className="min-h-screen flex flex-col relative px-8 py-6"
    //   style={{
    //     backgroundImage: `
    //       linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)),
    //       url('/dashboard.jpg')
    //     `,
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //   }}
    // >
    //   {/* Header - Top Left */}
    //   <h1
    //     className="text-4xl font-medium text-white mb-12 animate-glow absolute top-6 left-8"
    //     style={{
    //       textShadow:
    //         "0 0 10px rgba(255,0,0, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)",
    //     }}
    //   >
    //     Welcome, @{user}!
    //   </h1>

    //   {/* Main content container */}
    //   <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-12">
    //     {/* Left side - Inventory */}
    //     <div className="relative group">
    //       <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500" />
    //       <InventoryCard inventory={userProfile?.inventory || []} />
    //     </div>

    //     {/* Center - Start Game Button */}
    //     <div className="flex flex-col items-center justify-center">
    //       <button
    //         className="px-16 py-8 text-2xl text-white font-bold rounded-full bg-gradient-to-br from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition duration-300 shadow-lg hover:shadow-red-500/50 transform hover:scale-110 animate-pulse border border-red-400/30"
    //         onClick={() => router.push("/dashboard/play")}
    //         style={{
    //           boxShadow: "0 0 20px rgba(255,0,0,0.3)",
    //         }}
    //       >
    //         Start Game
    //       </button>
    //     </div>

    //     {/* Right side - Shop */}
    //     <div className="relative group">
    //       <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500" />
    //       <ShopCard />
    //     </div>
    //   </div>
    // </div>

    <div
      className="flex flex-col items-center justify-center px-4 py-6 w-screen h-screen overflow-hidden"
      style={{
        backgroundImage: `
        linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), 
        url('/dashboard.jpg')
      `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <VampireCursor />
      <div className=" min-w-[100%] h-full grid grid-cols-[1fr_0.8fr_1fr] gap-8">
        {/* Left Column */}
        <div className="space-y-10 -ml-4">
          <UserStats
            username={user}
            hiveCoins={mockData.hiveCoins}
            drachmas={mockData.drachmas}
          />
          <GameHistory />
        </div>

        {/* Center Column */}
        <div className="flex flex-col items-center justify-center gap-8">
          <NFTCard />

          {/* Start Game Button */}
          <button
            className="px-10 py-4 text-2xl text-white font-bold rounded-full bg-gradient-to-br from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition duration-300 shadow-lg hover:shadow-red-500/50 transform hover:scale-110 animate-pulse border border-red-400/30"
            onClick={() => router.push("/dashboard/play")}
            style={{
              boxShadow: "0 0 20px rgba(255,0,0,0.3)",
            }}
          >
            Start Game
          </button>
        </div>

        {/* Right Column */}
        <div className="space-y-10 -mr-4">
          <InventoryCard inventory={userProfile?.inventory} />
          <ShopCard />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-red-500/20 to-transparent pointer-events-none"></div>

      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-500/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
