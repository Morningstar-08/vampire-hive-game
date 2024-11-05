// "use client";
// import { useAuth } from "../providers/AuthProvider";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { UserProfile } from "../models/UserProfile";

// export default function Dashboard() {
//   const { user } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!user) {
//       router.push("/");
//     }
//   }, [user]);

//   if (!user) {
//     return <p>Loading...</p>;
//   }

//   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchUser = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setError("Not authenticated");
//         setLoading(false);
//         return;
//       }
//       const res = await fetch("/api/user_profile", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }
//       const data = await res.json();
//       setUserProfile(data);
//       setError(null);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching user profile:", err, error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, [user]);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
//       <p>Welcome to your dashboard, @{user}!</p>
//       {/* Add your dashboard components here */}
//       <div className="container mx-auto p-4">
//         <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
//         {userProfile ? (
//           <div>
//             <p className="text-xl">Welcome, @{userProfile.username}!</p>
//             <p className="text-lg">Wins: {userProfile.wins}</p>
//             <p className="text-lg">Losses: {userProfile.losses}</p>
//             <p className="text-lg">Inventory: {userProfile.inventory}</p>
//             {/* <p className="text-lg">NftCards: {userProfile.nftCards}</p> */}
//             <p className="text-lg">Drachmas: {userProfile.drachmas}</p>
//             {/* Add more data here */}
//           </div>
//         ) : (
//           <p>No user data found.</p>
//         )}
//       </div>
//       {/* Add your dashboard components here */}
//       <button onClick={() => router.push("/dashboard/play")}>Play game</button>
//     </div>
//   );
// }

"use client";
import { useAuth } from "../providers/AuthProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InventoryCard from "../components/InventoryCard";
import ShopCard from "../components/ShopCard";
import { UserProfile } from "../models/UserProfile";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  if (!user) {
    return <p>Loading...</p>;
  }

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    fetchUser();
  }, [user]);

  if (loading) return <div>Loading...</div>;

  return (
    <div
      className="min-h-screen flex flex-col relative px-8 py-6"
      style={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)),
          url('/dashboard.jpg')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header - Top Left */}
      <h1
        className="text-4xl font-medium text-white mb-12 animate-glow absolute top-6 left-8"
        style={{
          textShadow:
            "0 0 10px rgba(255,0,0, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)",
        }}
      >
        Welcome, @{user}!
      </h1>

      {/* Main content container */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Left side - Inventory */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500" />
          <InventoryCard inventory={userProfile?.inventory || []} />
        </div>

        {/* Center - Start Game Button */}
        <div className="flex flex-col items-center justify-center">
          <button
            className="px-16 py-8 text-2xl text-white font-bold rounded-full bg-gradient-to-br from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition duration-300 shadow-lg hover:shadow-red-500/50 transform hover:scale-110 animate-pulse border border-red-400/30"
            onClick={() => router.push("/dashboard/play")}
            style={{
              boxShadow: "0 0 20px rgba(255,0,0,0.3)",
            }}
          >
            Start Game
          </button>
        </div>

        {/* Right side - Shop */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500" />
          <ShopCard />
        </div>
      </div>
    </div>
  );
}
