"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getBanglaDate } from "@/lib/api";

export default function Hero() {
  const [dateText, setDateText] = useState("রবিবার, ১১ অক্টোবর, ২০২৬");

  useEffect(() => {
    setDateText(getBanglaDate(new Date()));
  }, []);

  const handleScrollToProducts = (e) => {
    e.preventDefault();
    const target = document.getElementById("সব-পণ্য");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-[#f8faf8] border border-emerald-100/60 rounded-3xl p-6 sm:p-10 lg:p-12 mb-10 sm:mb-14 overflow-hidden relative shadow-sm">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left Column Content */}
        <div className="flex-1 max-w-2xl text-center lg:text-left">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/70 text-[#0b7a49] text-xs sm:text-sm font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-[#0b7a49] animate-pulse" />
            <span>{dateText}</span>
          </div>

          {/* Main heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-6">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং বাজার পরিবর্তনের পূর্বাভাস।
          </p>

          {/* Primary CTA button */}
          <div>
            <a
              href="#সব-পণ্য"
              id="hero-cta-button"
              onClick={handleScrollToProducts}
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-[#0b7a49] hover:bg-[#08613a] rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              সব পণ্য দেখুন
            </a>
          </div>
        </div>

        {/* Right Column Banner Image */}
        <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md flex justify-center shrink-0">
          <div className="relative w-64 h-52 sm:w-80 sm:h-64 lg:w-96 lg:h-72">
            <Image
              src="/hero-banner.png"
              alt="বাজার দর ফলমূল ও শাকসবজি"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              priority
              className="object-contain drop-shadow-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
