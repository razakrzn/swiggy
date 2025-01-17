import { OwnerAuthProvider } from "@/contexts/OwnerAuthContext";
import "../../styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner with | Swiggy",
  icons: {
    icon: "/favicon.png",
  },
};
export default function partnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <OwnerAuthProvider>{children}</OwnerAuthProvider>
      </body>
    </html>
  );
}
