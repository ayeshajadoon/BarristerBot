import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BaristerBot",
  description: "Your Law Assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <html lang="en"
    >
      <ThemeProvider attribute="class">
      <body className={inter.className}>{children}</body>
      </ThemeProvider>
    </html>
    
  );
}
