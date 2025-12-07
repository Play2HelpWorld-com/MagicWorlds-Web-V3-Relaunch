"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDE_SPEED = 0.12; // Adjusts how quickly the banner tracks scroll
const MEDIA_ROTATE_INTERVAL = 8000; // Rotate media every 8 seconds
const USE_TEXT_LOGO = true; // Set to true for text logo, false for image logo

// Media types for the banner
interface MediaItem {
  type: "image" | "video" | "poster";
  src: string;
  alt?: string;
  poster?: string; // For video posters
}

// Retro gaming banner media array - easily extendable
const bannerMedia: MediaItem[] = [
  {
    type: "image",
    src: "/images/hero/banner.jpg",
    alt: "Magic Worlds Gaming Universe",
  },
  // Add more items as needed:
  // { type: "video", src: "/videos/hero/gameplay.mp4", poster: "/images/hero/video-poster.jpg" },
  // { type: "image", src: "/images/hero/banner2.jpg", alt: "Epic Battles" },
  // { type: "poster", src: "/images/hero/poster1.jpg", alt: "New Season" },
];

const MarketingBanner = () => {
  const pathname = usePathname() || "/";
  const [bannerPosition, setBannerPosition] = useState(0); // 0 = fully visible, -100 = hidden
  const [isBannerActive, setIsBannerActive] = useState(pathname === "/");
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const positionRef = useRef(0);
  const bannerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const touchStartYRef = useRef<number | null>(null);
  const lastTouchDeltaRef = useRef(0);
  const lastTouchTimeRef = useRef(0);

  const updateBannerPosition = (value: number) => {
    positionRef.current = value;
    setBannerPosition(value);
  };

  // Close banner automatically when leaving the homepage
  useEffect(() => {
    if (pathname !== "/") {
      positionRef.current = -100;
      setBannerPosition(-100);
      setIsBannerActive(false);
      setCurrentMediaIndex(0);
    }
  }, [pathname]);

  // Media rotation effect
  useEffect(() => {
    if (!isBannerActive || bannerMedia.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentMediaIndex((prev) => (prev + 1) % bannerMedia.length);
    }, MEDIA_ROTATE_INTERVAL);

    return () => clearInterval(interval);
  }, [isBannerActive]);

  // Reset media index when banner reopens
  useEffect(() => {
    const handleOpen = () => {
      updateBannerPosition(0);
      setIsBannerActive(true);
      setCurrentMediaIndex(0);
      window.scrollTo({ top: 0, behavior: "auto" });
    };

    window.addEventListener("marketing-banner:open", handleOpen);
    return () =>
      window.removeEventListener("marketing-banner:open", handleOpen);
  }, []);

  useEffect(() => {
    if (!isBannerActive) {
      return;
    }

    const advanceBanner = (delta: number, force = false) => {
      const currentPosition = positionRef.current;
      const atTopOfPage = window.scrollY <= 0;

      const shouldReveal = delta < 0 && atTopOfPage;
      const shouldHide = delta > 0 && currentPosition > -100;

      if (!force && !shouldReveal && !shouldHide) {
        if (currentPosition <= -99.5) {
          setIsBannerActive(false);
          updateBannerPosition(-100);
        }
        return;
      }

      const movement = delta * SLIDE_SPEED;
      let nextPosition = currentPosition - movement;
      nextPosition = Math.min(0, Math.max(-100, nextPosition));
      updateBannerPosition(nextPosition);

      if (nextPosition <= -99.5) {
        setIsBannerActive(false);
        updateBannerPosition(-100);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      const delta = e.deltaY;
      if (delta === 0) return;
      advanceBanner(delta);
      e.preventDefault();
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (!isBannerActive) return;
      touchStartYRef.current = e.touches[0]?.clientY ?? null;
      lastTouchDeltaRef.current = 0;
      lastTouchTimeRef.current = performance.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartYRef.current === null) return;
      const currentY = e.touches[0]?.clientY ?? touchStartYRef.current;
      const delta = touchStartYRef.current - currentY;
      lastTouchDeltaRef.current = delta;
      lastTouchTimeRef.current = performance.now();
      advanceBanner(delta * 1.5, true);
      e.preventDefault();
    };

    const handleTouchEnd = () => {
      const now = performance.now();
      const timeDelta = Math.max(now - lastTouchTimeRef.current, 1);
      const velocity = lastTouchDeltaRef.current / timeDelta;
      const progress = Math.abs(positionRef.current);

      const shouldDismiss =
        progress >= 60 ||
        Math.abs(velocity) > 0.5 ||
        positionRef.current <= -90;

      if (shouldDismiss) {
        setIsBannerActive(false);
        updateBannerPosition(-100);
      } else {
        updateBannerPosition(0);
      }

      touchStartYRef.current = null;
      lastTouchDeltaRef.current = 0;
      lastTouchTimeRef.current = now;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    window.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isBannerActive, bannerPosition]);

  if (!isBannerActive) {
    return null;
  }

  const currentMedia = bannerMedia[currentMediaIndex];

  return (
    <div
      ref={bannerRef}
      className="fixed inset-0 z-50 h-screen w-full overflow-hidden bg-black"
      style={{
        transform: `translateY(${bannerPosition}%)`,
        transition: "transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
        willChange: "transform",
        touchAction: "none",
      }}
    >
      <button
        type="button"
        aria-label="Close marketing banner"
        className="absolute right-4 top-4 z-50 rounded-full bg-black/60 p-2 text-white shadow-lg backdrop-blur-md transition hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
        onClick={() => {
          updateBannerPosition(-100);
          setIsBannerActive(false);
        }}
      >
        <svg
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="block"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      {/* Retro Gaming Background with Media Rotation */}
      <div className="absolute inset-0 h-full w-full">
        <AnimatePresence mode="wait">
          {currentMedia.type === "video" ? (
            <motion.video
              key={`video-${currentMediaIndex}`}
              ref={videoRef}
              src={currentMedia.src}
              poster={currentMedia.poster}
              autoPlay
              muted
              loop
              playsInline
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="h-full w-full object-cover"
            />
          ) : (
            <motion.div
              key={`image-${currentMediaIndex}`}
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="h-full w-full"
            >
              <Image
                src={currentMedia.src}
                alt={currentMedia.alt || "Magic Worlds"}
                fill
                priority
                quality={100}
                className="object-cover object-center"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Retro CRT Scanline Effect - Subtle */}
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.1)_0px,transparent_1px,transparent_2px,rgba(0,0,0,0.1)_3px)] opacity-15" />

        {/* Subtle Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.4)_100%)]" />

        {/* Minimal gradient overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />
      </div>

      {/* Retro Gaming Content - Centered & Minimal */}
      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-white">
        {/* Epic Gaming Logo - Centered */}
        <div className="space-y-8">
          {/* Logo controlled by USE_TEXT_LOGO */}
          {USE_TEXT_LOGO ? (
            <div className="relative">
              {/* Game-themed bold text design */}
              <h1 className="relative font-inter text-6xl font-black uppercase leading-[0.85] tracking-wide text-white sm:text-7xl lg:text-8xl xl:text-9xl">
                <span
                  className="relative block"
                  style={{
                    WebkitTextStroke: "3px rgba(255, 255, 255, 0.4)",
                    paintOrder: "stroke fill",
                    textShadow: "4px 4px 8px rgba(0, 0, 0, 0.8)",
                  }}
                >
                  MAGIC
                </span>
                <span
                  className="relative block"
                  style={{
                    WebkitTextStroke: "3px rgba(255, 255, 255, 0.4)",
                    paintOrder: "stroke fill",
                    textShadow: "4px 4px 8px rgba(0, 0, 0, 0.8)",
                  }}
                >
                  WORLDS
                </span>
              </h1>
            </div>
          ) : (
            <div
              className="relative mx-auto h-48 w-auto sm:h-56 lg:h-64 xl:h-80 2xl:h-96"
              style={{
                filter:
                  "drop-shadow(0 0 30px rgba(168,85,247,0.8)) drop-shadow(0 8px 16px rgba(0,0,0,0.9))",
              }}
            >
              <Image
                src="/banner-logo.png"
                alt="Magic Worlds"
                width={800}
                height={300}
                priority
                className="h-full w-auto object-contain"
              />
            </div>
          )}
        </div>

        {/* Minimalist Gaming Action Buttons */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-6">
          {/* Play Now - Full Indigo Gradient with 3D Glow */}
          <button
            className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-[#f472b6] via-[#ec4899] to-[#9333ea] px-10 py-4 font-bold uppercase tracking-wider text-white transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              boxShadow:
                "0 0 20px rgba(236, 72, 153, 0.5), 0 0 40px rgba(147, 51, 234, 0.3), 0 8px 16px rgba(0, 0, 0, 0.4)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#f9a8d4] via-[#f472b6] to-[#a855f7] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span
              className="relative z-10 flex items-center gap-3 text-lg"
              style={{
                filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8))",
              }}
            >
              <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play Now
            </span>
          </button>

          {/* Join Discord - Discord Brand Colors Gradient with 3D Glow */}
          <button
            className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-[#5865F2] via-[#5865F2] to-[#4752C4] px-10 py-4 font-bold uppercase tracking-wider text-white transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              boxShadow:
                "0 0 20px rgba(88, 101, 242, 0.5), 0 0 40px rgba(88, 101, 242, 0.3), 0 8px 16px rgba(0, 0, 0, 0.4)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#7289DA] via-[#5865F2] to-[#4752C4] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span
              className="relative z-10 flex items-center gap-3 text-lg"
              style={{
                filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8))",
              }}
            >
              <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Join Discord
            </span>
          </button>
        </div>

        {/* Gaming Scroll Indicator - Symmetrical Design */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-3">
            {/* Animated Mouse/Scroll Icon */}
            <div
              className="relative flex h-12 w-8 items-start justify-center rounded-full border-2 border-cyan-400/60 bg-black/40 p-1.5 backdrop-blur-sm"
              style={{
                boxShadow:
                  "0 0 15px rgba(34,211,238,0.4), inset 0 0 10px rgba(34,211,238,0.1)",
              }}
            >
              <div
                className="h-1.5 w-1.5 rounded-full bg-cyan-400"
                style={{
                  animation: "scroll-bounce 1.8s ease-in-out infinite",
                  boxShadow: "0 0 8px rgba(34,211,238,0.9)",
                }}
              />
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll-bounce {
            0%,
            100% {
              transform: translateY(0);
              opacity: 1;
            }
            50% {
              transform: translateY(10px);
              opacity: 0.5;
            }
          }
        `}</style>

        {/* Media Progress Indicator - Optimized */}
        {bannerMedia.length > 1 && (
          <div className="absolute bottom-24 left-1/2 flex -translate-x-1/2 gap-2">
            {bannerMedia.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ease-out ${
                  index === currentMediaIndex
                    ? "w-8 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                    : "w-2 bg-cyan-400/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketingBanner;
