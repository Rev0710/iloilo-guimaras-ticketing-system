// Destination: client/src/hooks/useAuth.js
//
// This hook requires your app to be wrapped in <AuthProvider> (from
// context/AuthContext.jsx) — see integration note below.

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }

  return context;
};