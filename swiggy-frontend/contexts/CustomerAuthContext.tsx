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
}

interface CustomerAuthContextType {
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

const CustomerAuthContext = createContext<CustomerAuthContextType | undefined>(
  undefined
);

export const CustomerAuthProvider: React.FC<AuthProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserDetails = async () => {
    const token = Cookies.get("customer_authToken");
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
          setUser(userData);
        } else if (response.status === 401) {
          const refreshedToken = await refreshAccessToken();
          if (refreshedToken) {
            await fetchUserDetails();
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
    const refreshToken = Cookies.get("customer_refresh_token");
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
          Cookies.set("customer_authToken", newAccessToken);
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
    Cookies.set("customer_authToken", access);
    Cookies.set("customer_refresh_token", refresh);
    setIsLoggedIn(true);
    await fetchUserDetails();
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setError(null);
    Cookies.remove("customer_authToken");
    Cookies.remove("customer_refresh_token");
  };

  useEffect(() => {
    const token = Cookies.get("customer_authToken");
    if (token) {
      setIsLoggedIn(true);
      fetchUserDetails();
    }
  }, []);

  return (
    <CustomerAuthContext.Provider
      value={{ user, setUser, isLoggedIn, login, logout, error }}
    >
      {children}
    </CustomerAuthContext.Provider>
  );
};

export const useCustomerAuth = (): CustomerAuthContextType => {
  const context = useContext(CustomerAuthContext);
  if (!context) {
    throw new Error(
      "useCustomerAuth must be used within a CustomerAuthProvider"
    );
  }
  return context;
};
