import { ReactNode } from "react";
import ClientAuthProvider from "@/components/frontend/ClientAuthProvider";

interface CityLayoutProps {
  children: ReactNode;
}

export default function CityLayout({ children }: CityLayoutProps) {
  return <ClientAuthProvider>{children}</ClientAuthProvider>;
}
