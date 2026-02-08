import Image from "next/image";
import { FaLock } from "react-icons/fa";

export default function ProfileHeader() {
    return (
        <header className="flex flex-col items-center text-center mb-8 w-full animate-fadeInDown">
            <div className="relative w-32 h-32 mb-4">
                <div className="absolute inset-0 rounded-full border-[3px] border-[#ff00cc]/50 shadow-[0_0_20px_rgba(255,0,204,0.3)] z-10 pointer-events-none" />
                <Image
                    src="/profile.jpg"
                    alt="ManmohakStree"
                    fill
                    className="rounded-full object-cover p-1"
                    priority
                />
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0a0118] z-20" />
            </div>

            <h1 className="text-3xl font-bold mb-1 bg-gradient-to-r from-white to-[#ffccff] bg-clip-text text-transparent">
                ManmohakStree
            </h1>
            <p className="text-[#ff66cc] text-xs font-semibold mb-2">
                a.k.a drippingYummuJuice
            </p>

            <p className="text-[#b3b3b3] text-sm mb-4">
                Exclusive content • Real vibes • Your fantasy
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#ff00cc]/15 border border-[#ff00cc]/30 rounded-full text-xs font-semibold text-[#ff66cc]">
                <FaLock className="text-[10px]" />
                18+ Only
            </div>
        </header>
    );
}
