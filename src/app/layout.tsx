
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gilded Mythos | Adventures Across Alori",
  description:
    "Explore Gilded Mythos, home to Dungeons & Dragons podcasts, fantasy adventures, and the world of Alori.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
