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

  const extensionId = "amjcambocipiinoanadifoajobgkgmon"; // 🔁 Replace with your actual extension ID

  // Sign in with Google
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userToken = await user.getIdToken();
      const userName = user.displayName;
      const userPhotoURL = user.photoURL;
  
      // Send the auth token and user info to the Chrome extension
      const extensionId = "amjcambocipiinoanadifoajobgkgmon";
      chrome.runtime.sendMessage(extensionId, {
        type: "AUTH_TOKEN",
        token: userToken,
        name: userName,
        photoURL: userPhotoURL,
      });
  
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
      localStorage.removeItem("auth");

      // Send a message to the extension to remove the auth token
      const extensionId = "amjcambocipiinoanadifoajobgkgmon"; // Your extension's ID
      chrome.runtime.sendMessage(extensionId, { type: "REMOVE_AUTH_TOKEN" });

      // Navigation handled elsewhere
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Set up auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        localStorage.setItem("auth", "true");

        try {
          const userToken = await user.getIdToken();
          if (chrome?.runtime?.sendMessage) {
            chrome.runtime.sendMessage(extensionId, {
              type: "AUTH_TOKEN",
              token: userToken,
            });
          }
        } catch (err) {
          console.error("Error sending token to Chrome Extension:", err);
        }
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
