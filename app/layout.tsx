import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Assistant } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "./context/CartContext";
import { CountryProvider } from "./context/CountryContext";
import LoadingSpinner from "@/components/LoadingSpinner";

const assistant = Assistant({
  weight: ["300", "400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
  fallback: ["Arial", "Helvetica", "sans-serif"],
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
      <body className={`${assistant.className} flex min-h-screen flex-col`}>
        <CountryProvider>
          <CartProvider>
            <Suspense fallback={<LoadingSpinner />}>
              <Header />
            </Suspense>
            <main className="flex flex-grow flex-col">{children}</main>
            <Footer />
          </CartProvider>
        </CountryProvider>
      </body>
    </html>
  );
}
