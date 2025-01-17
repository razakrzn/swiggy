import { ReactNode } from "react";
import { CustomerAuthProvider } from "@/contexts/CustomerAuthContext";
import SidebarCustomer from "@/components/frontend/SidebarCustomer";
import HeaderCustomerProfile from "@/components/frontend/HeaderCustomerProfile";

interface RestaurantsLayoutProps {
  children: ReactNode;
}

export default function ProfileLayout({ children }: RestaurantsLayoutProps) {
  return (
    <html lang="en">
      <body>
        <CustomerAuthProvider>
          <HeaderCustomerProfile />
          <div className="flex">
            <div>
              <SidebarCustomer />
            </div>
            <div className="w-screen bg-[#F8F8FB]">
              <main>{children}</main>
            </div>
          </div>
        </CustomerAuthProvider>
      </body>
    </html>
  );
}
