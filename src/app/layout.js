// app/layout.tsx

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/component/Footer";
import Header from "@/component/Header";
import Main from "@/component/Main";
import { Toaster } from "react-hot-toast";
import Loading from "./loading";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DocuVault – Secure QR Document Sharing",
  description: "Share documents securely with QR codes. No login required.",
  keywords: "QR file share, secure document sharing, upload and scan, Next.js app",
  authors: [
    { name: "Shobhit Maurya" },
    { name: "Yugraj Kumar Singh" }
  ],
  openGraph: {
    title: "DocuVault",
    description: "Share files securely via QR code.",
    url: "https://fileSharing.vercel.app",
    siteName: "DocuVault",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-center" />
        <Suspense fallback={<Loading />}>
          <Header />
          <Main>{children}</Main>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
