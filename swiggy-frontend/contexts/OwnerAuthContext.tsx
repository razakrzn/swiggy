"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  restaurantIds: number[];
}

interface OwnerAuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoggedIn: boolean;
  login: (access: string, refresh: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

const OwnerAuthContext = createContext<OwnerAuthContextType | undefined>(
  undefined
);

export const OwnerAuthProvider: React.FC<AuthProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserDetails = async () => {
    const token = Cookies.get("owner_authToken");
    if (token) {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/v1/auth/user-details/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.ok) {
          const userData = await response.json();
          setUser({
            ...userData,
            restaurantIds: userData.restaurant_ids || [], // Ensure restaurant IDs are included
          });
        } else if (response.status === 401) {
          const refreshedToken = await refreshAccessToken();
          if (refreshedToken) {
            await fetchUserDetails(); // Retry with new token
          }
        } else {
          setError("Failed to fetch user details.");
          logout();
        }
      } catch (error) {
        setError("Error fetching user details.");
        logout();
      }
    } else {
      setError("No authentication token found.");
      logout();
    }
  };

  const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = Cookies.get("owner_refresh_token");
    if (refreshToken) {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/v1/auth/token/refresh/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: refreshToken }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const newAccessToken = data.access;
          Cookies.set("owner_authToken", newAccessToken);
          return newAccessToken;
        } else {
          logout();
        }
      } catch (error) {
        console.error("Error refreshing access token:", error);
        logout();
      }
    } else {
      logout();
    }
    return null;
  };

  const login = async (access: string, refresh: string) => {
    Cookies.set("owner_authToken", access);
    Cookies.set("owner_refresh_token", refresh);
    setIsLoggedIn(true);
    await fetchUserDetails();
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setError(null);
    Cookies.remove("owner_authToken");
    Cookies.remove("owner_refresh_token");
  };

  useEffect(() => {
    const token = Cookies.get("owner_authToken");
    if (token) {
      setIsLoggedIn(true);
      fetchUserDetails();
    }
  }, []);

  return (
    <OwnerAuthContext.Provider
      value={{ user, setUser, isLoggedIn, login, logout, error }}
    >
      {children}
    </OwnerAuthContext.Provider>
  );
};

export const useOwnerAuth = (): OwnerAuthContextType => {
  const context = useContext(OwnerAuthContext);
  if (!context) {
    throw new Error("useOwnerAuth must be used within an OwnerAuthProvider");
  }
  return context;
};
