"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function ReviewPage() {
    const [name, setName] = useState("");
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Basic validation
        if (!name.trim()) {
            setError("Name is required.");
            setLoading(false);
            return;
        }
        if (!rating) {
            setError("Please select a rating.");
            setLoading(false);
            return;
        }

        try {
            const { error } = await supabase
                .from("reviews")
                .insert([{
                    name: name.trim(),
                    rating,
                    review: review.trim()
                }]);

            if (error) throw error;
            setSubmitted(true);
        } catch (err: any) {
            console.error("Submission error:", err);
            setError("Failed to submit review. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 text-center">
                <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#ff99cc] to-[#cc99ff] bg-clip-text text-transparent">
                    Thank you!
                </h1>
                <p className="text-[#b3b3b3] mb-8">Your review has been submitted.</p>
                <Link
                    href="/"
                    className="px-6 py-2 bg-[#ff00cc] text-white rounded-full font-bold shadow-lg shadow-[#ff00cc]/30 hover:bg-[#d900ad] transition-colors"
                >
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md mx-auto min-h-screen flex flex-col p-6">
            <div className="w-full mb-8">
                <Link href="/" className="text-[#b3b3b3] hover:text-white flex items-center gap-2 text-sm transition-colors">
                    <FaArrowLeft /> Back to Home
                </Link>
            </div>

            <header className="text-center mb-8">
                <h1 className="text-2xl font-bold mb-2 text-white">Leave a Review</h1>
                <p className="text-[#b3b3b3] text-sm">Tell us what you think!</p>
            </header>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Name Input */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#ffccff]">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name or alias"
                        required
                        className="bg-[#140a1e]/60 border border-[#ff00cc]/20 rounded-xl p-3 text-white placeholder-[#b3b3b3]/50 focus:outline-none focus:border-[#ff00cc] transition-colors"
                    />
                </div>

                {/* Rating Selector */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#ffccff]">Rating</label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className={`text-2xl transition-transform hover:scale-110 ${star <= rating ? "text-[#ffcc00]" : "text-[#b3b3b3]/30"
                                    }`}
                            >
                                <FaStar />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Review Textarea */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#ffccff]">
                        Review <span className="text-xs text-[#b3b3b3] font-normal">(Optional)</span>
                    </label>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value.slice(0, 150))}
                        placeholder="Share your experience..."
                        rows={4}
                        className="bg-[#140a1e]/60 border border-[#ff00cc]/20 rounded-xl p-3 text-white placeholder-[#b3b3b3]/50 focus:outline-none focus:border-[#ff00cc] transition-colors resize-none"
                    />
                    <div className="text-right text-xs text-[#b3b3b3]">
                        {review.length} / 150
                    </div>
                </div>

                {error && (
                    <div className="text-red-500 text-sm text-center bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading || !name || !rating}
                    className="mt-4 w-full py-3 rounded-full bg-gradient-to-r from-[#ff00cc] to-[#333399] text-white font-bold shadow-lg shadow-[#ff00cc]/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Submitting..." : "Submit Review"}
                </button>
            </form>
        </div>
    );
}
