"use client";
import { useState, useEffect } from "react";

interface User {
  _id: string;
  username: string;
  wins: number;
  losses: number;
  inventory: string[];
  nftCards: string[];
}

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("this is the tokenn: ", token);
      if (!token) {
        setError("Not authenticated");
        setLoading(false);
        return;
      }

      // console.log(token);

      const res = await fetch("/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // const res = await fetch("/api/profile");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();

      // Log the raw data from API
      console.log("API Response:", data);

      // Make sure data is an array
      const usersArray = Array.isArray(data) ? data : [data];

      setUsers(usersArray);

      // Use useEffect to log updated state
      setError(null);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // This useEffect will run whenever users state changes
  useEffect(() => {
    console.log("Updated users state:", users);
  }, [users]);

  // Initial fetch
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Debug render
  console.log("Rendering with users:", users);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Hey there Vampiii</h1>
      {users.length > 0 ? ( // Changed from >= 0 to > 0
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user._id} className="border p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold">{user.username}</h2>
              <div className="mt-2">
                <p>Wins: {user.wins ?? 0}</p>
                <p>Losses: {user.losses ?? 0}</p>
                <p>
                  NFT Cards:{" "}
                  {user.nftCards?.length ? user.nftCards.join(", ") : "None"}
                </p>
                <p>
                  Inventory:{" "}
                  {user.inventory?.length ? user.inventory.join(", ") : "Empty"}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No users found</p>
      )}
    </div>
  );
}
