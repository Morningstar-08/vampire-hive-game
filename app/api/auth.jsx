"use client";
import { useState } from "react";

// Custom hook for managing Hive Keychain authentication and wallet info
export const useHiveKeychainAuth = () => {
  const [username, setUsername] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [wallet, setWallet] = useState(null);

  // Check if Hive Keychain is installed
  const isKeychainInstalled = () => {
    return typeof window.hive_keychain !== "undefined";
  };

  // Request login via Hive Keychain
  const login = (username) => {
    if (!isKeychainInstalled()) {
      alert("Hive Keychain is not installed. Please install it to proceed.");
      return;
    }

    window.hive_keychain.requestSignBuffer(
      username,
      "Login to Vampire App", // Any message to sign (e.g., "Login to Vampire App")
      "Posting",
      (response) => {
        if (response.success) {
          setUsername(username);
          fetchWallet(username);
        } else {
          console.error("Login failed:", response.message);
        }
      }
    );
  };

  // Fetch wallet details from the Hive blockchain
  const fetchWallet = async (user) => {
    try {
      const response = await fetch("https://api.hive.blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "condenser_api.get_accounts",
          params: [[user]],
          id: 1,
        }),
      });
      const result = await response.json();
      const account = result.result[0];

      const walletData = {
        HIVE: account.balance,
        HBD: account.hbd_balance,
        HP: account.vesting_shares,
      };

      setWallet(walletData);
    } catch (error) {
      console.error("Error fetching wallet data:", error);
    }
  };

  // Fetch user details from the blockchain
  const getUserDetails = async (user) => {
    try {
      const response = await fetch("https://api.hive.blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "condenser_api.get_accounts",
          params: [[user]],
          id: 1,
        }),
      });
      const result = await response.json();
      setUserDetails(result.result[0]);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Logout function
  const logOut = () => {
    setUsername(null);
    setUserDetails(null);
    setWallet(null);
  };

  return {
    username,
    userDetails,
    wallet,
    login,
    getUserDetails,
    logOut,
    isKeychainInstalled,
  };
};
