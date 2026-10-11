"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("অনুগ্রহ করে প্রথমে সাইন ইন করুন");
      router.push("/signin?callbackUrl=/profile/update");
    } else if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [isPending, session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      const msg = "অনুগ্রহ করে আপনার নাম লিখুন।";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    try {
      // BetterAuth updateUser API according to docs: https://better-auth.com/docs/concepts/users-accounts#update-user
      const result = await authClient.updateUser({
        name: name.trim(),
      });

      if (result?.error) {
        const errText = result.error.message || "তথ্য আপডেট করা সম্ভব হয়নি।";
        setErrorMessage(errText);
        toast.error(errText);
      } else {
        toast.success("প্রোফাইলের তথ্য সফলভাবে আপডেট করা হয়েছে!");
        router.push("/profile");
        router.refresh();
      }
    } catch (err) {
      const errText = err?.message || "তথ্য আপডেটে ত্রুটি ঘটেছে।";
      setErrorMessage(errText);
      toast.error(errText);
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto" />
        <div className="h-64 bg-white rounded-3xl border border-gray-100 p-8" />
      </div>
    );
  }

  if (!session?.user) return null;

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="mb-6">
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>প্রোফাইলে ফিরে যান</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            তথ্য আপডেট করুন
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
            আপনার অ্যাকাউন্টের ব্যক্তিগত তথ্য পরিবর্তন করুন।
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs sm:text-sm font-medium">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email field (read-only) */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-500 mb-1.5">
              ইমেইল (পরিবর্তনযোগ্য নয়)
            </label>
            <input
              type="email"
              disabled
              value={session.user.email || ""}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* Name input field (Challenge C3) */}
          <div>
            <label htmlFor="user-name-input" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              নাম
            </label>
            <input
              id="user-name-input"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম লিখুন"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b7a49]/20 focus:border-[#0b7a49] transition-all bg-white"
            />
          </div>

          {/* Update Information Button */}
          <div className="pt-2">
            <button
              type="submit"
              id="update-info-submit-btn"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-[#0b7a49] hover:bg-[#08613a] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>তথ্য আপডেট হচ্ছে...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>তথ্য আপডেট করুন</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
