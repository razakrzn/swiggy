"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlFood, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCustomerAuth } from "@/contexts/CustomerAuthContext";
import AuthModal from "../auth/AuthModal";
import { useCart } from "@/contexts/CartContext";
import { usePathname } from "next/navigation";
import classNames from "classnames";

interface HeaderProps {
  onShowLocationSelector: () => void;
}

const Header: React.FC<HeaderProps> = ({ onShowLocationSelector }) => {
  const [isAuthModalVisible, setAuthModalVisible] = useState(false);
  const { user } = useCustomerAuth();
  const { totalItems } = useCart();
  const pathname = usePathname();
  const isActive = (paths: string[]) => paths.includes(pathname);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="container-custom h-[80px] flex justify-between items-center">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            <Link
              href="/restaurants"
              className="relative w-12 h-12 overflow-hidden rounded-xl transition-transform hover:scale-105"
            >
              <Image
                src="/images/logo-2.png"
                alt="Swiggy Logo"
                fill
                sizes="(max-width: 48px) 48px, 48px"
                className="object-contain"
                priority
              />
            </Link>
            <button
              onClick={onShowLocationSelector}
              className="group flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-background-light transition-colors"
            >
              <span className="text-sm font-semibold text-text-primary group-hover:text-primary">
                Other
              </span>
              <span className="text-sm text-text-secondary group-hover:text-primary/70">
                location
              </span>
              <FontAwesomeIcon
                icon={faChevronDown}
                size="sm"
                className="text-primary ml-1"
              />
            </button>
          </div>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {[
              {
                href: "/",
                icon: "/images/corporate.svg",
                label: "Swiggy Corporate",
              },
              { href: "/", icon: "/images/search.png", label: "Search" },
              { href: "/", icon: "/images/offer.svg", label: "Offer" },
              { href: "/", icon: "/images/help.svg", label: "Help" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 text-sm font-semibold text-text-primary hover:text-primary transition-colors"
              >
                <Image
                  src={item.icon}
                  alt={`${item.label} icon`}
                  width={18}
                  height={18}
                  className="w-4 h-4 object-contain"
                />
                <span>{item.label}</span>
              </Link>
            ))}

            {user ? (
              <Link
                href="/profile"
                className={classNames(
                  "flex items-center gap-2 text-sm font-semibold transition-colors",
                  {
                    "text-text-primary": !isActive(["/profile/"]),
                    "text-primary": isActive(["/profile/"]),
                  }
                )}
              >
                <Image
                  src="/images/signIn.svg"
                  alt="User icon"
                  width={19}
                  height={19}
                  className="w-4 h-4"
                />
                <span className="capitalize">{user.username}</span>
              </Link>
            ) : (
              <button
                onClick={() => setAuthModalVisible(true)}
                className="flex items-center gap-2 text-sm font-semibold text-text-primary hover:text-primary transition-colors"
              >
                <Image
                  src="/images/signIn.svg"
                  alt="Sign-in icon"
                  width={19}
                  height={19}
                  className="w-4 h-4"
                />
                <span>Sign In</span>
              </button>
            )}

            <Link
              href="/checkout"
              className={classNames(
                "flex items-center gap-2 text-sm font-semibold transition-colors",
                {
                  "text-primary": totalItems > 0,
                  "text-text-primary": totalItems === 0,
                }
              )}
            >
              <span className="relative">
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center text-xs font-semibold">
                  {totalItems > 0 ? totalItems : 0}
                </span>
                <FontAwesomeIcon icon={faBowlFood} size="lg" />
              </span>
              <span>Cart</span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-background-light">
            <svg
              className="w-6 h-6 text-text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      <AuthModal
        isVisible={isAuthModalVisible}
        onClose={() => setAuthModalVisible(false)}
      />
    </>
  );
};

export default Header;
