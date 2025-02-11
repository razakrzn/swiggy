import HeaderDashboard from "@/components/backend/HeaderDashboard";
import Sidebar from "@/components/backend/Sidebar";
import { OwnerAuthProvider } from "@/contexts/OwnerAuthContext";
import { Metadata } from "next";
import "../../styles/globals.css";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Partner with | Swiggy",
  icons: {
    icon: "/favicon.png",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <OwnerAuthProvider>
          <HeaderDashboard />
          <div className="flex">
            <div>
              <Sidebar />
            </div>
            <div className="w-screen bg-[#F8F8FB]">
              <main>{children}</main>
            </div>
          </div>
        </OwnerAuthProvider>
      </body>
    </html>
  );
}
