import type { Metadata } from "next";

import { Assistant } from "next/font/google";

import "./globals.css";

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
      <body className={`${assistant.className} `}>{children}</body>
    </html>
  );
}
