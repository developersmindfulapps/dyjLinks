import ProfileHeader from "@/components/ProfileHeader";
import LinkCard, { Platform } from "@/components/LinkCard";
import HomepageCarousel from "@/components/HomepageCarousel";
import SocialFooter from "@/components/SocialFooter";
import StatsSection from "@/components/StatsSection";
import { FaTelegramPlane, FaStar, FaReddit } from "react-icons/fa";
import { IconType } from "react-icons";

// Data Structure for Links
interface LinkData {
  id: string;
  platform: Platform;
  label: string;
  description: string;
  url: string;
  icon: IconType;
}

const links: LinkData[] = [
  {
    id: "fansly",
    platform: "fansly",
    label: "Fansly",
    description: "Exclusive VIP tier access",
    url: "https://fansly.com/DrippingYummyJuices",
    icon: FaStar,
  },
  {
    id: "telegram-profile",
    platform: "telegram",
    label: "Telegram Profile",
    description: "DM for custom requests",
    url: "https://t.me/desi69lady",
    icon: FaTelegramPlane,
  },
  {
    id: "telegram-channel",
    platform: "telegram",
    label: "Telegram Channel",
    description: "Join the exclusive channel",
    url: "https://t.me/manmohakstree",
    icon: FaTelegramPlane,
  },
  {
    id: "reddit",
    platform: "reddit",
    label: "Reddit",
    description: "Upvote my posts",
    url: "https://www.reddit.com/u/ManmohakStree/s/JhczLJKFFM",
    icon: FaReddit,
  },
];

export default function Home() {
  return (
    <div className="w-full max-w-md md:max-w-xl flex flex-col items-center gap-6 z-10">
      <ProfileHeader />

      <section className="w-full flex flex-col gap-4 mb-2">
        <StatsSection />
        {links.map((link) => (
          <LinkCard
            key={link.id}
            platform={link.platform}
            label={link.label}
            description={link.description}
            url={link.url}
            icon={link.icon}
          />
        ))}
      </section>

      <HomepageCarousel />

      <SocialFooter />
    </div>
  );
}
