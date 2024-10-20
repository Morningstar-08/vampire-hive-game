"use client";
import { useHiveKeychainAuth } from "../auth/route";
import { useState } from "react";
import OpponentCards from "../../components/OpponentCards";
import GameStore from "../../components/GameStore";
// import PlayerCard from "../../components/PlayerCard";

export default function Home() {
  // const {
  //   username,
  //   login,
  //   getUserDetails,
  //   logOut,
  //   wallet,
  //   isKeychainInstalled,
  // } = useHiveKeychainAuth();

  const [drachmas, setDrachmas] = useState(100);
  const [player, setPlayer] = useState({
    name: "Damon Salvatore",
    health: 100,
    damage: 10,
    wins: 0,
    losses: 0,
  });
  const [powerUps, setPowerUps] = useState([]);

  // const buyItem = (item) => {
  //   if (drachmas >= item.cost) {
  //     setDrachmas(drachmas - item.cost);
  //     setPowerUps([...powerUps, item]);
  //   }
  // };

  return (
    <div className=" flex items-center h-screen ">
      <div className="p-8 rounded-lg flex space-x-4">
        {/* Opponent Cards */}
        <OpponentCards />

        {/* Player Card */}
        {/* <PlayerCard player={player} powerUps={powerUps} /> */}

        {/* Game Store */}
        {/* <GameStore drachmas={drachmas} buyItem={buyItem} /> */}
        <GameStore drachmas={drachmas} />
      </div>

      {/* User Wallet & Login */}
      {/* <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 flex justify-between">
        <div className="text-xl">Turn Me Into Vampire</div>
        <ul className="flex space-x-4">
          {!username ? (
            <li>
              <button
                onClick={() =>
                  isKeychainInstalled()
                    ? login(prompt("Enter your Hive username"))
                    : alert("Install Hive Keychain to log in.")
                }
                className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
              >
                Log In with Keychain
              </button>
            </li>
          ) : (
            <>
              <li>
                User: <b>@{username}</b>
              </li>
              <li>
                <button
                  onClick={() => getUserDetails(username)}
                  className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
                >
                  Get User Details
                </button>
              </li>
              <li>
                <button
                  onClick={logOut}
                  className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                >
                  Log Out
                </button>
              </li>
            </>
          )}
        </ul>
      </nav> */}

      {/* Wallet Information
      {wallet && (
        <div className="fixed bottom-4 left-4 bg-gray-200 p-4 rounded-lg">
          <div>HIVE: {wallet.HIVE}</div>
          <div>HBD: {wallet.HBD}</div>
          <div>HP: {wallet.HP}</div>
        </div>
      )} */}
    </div>
  );
}
