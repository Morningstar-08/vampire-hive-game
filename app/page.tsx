"use client";
import { useHiveKeychainAuth } from "./api/auth"; // Import the custom hook

export default function Index() {
  const {
    username,
    userDetails,
    wallet,
    login,
    getUserDetails,
    logOut,
    isKeychainInstalled,
  } = useHiveKeychainAuth(); // Destructure auth state and methods

  return (
    <div className="p-6">
      <nav className="flex justify-between items-center bg-gray-800 text-white p-4">
        <div className="text-xl font-bold">Turn Me Into Vampire</div>
        <ul className="flex items-center space-x-4">
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
                <p className="text-lg">
                  User: <b>@{username}</b>
                </p>
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
      </nav>

      <div className="mt-6">
        {userDetails && (
          <div>
            <h2 className="text-2xl font-bold mb-2">User Details</h2>
            <pre className="bg-gray-100 p-4 rounded">
              {JSON.stringify(userDetails, null, 2)}
            </pre>
          </div>
        )}

        {wallet && (
          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-2">Wallet</h2>
            <ul className="bg-gray-100 p-4 rounded">
              {/* <li>HIVE: {wallet.HIVE}</li>
              <li>HBD: {wallet.HBD}</li>
              <li>Hive Power (HP): {wallet.HP}</li> */}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
