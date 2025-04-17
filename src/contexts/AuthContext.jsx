import { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Sign in with Google
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // Save auth state to localStorage
      localStorage.setItem("auth", "true");
      // Navigate to dashboard after login
      navigate("/dashboard");
      return result;
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth);
      // Remove auth state from localStorage
      localStorage.removeItem("auth");
      // Navigate handled by Dashboard component
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Set up auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        localStorage.setItem("auth", "true");
      } else {
        localStorage.removeItem("auth");
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signInWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
