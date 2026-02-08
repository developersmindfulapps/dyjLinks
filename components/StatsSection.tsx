"use client";

import { FaUserFriends, FaStar, FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function StatsSection() {
    const [stats, setStats] = useState({
        rating: "4.89",
        satisfied: "99"
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data, error } = await supabase
                    .from("reviews")
                    .select("rating");

                if (error) {
                    console.error("Error fetching stats:", error);
                    return;
                }

                if (data) {
                    const totalReviews = data.length;

                    // Calculate Rating
                    // If total reviews < 15 -> show static 4.89
                    // If total reviews >= 15 -> calculate average rating
                    let newRating = "4.89";
                    if (totalReviews >= 15) {
                        const sum = data.reduce((acc, curr) => acc + curr.rating, 0);
                        newRating = (sum / totalReviews).toFixed(2);
                    }

                    // Calculate Satisfied
                    // Satisfied = ratings 3-5
                    // Formula: (count of satisfied reviews / total reviews) * 100
                    let newSatisfied = "99";
                    if (totalReviews > 0) {
                        const satisfiedCount = data.filter(r => r.rating >= 3).length;
                        newSatisfied = Math.round((satisfiedCount / totalReviews) * 100).toString();
                    }

                    setStats({
                        rating: newRating,
                        satisfied: newSatisfied
                    });
                }
            } catch (err) {
                console.error("Unexpected error fetching stats:", err);
            }
        };

        fetchStats();
    }, []);

    return (
        <section className="w-full grid grid-cols-3 gap-2 px-2 mb-8">
            <div className="bg-[#140a1e]/60 border border-[#ff00cc]/10 rounded-xl p-3 flex flex-col items-center text-center backdrop-blur-sm">
                <FaUserFriends className="text-[#ff00cc] text-xl mb-1" />
                <span className="font-bold text-lg text-white">100+</span>
                <span className="text-[10px] text-[#b3b3b3] uppercase tracking-wide">Clients</span>
            </div>
            <div className="bg-[#140a1e]/60 border border-[#ff00cc]/10 rounded-xl p-3 flex flex-col items-center text-center backdrop-blur-sm">
                <FaStar className="text-[#ffcc00] text-xl mb-1" />
                <span className="font-bold text-lg text-white">{stats.rating}</span>
                <span className="text-[10px] text-[#b3b3b3] uppercase tracking-wide">Rating</span>
            </div>
            <div className="bg-[#140a1e]/60 border border-[#ff00cc]/10 rounded-xl p-3 flex flex-col items-center text-center backdrop-blur-sm">
                <FaHeart className="text-red-500 text-xl mb-1" />
                <span className="font-bold text-lg text-white">{stats.satisfied}%</span>
                <span className="text-[10px] text-[#b3b3b3] uppercase tracking-wide">Satisfied</span>
            </div>
        </section>
    );
}
