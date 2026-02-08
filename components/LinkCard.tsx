import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

// Added 'reddit' to the Platform type
export type Platform = "onlyfans" | "fansly" | "instagram" | "telegram" | "discord" | "signal" | "reddit";

interface LinkCardProps {
    platform: Platform;
    label: string;
    description: string;
    url: string;
    icon: IconType;
}

const colorMap: Record<Platform, string> = {
    onlyfans: "from-[#00aff0] to-[#0077b5] group-hover:from-[#00aff0] group-hover:to-[#0077b5]",
    fansly: "from-[#20c997] to-[#0c8599] group-hover:from-[#20c997] group-hover:to-[#0c8599]",
    instagram: "from-[#f09433] via-[#dc2743] to-[#bc1888] group-hover:from-[#f09433] group-hover:via-[#dc2743] group-hover:to-[#bc1888]",
    telegram: "from-[#2aabee] to-[#229ed9] group-hover:from-[#2aabee] group-hover:to-[#229ed9]",
    discord: "from-[#5865F2] to-[#4752C4] group-hover:from-[#5865F2] group-hover:to-[#4752C4]",
    signal: "from-[#3a76f0] to-[#3a55f0] group-hover:from-[#3a76f0] group-hover:to-[#3a55f0]",
    reddit: "from-[#ff4500] to-[#ff8700] group-hover:from-[#ff4500] group-hover:to-[#ff8700]",
};

const iconBgMap: Record<Platform, string> = {
    onlyfans: "bg-[#00aff0]/20 text-[#00aff0]",
    fansly: "bg-[#20c997]/20 text-[#20c997]",
    instagram: "bg-[#e1306c]/20 text-[#e1306c]",
    telegram: "bg-[#2aabee]/20 text-[#2aabee]",
    discord: "bg-[#5865F2]/20 text-[#5865F2]",
    signal: "bg-[#3a76f0]/20 text-[#3a76f0]",
    reddit: "bg-[#ff4500]/20 text-[#ff4500]",
};

export default function LinkCard({ platform, label, description, url, icon: Icon }: LinkCardProps) {
    return (
        <Link
            href={url}
            className="group relative flex items-center p-4 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:border-white/20 w-full"
        >
            <div
                className={twMerge(
                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br",
                    colorMap[platform].split(" ").filter(c => c.startsWith("group-hover")).map(c => c.replace("group-hover:", "")).join(" ")
                )}
            />
            <div className={twMerge("absolute inset-0 translate-x-[-100%] group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent z-0")} />

            <div className={twMerge("relative z-10 w-12 h-12 rounded-xl flex items-center justify-center mr-4 transition-colors duration-300 group-hover:bg-white/20 group-hover:text-white", iconBgMap[platform])}>
                <Icon className="text-2xl" />
            </div>

            <div className="relative z-10 flex-grow flex flex-col">
                <span className="font-bold text-lg leading-tight group-hover:text-white transition-colors">{label}</span>
                <span className="text-sm text-[#b3b3b3] group-hover:text-white/90 transition-colors">{description}</span>
            </div>

            <div className="relative z-10 text-[#b3b3b3] text-sm transform transition-all duration-300 group-hover:translate-x-1 group-hover:text-white">
                <FaArrowRight />
            </div>
        </Link>
    );
}
