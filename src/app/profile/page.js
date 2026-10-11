"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { User, Mail, Calendar, Edit3, LogOut, ArrowLeft } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("প্রোফাইল দেখতে সাইন ইন করুন");
      router.push("/signin?callbackUrl=/profile");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto" />
        <div className="h-64 bg-white rounded-3xl border border-gray-100 p-8" />
      </div>
    );
  }

  if (!session?.user) return null;

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট করা হয়েছে");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট ব্যর্থ হয়েছে");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোমে ফিরে যান</span>
        </Link>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          আমার প্রোফাইল
        </h1>
        <div className="w-16" />
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-8">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100 text-center sm:text-left">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "User"}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-[#0b7a49]/10 shadow-sm"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-[#0b7a49] text-white flex items-center justify-center text-3xl font-bold ring-4 ring-[#0b7a49]/10">
              {(session.user.name || session.user.email || "U")[0].toUpperCase()}
            </div>
          )}

          <div className="flex-1 space-y-1">
            <h2 className="text-2xl font-bold text-gray-900">
              {session.user.name || "নাম সেট করা নেই"}
            </h2>
            <p className="text-sm text-gray-500 font-medium">
              {session.user.email}
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#0b7a49] text-xs font-semibold mt-2">
              <span className="w-2 h-2 rounded-full bg-[#0b7a49]" />
              <span>সক্রিয় সদস্য</span>
            </div>
          </div>
        </div>

        {/* User Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-600 shadow-2xs">
              <User className="w-5 h-5 text-[#0b7a49]" />
            </div>
            <div>
              <span className="text-xs text-gray-400 font-medium block">পূর্ণ নাম</span>
              <span className="text-sm font-bold text-gray-800">
                {session.user.name || "নির্দিষ্ট করা নেই"}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-600 shadow-2xs">
              <Mail className="w-5 h-5 text-[#0b7a49]" />
            </div>
            <div>
              <span className="text-xs text-gray-400 font-medium block">ইমেইল ঠিকানা</span>
              <span className="text-sm font-bold text-gray-800 truncate block max-w-[200px]">
                {session.user.email}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons (Challenge C3 trigger) */}
        <div className="pt-4 flex flex-col sm:flex-row items-center gap-3 border-t border-gray-100">
          <Link
            href="/profile/update"
            id="update-profile-button"
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0b7a49] hover:bg-[#08613a] text-white font-bold rounded-xl shadow-sm transition-all cursor-pointer text-sm"
          >
            <Edit3 className="w-4 h-4" />
            <span>তথ্য আপডেট করুন</span>
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl transition-colors cursor-pointer text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>সাইন আউট</span>
          </button>
        </div>
      </div>
    </div>
  );
}
