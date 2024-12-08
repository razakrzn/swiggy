import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Order Food & Groceries.Discover the best restaurants. Swiggy it! | Swiggy",
  icons: {
    icon: "/favicon.png",
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
}
