import type { Metadata } from "next";

import { Assistant } from "next/font/google";

import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShippingBanner from "@/components/ShippingBanner";
import { CartProvider } from "./context/CartContext";

const assistant = Assistant({
  weight: ["300", "400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dawn Shop",
  description: "Dawn Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CartProvider>
        <body className={`${assistant.className} `}>
          <ShippingBanner />
          <Header />
          {children}
          <Footer />
        </body>
      </CartProvider>
    </html>
  );
}
