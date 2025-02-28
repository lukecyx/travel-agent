import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CS Agent",
  description: "Customer Service Agent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
