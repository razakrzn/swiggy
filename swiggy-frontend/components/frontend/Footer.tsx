import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const footerLinks = {
    company: [
      { label: "About Us", href: "/" },
      { label: "Swiggy Corporate", href: "/" },
      { label: "Careers", href: "/" },
      { label: "Team", href: "/" },
      { label: "Swiggy One", href: "/" },
      { label: "Swiggy Instamart", href: "/" },
      { label: "Swiggy Dineout", href: "/" },
      { label: "Swiggy Genie", href: "/" },
    ],
    contact: [
      { label: "Help & Support", href: "/" },
      { label: "Partner with us", href: "/partner-login", target: "_blank" },
      { label: "Ride with us", href: "/" },
    ],
    legal: [
      { label: "Terms & Conditions", href: "/" },
      { label: "Cookie Policy", href: "/" },
      { label: "Privacy Policy", href: "/" },
      { label: "Investor Relations", href: "/" },
    ],
    life: [
      { label: "Explore with Swiggy", href: "/" },
      { label: "Swiggy News", href: "/" },
      { label: "Snackables", href: "/" },
    ],
    cities: [
      { label: "Bangalore", href: "/" },
      { label: "Gurgaon", href: "/" },
      { label: "Hyderabad", href: "/" },
      { label: "Delhi", href: "/" },
      { label: "Mumbai", href: "/" },
      { label: "Pune", href: "/" },
    ],
    social: [
      { icon: "/images/icon-linkedin.png", href: "/", alt: "LinkedIn" },
      { icon: "/images/icon-instagram.png", href: "/", alt: "Instagram" },
      { icon: "/images/icon-facebook.png", href: "/", alt: "Facebook" },
    ],
  };

  return (
    <footer className="bg-background-light">
      {/* App Download Section */}
      <div className="container-custom py-8 border-t border-border-color">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <h3 className="text-2xl font-bold text-text-primary opacity-80 tracking-tight max-w-lg">
            For better experience, download the Swiggy app now
          </h3>
          <div className="flex gap-4">
            <a
              href="https://play.google.com/store/apps/details?id=in.swiggy.android&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105"
            >
              <Image
                src="/images/play_store.png"
                alt="Download from Play Store"
                width={160}
                height={48}
                className="h-12 w-auto object-contain"
              />
            </a>
            <a
              href="https://apps.apple.com/in/app/swiggy-food-instamart-dineout/id989540920"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105"
            >
              <Image
                src="/images/app_store.png"
                alt="Download from App Store"
                width={160}
                height={48}
                className="h-12 w-auto object-contain"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Logo and Copyright */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="mb-4">
              <Image
                src="/images/swiggy-logo-01.svg"
                alt="Swiggy"
                width={160}
                height={40}
                className="w-auto h-auto"
                priority
              />
            </div>
            <div className="text-sm text-text-secondary">
              © 2024 Swiggy Limited
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold text-text-primary mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Links */}
          <div>
            <h4 className="text-lg font-semibold text-text-primary mb-4">
              Contact us
            </h4>
            <ul className="space-y-2">
              {footerLinks.contact.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={link.target}
                    className="text-sm text-text-secondary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold text-text-primary mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Life at Swiggy */}
          <div>
            <h4 className="text-lg font-semibold text-text-primary mb-4">
              Life at Swiggy
            </h4>
            <ul className="space-y-2">
              {footerLinks.life.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities and Social */}
          <div>
            <h4 className="text-lg font-semibold text-text-primary mb-4">
              Available in:
            </h4>
            <ul className="space-y-2 mb-6">
              {footerLinks.cities.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <button className="btn-secondary text-sm w-full max-w-[120px]">
              <div className="flex items-center justify-between">
                <span>679 cities</span>
                <FontAwesomeIcon icon={faChevronDown} size="xs" />
              </div>
            </button>

            <div className="mt-6">
              <h4 className="text-lg font-semibold text-text-primary mb-4">
                Social Links
              </h4>
              <div className="flex gap-4">
                {footerLinks.social.map((link) => (
                  <a
                    key={link.alt}
                    href={link.href}
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    <Image
                      src={link.icon}
                      alt={link.alt}
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
