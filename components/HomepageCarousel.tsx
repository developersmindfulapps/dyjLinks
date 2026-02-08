"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { supabase, Review } from "@/lib/supabaseClient";

export default function HomepageCarousel() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

    const shouldReduceMotion = useReducedMotion();

    // Fetch reviews
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const { data, error } = await supabase
                    .from("reviews")
                    .select("*")
                    .gte("rating", 4)
                    .order("created_at", { ascending: false })
                    .limit(6);

                if (error) {
                    console.error("Error fetching reviews:", error);
                } else if (data && data.length > 0) {
                    setReviews(data);
                }
            } catch (err) {
                console.error("Unexpected error fetching reviews:", err);
            }
        };

        fetchReviews();
    }, []);

    // Auto-scroll logic
    const nextSlide = useCallback(() => {
        setReviews((prevReviews) => {
            if (prevReviews.length === 0) return prevReviews;
            setCurrentIndex((prev) => (prev + 1) % prevReviews.length);
            return prevReviews;
        });
    }, []);

    const startAutoScroll = useCallback(() => {
        if (shouldReduceMotion) return;
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(nextSlide, 5000); // 5 seconds per slide
    }, [nextSlide, shouldReduceMotion]);

    const stopAutoScroll = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = null;
    }, []);

    const pauseInteraction = useCallback(() => {
        setIsPaused(true);
        stopAutoScroll();
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    }, [stopAutoScroll]);

    const resumeInteraction = useCallback(() => {
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = setTimeout(() => {
            setIsPaused(false);
            startAutoScroll();
        }, 6000); // Resume after 6 seconds
    }, [startAutoScroll]);

    // Initial start and cleanup
    useEffect(() => {
        if (reviews.length > 1 && !isPaused) {
            startAutoScroll();
        }
        return () => {
            stopAutoScroll();
            if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
        };
    }, [reviews.length, isPaused, startAutoScroll, stopAutoScroll]);

    const handleDragStart = () => {
        pauseInteraction();
    };

    const handleDragEnd = (event: any, info: any) => {
        if (reviews.length === 0) return;

        // Resume interaction logic triggers the delayed start
        resumeInteraction();

        if (info.offset.x < -50) {
            setCurrentIndex((prev) => (prev + 1) % reviews.length);
        } else if (info.offset.x > 50) {
            setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
        }
    };

    if (reviews.length === 0) {
        return null;
    }

    const currentReview = reviews[currentIndex];

    return (
        <section className="w-full mb-8 text-center px-4 overflow-hidden">
            <h2 className="text-xl bg-gradient-to-r from-[#ff99cc] to-[#cc99ff] bg-clip-text text-transparent font-semibold mb-1">
                What Fans Say
            </h2>
            <p className="text-[#b3b3b3] text-xs mb-2">
                Real reviews from real subscribers
            </p>

            <Link href="/testimonials" className="text-[#ff00cc] text-xs font-semibold hover:underline mb-6 inline-block">
                Read all reviews &rarr;
            </Link>

            <div
                className="relative w-full max-w-sm mx-auto h-48"
                onMouseEnter={() => pauseInteraction()}
                onMouseLeave={() => resumeInteraction()}
                onTouchStart={() => pauseInteraction()}
                onTouchEnd={() => resumeInteraction()}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        className="absolute inset-0 bg-[#140a1e]/60 border border-[#ff00cc]/10 p-6 rounded-2xl text-left backdrop-blur-sm shadow-xl cursor-grab active:cursor-grabbing flex flex-col justify-center"
                    >
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 rounded-full bg-[#ff66cc] text-white flex items-center justify-center font-bold text-sm mr-3 shrink-0">
                                {currentReview.name.charAt(0)}
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold text-sm text-white">
                                    {currentReview.name}
                                </span>
                                <div className="flex text-[#ffcc00] text-xs gap-0.5">
                                    {[...Array(currentReview.rating)].map((_, i) => (
                                        <FaStar key={i} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-300 italic text-sm leading-relaxed select-none">
                            "{currentReview.review || (currentReview as any).text || currentReview.review}"
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex justify-center gap-2 mt-4">
                {reviews.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            pauseInteraction();
                            setCurrentIndex(index);
                            resumeInteraction();
                        }}
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${index === currentIndex ? "bg-[#ff00cc]" : "bg-white/20"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
