import { FaStar } from "react-icons/fa";

export default function Testimonials() {
    return (
        <section className="w-full mb-8 text-center px-2">
            <h2 className="text-xl bg-gradient-to-r from-[#ff99cc] to-[#cc99ff] bg-clip-text text-transparent font-semibold mb-1">
                What Fans Say
            </h2>
            <p className="text-[#b3b3b3] text-xs mb-6">
                Real reviews from real subscribers
            </p>

            <div className="bg-[#140a1e]/60 border border-[#ff00cc]/10 p-6 rounded-2xl text-left backdrop-blur-sm shadow-xl">
                <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#ff66cc] text-white flex items-center justify-center font-bold text-sm mr-3">
                        AS
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold text-sm text-white">Alex S.</span>
                        <div className="flex text-[#ffcc00] text-xs gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} />
                            ))}
                        </div>
                    </div>
                </div>
                <p className="text-gray-300 italic text-sm leading-relaxed">
                    "Best decision I made! The exclusive content is fire and she really cares about her fans."
                </p>
            </div>

            <div className="flex justify-center gap-2 mt-4">
                <span className="w-2 h-2 rounded-full bg-[#ff00cc]" />
                <span className="w-2 h-2 rounded-full bg-white/20" />
                <span className="w-2 h-2 rounded-full bg-white/20" />
                <span className="w-2 h-2 rounded-full bg-white/20" />
            </div>
        </section>
    );
}
