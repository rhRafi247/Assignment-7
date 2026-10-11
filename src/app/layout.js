import "./globals.css";
import { Suspense } from "react";
import { getCategories, getProducts } from "@/lib/api";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "বাজার দর | নিত্যপ্রয়োজনীয় পণ্যের বাজারদর এক নজরে",
  description:
    "আজকের বাজার দর — চাল, ডাল, তেল, সবজি, মাছ, মাংস ও মসলার সঠিক দাম ও বাজার পরিবর্তন জানুন এক ক্লিকে।",
  keywords: ["বাজার দর", "BazarDor", "বাংলাদেশ বাজার", "commodity prices", "চাল ডাল তেল"],
  icons: {
    icon: "/cart-icon.png",
  },
};

export default async function RootLayout({ children }) {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <html lang="bn" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#fbfbfb] text-[#1e293b] antialiased">
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 3500,
            style: {
              background: "#ffffff",
              color: "#1e293b",
              borderRadius: "12px",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e2e8f0",
              fontFamily: "'Hind Siliguri', sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              padding: "12px 16px",
            },
            success: {
              iconTheme: {
                primary: "#0b7a49",
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#ffffff",
              },
            },
          }}
        />
        <Suspense fallback={<div className="h-28 bg-white border-b border-gray-100" />}>
          <Navbar categories={categories} />
        </Suspense>
        <Suspense fallback={<div className="h-8 bg-[#f8fafc] border-b border-gray-200" />}>
          <PriceTicker products={products} />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
