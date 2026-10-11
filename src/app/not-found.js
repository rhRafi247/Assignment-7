import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export const metadata = {
  title: "৪০৪ | পাতাটি পাওয়া যায়নি - বাজার দর",
  description: "অনুরোধকৃত পৃষ্ঠাটি খুঁজে পাওয়া যায়নি।",
};

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center">
      <div className="w-24 h-24 rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#0b7a49] mb-6">
        <SearchX className="w-12 h-12" />
      </div>

      <span className="text-6xl font-extrabold text-[#0b7a49] mb-2 tracking-tight">
        ৪০৪
      </span>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
        পাতাটি খুঁজে পাওয়া যায়নি
      </h1>

      <p className="text-sm sm:text-base text-gray-500 max-w-md mb-8 leading-relaxed">
        আপনি যে লিংকটিতে প্রবেশ করার চেষ্টা করছেন তা সরানো হয়েছে অথবা লিংকটি সঠিক নয়। অনুগ্রহ করে হোম পেজে ফিরে যান।
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-[#0b7a49] hover:bg-[#08613a] rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>হোম পেজে ফিরে যান</span>
      </Link>
    </div>
  );
}
