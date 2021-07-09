import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useRouter } from "next/router";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function login(email, password) {
    return await auth
      .signInWithEmailAndPassword(email, password)
      .then(() => router.push("/admin"))
      .catch((error) => error);
  }

  function logout() {
    return auth.signOut().then(() => router.push("/login"));
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  const value = {
    currentUser,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
