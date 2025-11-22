import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google"; // Import Roboto
import "./globals.css";

// 1. Configure Roboto fonts using next/font (per project requirements)
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Printhub Prototype",
  description: "A mobile-first printing service app prototype.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 2. Add Material Icons CDN (Standard Version) */}
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      
      {/* 3. Apply Roboto font variables to the body */}
      <body
        className={`${roboto.variable} ${robotoMono.variable} antialiased font-sans`}
      >
        {/* 4. Mobile Wrapper (Responsive up to 412x917px) */}
        <div className="flex justify-center items-center min-h-screen bg-grey-1 dark:bg-grey-15">
          <div
            className="w-screen h-screen max-w-[412px] max-h-[917px] bg-color-surface-dim shadow-2xl transition-all duration-300 sm:w-[412px] sm:h-[917px] sm:rounded-[3rem] sm:border-[12px] sm:border-grey-13 dark:sm:border-grey-1 sm:overflow-hidden overflow-y-auto"
          >
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}