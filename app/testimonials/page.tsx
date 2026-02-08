"use client";

import { useState, useEffect } from "react";
import ProfileHeader from "@/components/ProfileHeader";
import SocialFooter from "@/components/SocialFooter";
import StatsSection from "@/components/StatsSection";
import Link from "next/link";
import { FaArrowLeft, FaStar, FaSortAmountDown, FaSortAmountUp, FaCalendarAlt } from "react-icons/fa";
import { supabase, Review } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";

type FilterType = "newest" | "highest" | "lowest";

export default function TestimonialsPage() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [filter, setFilter] = useState<FilterType>("newest");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            try {
                let query = supabase.from("reviews").select("*");

                switch (filter) {
                    case "newest":
                        query = query.order("created_at", { ascending: false });
                        break;
                    case "highest":
                        query = query.order("rating", { ascending: false }).order("created_at", { ascending: false });
                        break;
                    case "lowest":
                        query = query.order("rating", { ascending: true }).order("created_at", { ascending: false });
                        break;
                }

                const { data, error } = await query;

                if (error) {
                    console.error("Error fetching reviews:", error);
                } else if (data) {
                    setReviews(data);
                }
            } catch (err) {
                console.error("Unexpected error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [filter]);

    const activeFilterClass = "bg-[#ff00cc] text-white border-transparent";
    const inactiveFilterClass = "bg-[#140a1e]/60 text-[#b3b3b3] border border-[#ff00cc]/20 hover:border-[#ff00cc]/50 hover:text-white";

    return (
        <div className="w-full max-w-md md:max-w-2xl flex flex-col items-center gap-6 z-10 pb-12 mx-auto">
            <div className="w-full px-4 flex justify-start pt-6">
                <Link href="/" className="text-[#b3b3b3] hover:text-white flex items-center gap-2 text-sm transition-colors">
                    <FaArrowLeft /> Back to Home
                </Link>
            </div>

            <header className="text-center mb-2 px-4">
                <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-[#ffccff] bg-clip-text text-transparent">
                    What They Say
                </h1>
                <p className="text-[#b3b3b3] text-sm">Trusted by fans worldwide</p>
            </header>

            {/* Stats Section */}
            <StatsSection />

            {/* Filters - Sticky on Mobile */}
            <div className="w-full sticky top-0 z-30 bg-[#0a0118]/95 backdrop-blur-md py-3 mb-4 md:static md:bg-transparent md:backdrop-blur-none md:py-0 md:mb-4 transition-all border-b border-white/5 md:border-none shadow-lg md:shadow-none">
                <div className="w-full px-4 flex flex-nowrap md:flex-wrap overflow-x-auto justify-start md:justify-center gap-3 no-scrollbar">
                    <button
                        onClick={() => setFilter("newest")}
                        className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap flex-shrink-0 ${filter === "newest" ? activeFilterClass : inactiveFilterClass}`}
                    >
                        <FaCalendarAlt /> Newest
                    </button>
                    <button
                        onClick={() => setFilter("highest")}
                        className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap flex-shrink-0 ${filter === "highest" ? activeFilterClass : inactiveFilterClass}`}
                    >
                        <FaSortAmountDown /> Highest Rated
                    </button>
                    <button
                        onClick={() => setFilter("lowest")}
                        className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap flex-shrink-0 ${filter === "lowest" ? activeFilterClass : inactiveFilterClass}`}
                    >
                        <FaSortAmountUp /> Lowest Rated
                    </button>
                </div>
            </div>

            {/* Reviews Grid */}
            <div className="w-full px-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence mode="popLayout">
                    {loading ? (
                        // Skeleton loading state
                        [...Array(4)].map((_, i) => (
                            <motion.div
                                key={`skeleton-${i}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="bg-[#140a1e]/40 border border-white/5 p-6 rounded-2xl h-40 animate-pulse"
                            />
                        ))
                    ) : (
                        reviews.map((review) => (
                            <motion.div
                                key={review.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className="bg-[#140a1e]/80 border border-[#ff00cc]/10 p-6 rounded-2xl backdrop-blur-md shadow-lg hover:border-[#ff00cc]/30 transition-colors"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff00cc] to-[#333399] text-white flex items-center justify-center font-bold text-sm mr-3 shadow-inner">
                                            {review.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white text-sm">{review.name}</h3>
                                            <span className="text-xs text-[#b3b3b3]">
                                                {new Date(review.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex text-[#ffcc00] text-sm gap-0.5 bg-black/20 px-2 py-1 rounded-lg">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className={i < review.rating ? "opacity-100" : "opacity-20"} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-line">
                                    "{review.review || (review as any).text || review.review}"
                                </p>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            {!loading && reviews.length === 0 && (
                <div className="text-center py-12 text-[#b3b3b3]">
                    No reviews found.
                </div>
            )}

            <div className="w-full px-8 mt-8 text-center">
                <Link
                    href="/"
                    className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-[#ff00cc] to-[#333399] text-white font-bold shadow-lg shadow-[#ff00cc]/30 hover:scale-105 transition-transform"
                >
                    Join the Community
                </Link>
            </div>

            <SocialFooter />
        </div>
    );
}
