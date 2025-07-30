"use client";

import { ReactNode } from "react";
import { CustomerAuthProvider } from "@/contexts/CustomerAuthContext";

interface ClientAuthProviderProps {
  children: ReactNode;
}

export default function ClientAuthProvider({
  children,
}: ClientAuthProviderProps) {
  return <CustomerAuthProvider>{children}</CustomerAuthProvider>;
}
