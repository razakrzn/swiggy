import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className = "" }) => {
  return (
    <div className={`container-custom py-4 sm:py-6 lg:py-8 ${className}`}>
      {children}
    </div>
  );
};

export default Layout;
