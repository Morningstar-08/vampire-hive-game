"use client";
import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
// import jwt from "jsonwebtoken";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const router = useRouter();

  // useEffect(() => {
  //   // Check if JWT is stored in cookies and decode it to get the user
  //   const token = localStorage.getItem("token");
  //   try {
  //     if (token) {
  //       const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //       setUser(decoded);
  //     }
  //   } catch (Err) {
  //     console.log(Err);
  //   }
  // }, []);

  const login = async (username) => {
    if (window.hive_keychain) {
      window.hive_keychain.requestSignBuffer(
        username,
        "Hive Authentication",
        "Posting",
        async (response) => {
          if (response.success) {
            const signature = response.result;
            try {
              // Send signature to backend API (auth.ts) for verification and JWT generation
              const res = await fetch("/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, signature }),
              });

              const data = await res.json();
              if (data.token) {
                localStorage.setItem("token", data.token); // Store the JWT in local storage
                setUser(username);
                router.push("/dashboard");
              }
            } catch (error) {
              console.error("Authentication failed", error);
            }
          } else {
            alert("Hive Keychain Authentication Failed");
          }
        }
      );
    } else {
      alert("Please install Hive Keychain!");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
