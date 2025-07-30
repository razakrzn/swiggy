import { ReactNode } from "react";
import ClientAuthProvider from "@/components/frontend/ClientAuthProvider";
import SidebarCustomer from "@/components/frontend/SidebarCustomer";
import HeaderCustomerProfile from "@/components/frontend/HeaderCustomerProfile";

interface ProfileLayoutProps {
  children: ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <html lang="en">
      <body>
        <ClientAuthProvider>
          <HeaderCustomerProfile />
          <div className="flex">
            <div>
              <SidebarCustomer />
            </div>
            <div className="w-screen bg-[#F8F8FB]">
              <main>{children}</main>
            </div>
          </div>
        </ClientAuthProvider>
      </body>
    </html>
  );
}
