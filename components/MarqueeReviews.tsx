"use client";

import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { Review } from "@/lib/supabaseClient";

interface MarqueeReviewsProps {
    reviews: Review[];
    direction?: "left" | "right";
    speed?: number;
}

export default function MarqueeReviews({ reviews, direction = "left", speed = 20 }: MarqueeReviewsProps) {
    // If no reviews, return null to hide the marquee
    if (!reviews || reviews.length === 0) return null;

    return (
        <div className="flex overflow-hidden whitespace-nowrap mask-gradient relative w-full py-4">
            <motion.div
                className="flex gap-4"
                initial={{ x: direction === "left" ? 0 : "-50%" }}
                animate={{ x: direction === "left" ? "-50%" : 0 }}
                transition={{
                    ease: "linear",
                    duration: speed,
                    repeat: Infinity,
                }}
            >
                {/* Duplicate the reviews array enough times to ensure smooth looping */}
                {[...reviews, ...reviews, ...reviews, ...reviews].map((review, index) => (
                    <div
                        key={`${review.id}-${index}`}
                        className="w-72 bg-[#140a1e]/80 border border-[#ff00cc]/20 p-4 rounded-xl backdrop-blur-md flex-shrink-0 whitespace-normal"
                    >
                        <div className="flex items-center mb-2">
                            <div className="flex text-[#ffcc00] text-xs gap-0.5 mr-2">
                                {[...Array(review.rating)].map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                            </div>
                            <span className="font-bold text-white text-sm">{review.name}</span>
                        </div>
                        <p className="text-gray-300 text-xs italic leading-relaxed line-clamp-3">
                            "{review.review}"
                        </p>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
