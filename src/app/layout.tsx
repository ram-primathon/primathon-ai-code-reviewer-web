import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "@prima/external/react-toastify";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PrimathonAICodeReviewer: AI-powered Code Reviews",
  description: "PR Review & Summary Bot with AI and Chat Features",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
      </head>
      <body className={inter.className}>
        {children}

        <ToastContainer />
      </body>
    </html>
  );
}
