"use client";

import { createContext, useContext, useState } from "react";
import pb from "@/app/pocketbase";

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(pb.authStore.isValid);

  return (
    <AuthContext.Provider value={[loggedIn, setLoggedIn]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
