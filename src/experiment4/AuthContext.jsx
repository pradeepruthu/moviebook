import React, { createContext, useContext, useState } from "react";
const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  function login(email, password) {
    if (email.trim() && password.trim()) {
      setUser({
        email,
      });

      return true;
    }
    return false;
  }
  function signup(name, email, password) {
    if (name.trim() && email.trim() && password.trim()) {
      setUser({
        name,
        email,
      });

      return true;
    }

    return false;
  }
  function logout() {
    setUser(null);
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isLoggedIn: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}