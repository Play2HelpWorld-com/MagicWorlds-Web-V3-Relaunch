"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Fullscreen,
  Maximize2,
  X,
  Gamepad2,
  Trophy,
  Users,
  Star,
  TrendingUp,
  Eye,
} from "lucide-react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

interface GameplayVideo {
  id: string;
  title: string;
  genre: string;
  duration: string;
  videoUrl: string;
  thumbnailUrl: string;
  views: string;
  uploadDate: string;
}

// Static video data
const GAMEPLAY_VIDEOS: GameplayVideo[] = [
  {
    id: "1",
    title: "Learning World: AI Tutor Mastery",
    genre: "Educational RPG",
    duration: "12:45",
    videoUrl: "/videos/worlds/gameplay-1.mp4",
    thumbnailUrl: "/images/thumbnails/gameplay-1.jpg",
    views: "1.2M",
    uploadDate: "2 days ago",
  },
  {
    id: "2",
    title: "Sport World: Extreme Soccer Showdown",
    genre: "Sports",
    duration: "8:32",
    videoUrl: "/videos/worlds/gameplay-2.mp4",
    thumbnailUrl: "/images/thumbnails/gameplay-2.jpg",
    views: "845K",
    uploadDate: "1 week ago",
  },
  {
    id: "3",
    title: "AI World: Cybernetic Battle Arena",
    genre: "Sci-Fi Strategy",
    duration: "15:07",
    videoUrl: "/videos/worlds/gameplay-3.mp4",
    thumbnailUrl: "/images/thumbnails/gameplay-3.jpg",
    views: "3.7M",
    uploadDate: "3 days ago",
  },
  {
    id: "4",
    title: "Music World: Ultimate DJ Remix Challenge",
    genre: "Rhythm",
    duration: "10:21",
    videoUrl: "/videos/worlds/gameplay-4.mp4",
    thumbnailUrl: "/images/thumbnails/gameplay-4.jpg",
    views: "698K",
    uploadDate: "5 hours ago",
  },
  {
    id: "5",
    title: "Farm World: Epic Harvest Season",
    genre: "Simulation",
    duration: "6:18",
    videoUrl: "/videos/worlds/gameplay-5.mp4",
    thumbnailUrl: "/images/thumbnails/gameplay-5.jpg",
    views: "2.1M",
    uploadDate: "2 weeks ago",
  },
  {
    id: "6",
    title: "Magic Worlds: The Grand Sorcerer's Quest",
    genre: "Fantasy RPG",
    duration: "9:45",
    videoUrl: "/videos/worlds/gameplay-6.mp4",
    thumbnailUrl: "/images/thumbnails/gameplay-6.jpg",
    views: "1.5M",
    uploadDate: "1 day ago",
  },
  {
    id: "7",
    title: "Space World: Alien Galaxy Exploration",
    genre: "Sci-Fi Adventure",
    duration: "7:33",
    videoUrl: "/videos/worlds/gameplay-7.mp4",
    thumbnailUrl: "/images/thumbnails/gameplay-7.jpg",
    views: "922K",
    uploadDate: "4 days ago",
  },
  {
    id: "8",
    title: "War World: Battle of the Titans",
    genre: "FPS",
    duration: "14:22",
    videoUrl: "/videos/worlds/gameplay-8.mp4",
    thumbnailUrl: "/images/thumbnails/gameplay-8.jpg",
    views: "1.8M",
    uploadDate: "12 hours ago",
  },
  {
    id: "9",
    title: "Racing World: Hyperdrive Grand Prix",
    genre: "Racing",
    duration: "11:09",
    videoUrl: "/videos/worlds/gameplay-9.mp4",
    thumbnailUrl: "/images/thumbnails/gameplay-9.jpg",
    views: "762K",
    uploadDate: "3 weeks ago",
  },
  {
    id: "10",
    title: "Survival World: Island Escape Challenge",
    genre: "Survival",
    duration: "5:47",
    videoUrl: "/videos/worlds/gameplay-10.mp4",
    thumbnailUrl: "/images/thumbnails/gameplay-10.jpg",
    views: "4.2M",
    uploadDate: "Just now",
  },
  {
    id: "11",
    title: "AI World: Sentient Machine Revolution",
    genre: "Sci-Fi RPG",
    duration: "16:38",
    videoUrl: "/videos/worlds/gameplay-11.mp4",
    thumbnailUrl: "/images/thumbnails/gameplay-11.jpg",
    views: "552K",
    uploadDate: "8 hours ago",
  },
  {
    id: "12",
    title: "Music World: Battle of the Bands",
    genre: "Rhythm",
    duration: "13:15",
    videoUrl: "/videos/worlds/gameplay-12.mp4",
    thumbnailUrl: "/images/thumbnails/gameplay-12.jpg",
    views: "1.1M",
    uploadDate: "Yesterday",
  },
  {
    id: "13",
    title: "Learning World: History's Greatest Mysteries",
    genre: "Educational",
    duration: "10:00",
    videoUrl: "/videos/worlds/gameplay-1.mp4",
    thumbnailUrl: "/images/thumbnails/gameplay-1.jpg",
    views: "890K",
    uploadDate: "2 days ago",
  },
  {
    id: "14",
    title: "Farm World: The Great Animal Rescue",
    genre: "Simulation",
    duration: "8:15",
    videoUrl: "/videos/worlds/gameplay-2.mp4",
    thumbnailUrl: "/images/thumbnails/gameplay-2.jpg",
    views: "1.3M",
    uploadDate: "1 week ago",
  },
  {
    id: "15",
    title: "Magic Worlds: Wizard's Tower Defense",
    genre: "Tower Defense",
    duration: "12:30",
    videoUrl: "/videos/worlds/gameplay-3.mp4",
    thumbnailUrl: "/images/thumbnails/gameplay-3.jpg",
    views: "2.4M",
    uploadDate: "3 days ago",
  },
];

const EpicGamingShowcase: React.FC = () => {
  // State management
  const [videos] = useState<GameplayVideo[]>(GAMEPLAY_VIDEOS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Muted by default to prevent autoplay issues
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [videoCategory, setVideoCategory] = useState("All");
  const [videoReady, setVideoReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

  // Animation controls
  const mainVideoControls = useAnimation();
  const loaderControls = useAnimation();
  const titleControls = useAnimation();

  // Simulate loading data
  useEffect(() => {
    const loadingInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(loadingInterval);
          setTimeout(() => {
            loaderControls.start({
              opacity: 0,
              y: -50,
              transition: { duration: 0.8, ease: "easeInOut" },
            });

            // Start playing the first video when loading is complete
            if (isInitialLoad && videoRef.current && videoReady) {
              attemptAutoplay();
            }
          }, 300);
        }
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 100);

    return () => clearInterval(loadingInterval);
  }, [loaderControls, isInitialLoad, videoReady]);

  // Attempt autoplay with fallbacks
  const attemptAutoplay = async () => {
    if (!videoRef.current) return;

    try {
      // Always ensure it's muted for initial autoplay (browsers require this)
      videoRef.current.muted = true;
      setIsMuted(true);

      await videoRef.current.play();
      setIsPlaying(true);
      setIsInitialLoad(false);
    } catch (error) {
      console.error("Autoplay failed:", error);
      // If autoplay fails, at least get the video ready
      setIsPlaying(false);
    }
  };

  // Handle video loading and time updates
  useEffect(() => {
    if (videoRef.current) {
      const videoElement = videoRef.current;

      const handleCanPlay = () => {
        setVideoReady(true);
        setDuration(videoElement.duration || 0);

        // If this is the initial load and loading is complete, try to play
        if (isInitialLoad && loadingProgress >= 100) {
          attemptAutoplay();
        }
      };

      const handleTimeUpdate = () => {
        setCurrentTime(videoElement.currentTime || 0);
      };

      const handleEnded = () => {
        setIsPlaying(false);
        handleNextVideo();
      };

      const handleLoadedMetadata = () => {
        setDuration(videoElement.duration || 0);
      };

      const handlePlayEvent = () => {
        setIsPlaying(true);
      };

      const handlePauseEvent = () => {
        setIsPlaying(false);
      };

      // Set event listeners
      videoElement.addEventListener("canplay", handleCanPlay);
      videoElement.addEventListener("timeupdate", handleTimeUpdate);
      videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
      videoElement.addEventListener("ended", handleEnded);
      videoElement.addEventListener("play", handlePlayEvent);
      videoElement.addEventListener("pause", handlePauseEvent);

      // Trigger a load for the video if needed
      if (videoElement.readyState >= 2) {
        // Already loaded enough
        handleCanPlay();
      } else {
        videoElement.load();
      }

      return () => {
        // Clean up event listeners
        videoElement.removeEventListener("canplay", handleCanPlay);
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
        videoElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata,
        );
        videoElement.removeEventListener("ended", handleEnded);
        videoElement.removeEventListener("play", handlePlayEvent);
        videoElement.removeEventListener("pause", handlePauseEvent);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, isInitialLoad, loadingProgress]);

  // Setup thumbnail hover effects
  useEffect(() => {
    // Handle thumbnail hover videos
    const thumbnailElements = Array.from(thumbnailRefs.current.values());
    thumbnailElements.forEach((video) => {
      if (!video) return;

      const handleMouseEnter = () => {
        if (video.paused) {
          video.currentTime = 0;
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch((error) =>
              console.error("Thumbnail play error:", error),
            );
          }
        }
      };

      const handleMouseLeave = () => {
        if (!video.paused) {
          video.pause();
          video.currentTime = 0;
        }
      };

      video.addEventListener("mouseenter", handleMouseEnter);
      video.parentElement?.addEventListener("mouseenter", handleMouseEnter);
      video.addEventListener("mouseleave", handleMouseLeave);
      video.parentElement?.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        video.removeEventListener("mouseenter", handleMouseEnter);
        video.parentElement?.removeEventListener(
          "mouseenter",
          handleMouseEnter,
        );
        video.removeEventListener("mouseleave", handleMouseLeave);
        video.parentElement?.removeEventListener(
          "mouseleave",
          handleMouseLeave,
        );
      };
    });
  }, [videos, videoCategory]);

  // Video playback helper functions (must be defined before handleVideoSelect)
  const attemptPlayback = useCallback(async () => {
    if (!videoRef.current || !videoReady) return;

    try {
      await videoRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Play error:", error);
      setIsPlaying(false);
    }
  }, [videoReady]);

  const handlePlayPause = useCallback(() => {
    if (videoRef.current && videoReady) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error("Play error:", error);
              setIsPlaying(false);
            });
        }
      }
    }
  }, [videoReady, isPlaying]);

  const handleNextVideo = useCallback(() => {
    const newIndex = (activeIndex + 1) % videos.length;
    handleVideoSelect(newIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, videos.length]);

  const handlePrevVideo = () => {
    const newIndex = (activeIndex - 1 + videos.length) % videos.length;
    handleVideoSelect(newIndex);
  };

  // Video playback controls
  const handleVideoSelect = useCallback(
    async (index: number) => {
      // Already selected
      if (index === activeIndex) {
        handlePlayPause();
        return;
      }

      // Pause current video first to prevent AbortError
      if (videoRef.current && isPlaying) {
        videoRef.current.pause();
      }

      setVideoReady(false);
      setCurrentTime(0);
      setIsPlaying(false);

      // Animate out current video
      await mainVideoControls.start({
        opacity: 0,
        scale: 0.95,
        transition: { duration: 0.3 },
      });

      // Set new video
      setActiveIndex(index);

      // Animate in new video
      await mainVideoControls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: "easeOut" },
      });

      // Animate title
      titleControls
        .start({
          opacity: 0,
          y: 20,
          transition: { duration: 0.2 },
        })
        .then(() => {
          setTimeout(() => {
            titleControls.start({
              opacity: 1,
              y: 0,
              transition: { duration: 0.4, ease: "easeOut" },
            });
          }, 300);
        });

      // Try to play the new video
      if (videoRef.current) {
        // Let's wait for the video to be ready
        const checkAndPlay = () => {
          if (videoRef.current && videoReady) {
            attemptPlayback();
          } else {
            // Try again in a moment
            setTimeout(checkAndPlay, 100);
          }
        };

        checkAndPlay();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [
      activeIndex,
      isPlaying,
      mainVideoControls,
      titleControls,
      videoReady,
      handlePlayPause,
      attemptPlayback,
    ],
  );

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);

      // Also update modal video if it exists
      if (modalVideoRef.current) {
        modalVideoRef.current.muted = !isMuted;
      }
    }
  };

  const handleFullScreen = () => {
    if (videoRef.current) {
      if (!isFullScreen) {
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen();
        } else if ((videoRef.current as any).webkitRequestFullscreen) {
          (videoRef.current as any).webkitRequestFullscreen();
        } else if ((videoRef.current as any).mozRequestFullScreen) {
          (videoRef.current as any).mozRequestFullScreen();
        } else if ((videoRef.current as any).msRequestFullscreen) {
          (videoRef.current as any).msRequestFullscreen();
        }
      }
      setIsFullScreen(!isFullScreen);
    }
  };

  const handleOpenModal = () => {
    // Pause the main video when opening modal
    if (videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setShowModal(true);

    // Ensure we sync the modal video with main video
    setTimeout(() => {
      if (modalVideoRef.current && videoRef.current) {
        modalVideoRef.current.currentTime = videoRef.current.currentTime;
        modalVideoRef.current.muted = isMuted;
      }
    }, 100);
  };

  const handleCloseModal = () => {
    // Sync main video with modal video position
    if (videoRef.current && modalVideoRef.current) {
      videoRef.current.currentTime = modalVideoRef.current.currentTime;
    }

    // Pause the modal video
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }

    setShowModal(false);

    // Resume main video if it was playing before
    if (videoRef.current && isPlaying) {
      videoRef.current
        .play()
        .catch((err) => console.error("Failed to resume main video:", err));
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && videoRef.current && duration > 0) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const pos = Math.max(
        0,
        Math.min(1, (e.clientX - rect.left) / rect.width),
      );
      const newTime = pos * duration;

      // Update video time
      videoRef.current.currentTime = newTime;

      // Also update our state (for immediate UI update)
      setCurrentTime(newTime);
    }
  };

  // Format time function for displaying current time / duration
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Assign a thumbnail ref
  const setThumbnailRef = (element: HTMLVideoElement | null, id: string) => {
    if (element) {
      thumbnailRefs.current.set(id, element);
    } else {
      thumbnailRefs.current.delete(id);
    }
  };

  // Filter videos by category
  const filteredVideos =
    videoCategory === "All"
      ? videos
      : videos.filter((video) => video.genre === videoCategory);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const cardHoverVariants = {
    rest: { scale: 1, boxShadow: "0px 0px 0px rgba(124, 58, 237, 0)" },
    hover: {
      scale: 1.02,
      boxShadow: "0px 0px 20px rgba(124, 58, 237, 0.7)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const progressBarVariants = {
    initial: { width: "0%" },
    animate: (progress: number) => ({
      width: `${progress}%`,
      transition: { duration: 0.5, ease: "easeOut" },
    }),
  };

  // Categories for filtering
  const categories = [
    "All",
    "Fantasy RPG",
    "Educational",
    "Sports",
    "Sci-Fi Strategy",
    "Rhythm",
    "Simulation",
    "Adventure",
    "FPS",
    "Racing",
    "Survival",
    "Tower Defense",
  ];

  // Calculate progress percentage safely
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-purple-600/30 blur-[120px]" />
        <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-fuchsia-600/30 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-[600px] w-[600px] rounded-full bg-cyan-600/20 blur-[120px]" />
      </div>

      {/* Loading Screen */}
      <AnimatePresence>
        {loadingProgress < 100 && (
          <motion.div
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-black via-purple-950 to-black"
            initial={{ opacity: 1 }}
            animate={loaderControls}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <motion.div
              className="mb-8 flex items-center gap-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Gamepad2 className="h-12 w-12 text-purple-400" />
              <h2 className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-3xl font-black text-transparent">
                LOADING WORLDS
              </h2>
            </motion.div>
            <motion.div
              className="relative h-3 w-80 overflow-hidden rounded-full bg-gray-800/50 ring-1 ring-purple-500/30"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { delay: 0.4, duration: 0.6 },
              }}
            >
              <motion.div
                className="absolute h-full rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500"
                variants={progressBarVariants}
                initial="initial"
                animate="animate"
                custom={loadingProgress}
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>
            <motion.p
              className="mt-4 text-sm font-medium text-purple-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {loadingProgress}% Complete
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-32">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div
            className="mb-4 flex items-center justify-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Trophy className="h-10 w-10 text-yellow-400" />
            <h1 className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text font-orbitron text-6xl font-black uppercase tracking-wider text-transparent">
              Worlds Vault
            </h1>
            <Trophy className="h-10 w-10 text-yellow-400" />
          </motion.div>
          <p className="mx-auto max-w-3xl font-rajdhani text-xl font-medium text-gray-300">
            Dive into epic gameplay moments from across the multiverse. Watch,
            explore, and experience the magic! 🎮
          </p>

          {/* Stats Bar */}
          <motion.div
            className="mx-auto mt-8 flex max-w-2xl justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-6 py-3 backdrop-blur-sm">
              <Eye className="h-5 w-5 text-cyan-400" />
              <span className="font-rajdhani text-sm font-bold text-white">
                {videos.length} Videos
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-6 py-3 backdrop-blur-sm">
              <Users className="h-5 w-5 text-fuchsia-400" />
              <span className="font-rajdhani text-sm font-bold text-white">
                2.5M Views
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-6 py-3 backdrop-blur-sm">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="font-rajdhani text-sm font-bold text-white">
                4.8 Rating
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Category Selection */}
        <motion.div
          className="mb-12 overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="flex gap-3 pb-2">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className={`group relative overflow-hidden whitespace-nowrap rounded-xl px-6 py-3 font-rajdhani text-sm font-bold uppercase tracking-wide transition-all ${
                  videoCategory === category
                    ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-500/50"
                    : "border border-white/10 bg-white/5 text-gray-300 hover:border-purple-500/50 hover:text-white"
                }`}
                onClick={() => setVideoCategory(category)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.05 }}
              >
                {videoCategory === category && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-fuchsia-600"
                    layoutId="activeCategory"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Featured Video */}
        <motion.div
          ref={showcaseRef}
          className="mb-16"
          initial={{ opacity: 1 }}
          animate={mainVideoControls}
        >
          {videos.length > 0 && (
            <div className="group relative overflow-hidden rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-900/20 via-black to-fuchsia-900/20 p-1 shadow-2xl shadow-purple-500/20">
              {/* Glowing Border Animation */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-30" />

              <motion.div
                className="relative aspect-video w-full overflow-hidden rounded-xl bg-black"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <video
                  ref={videoRef}
                  className="h-full w-full rounded-xl object-contain"
                  src={videos[activeIndex]?.videoUrl}
                  poster={
                    !videoReady ? videos[activeIndex]?.thumbnailUrl : undefined
                  }
                  playsInline
                  muted={isMuted}
                  preload="auto"
                />

                {/* Play button overlay when paused */}
                {!isPlaying && videoReady && (
                  <div
                    className="absolute inset-0 flex cursor-pointer items-center justify-center bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-300 hover:from-black/90 hover:via-black/60"
                    onClick={handlePlayPause}
                  >
                    <motion.div
                      className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 shadow-2xl shadow-purple-500/50"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(168, 85, 247, 0.5)",
                          "0 0 40px rgba(168, 85, 247, 0.8)",
                          "0 0 20px rgba(168, 85, 247, 0.5)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Play size={40} className="ml-2 text-white" />
                    </motion.div>
                  </div>
                )}

                {/* Video Controls Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black via-transparent to-black/40 p-6 opacity-0 transition-opacity duration-300 hover:opacity-100">
                  {/* Top Controls */}
                  <div className="flex items-start justify-between">
                    <motion.div
                      animate={titleControls}
                      initial={{ opacity: 0, y: 20 }}
                      className="max-w-2xl"
                    >
                      <h3 className="mb-2 font-orbitron text-3xl font-black uppercase text-white drop-shadow-2xl">
                        {videos[activeIndex]?.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 font-rajdhani text-sm font-medium">
                        <span className="flex items-center gap-1 rounded-full border border-purple-400/30 bg-purple-500/20 px-3 py-1 text-purple-200 backdrop-blur-sm">
                          <TrendingUp className="h-4 w-4" />
                          {videos[activeIndex]?.genre}
                        </span>
                        <span className="flex items-center gap-1 text-gray-300">
                          <Eye className="h-4 w-4" />
                          {videos[activeIndex]?.views} views
                        </span>
                        <span className="text-gray-400">
                          {videos[activeIndex]?.uploadDate}
                        </span>
                      </div>
                    </motion.div>
                    <motion.button
                      className="rounded-full border border-white/20 bg-black/60 p-3 text-white backdrop-blur-sm transition-all hover:border-purple-400 hover:bg-black/80"
                      onClick={handleOpenModal}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Maximize2 size={24} />
                    </motion.button>
                  </div>

                  {/* Bottom Controls */}
                  <div className="space-y-3">
                    {/* Progress Bar */}
                    <div
                      ref={progressBarRef}
                      className="group/bar relative h-2 w-full cursor-pointer overflow-hidden rounded-full bg-white/10 backdrop-blur-sm"
                      onClick={handleSeek}
                    >
                      <motion.div
                        className="absolute h-full origin-left rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500"
                        style={{ width: `${progressPercentage}%` }}
                        animate={{
                          boxShadow: [
                            "0 0 10px rgba(168, 85, 247, 0.5)",
                            "0 0 20px rgba(168, 85, 247, 0.8)",
                            "0 0 10px rgba(168, 85, 247, 0.5)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <motion.div
                        className="absolute h-4 w-4 -translate-x-1/2 translate-y-[-25%] rounded-full border-2 border-white bg-gradient-to-r from-purple-500 to-fuchsia-500 opacity-0 shadow-lg transition-opacity duration-200 group-hover/bar:opacity-100"
                        style={{ left: `${progressPercentage}%` }}
                      />
                    </div>

                    {/* Control Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <motion.button
                          className="rounded-full border border-white/20 bg-black/60 p-3 text-white backdrop-blur-sm transition-all hover:border-purple-400 hover:bg-purple-600"
                          onClick={handlePlayPause}
                          disabled={!videoReady}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                        </motion.button>
                        <motion.button
                          className="rounded-full border border-white/20 bg-black/60 p-3 text-white backdrop-blur-sm transition-all hover:border-fuchsia-400 hover:bg-fuchsia-600"
                          onClick={handleMuteToggle}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {isMuted ? (
                            <VolumeX size={20} />
                          ) : (
                            <Volume2 size={20} />
                          )}
                        </motion.button>
                        <span className="min-w-[100px] font-rajdhani text-sm font-bold text-white">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.button
                          className="rounded-full border border-white/20 bg-black/60 p-3 text-white backdrop-blur-sm transition-all hover:border-cyan-400 hover:bg-cyan-600"
                          onClick={handlePrevVideo}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ChevronLeft size={20} />
                        </motion.button>
                        <motion.button
                          className="rounded-full border border-white/20 bg-black/60 p-3 text-white backdrop-blur-sm transition-all hover:border-cyan-400 hover:bg-cyan-600"
                          onClick={handleNextVideo}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ChevronRight size={20} />
                        </motion.button>
                        <motion.button
                          className="rounded-full border border-white/20 bg-black/60 p-3 text-white backdrop-blur-sm transition-all hover:border-yellow-400 hover:bg-yellow-600"
                          onClick={handleFullScreen}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Fullscreen size={20} />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* Video Grid - Vertical Layout */}
        <motion.div
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
        >
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Gamepad2 className="h-8 w-8 text-purple-400" />
              <h2 className="font-orbitron text-3xl font-black uppercase text-white">
                Epic Gameplay Collection
              </h2>
            </div>
            <span className="font-rajdhani text-sm font-medium text-gray-400">
              {filteredVideos.length} Videos Available
            </span>
          </div>

          {/* Grid layout for videos */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredVideos.map((video, index) => {
              const videoIndex = videos.findIndex((v) => v.id === video.id);
              const isActive = videoIndex === activeIndex;

              return (
                <motion.div
                  key={video.id}
                  variants={itemVariants}
                  whileHover="hover"
                  initial="rest"
                >
                  <motion.div
                    className={`group relative h-full cursor-pointer overflow-hidden rounded-xl border transition-all ${
                      isActive
                        ? "border-purple-500 bg-gradient-to-br from-purple-900/40 to-fuchsia-900/40 shadow-2xl shadow-purple-500/50"
                        : "border-white/10 bg-gradient-to-br from-gray-900/80 to-black hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/30"
                    }`}
                    variants={cardHoverVariants}
                    onClick={() => handleVideoSelect(videoIndex)}
                  >
                    {/* Video Thumbnail */}
                    <div className="relative aspect-video w-full overflow-hidden">
                      <video
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        src={video.videoUrl}
                        muted
                        loop
                        playsInline
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-40" />

                      {/* Duration Badge */}
                      <div className="absolute bottom-3 right-3 rounded-lg border border-white/20 bg-black/80 px-2 py-1 font-rajdhani text-xs font-bold text-white backdrop-blur-sm">
                        {video.duration}
                      </div>

                      {/* Active Indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center bg-purple-600/40 backdrop-blur-sm"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.div
                            className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-gradient-to-r from-purple-600 to-fuchsia-600 shadow-2xl"
                            animate={{
                              scale: [1, 1.1, 1],
                              rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            {isPlaying ? (
                              <Pause size={28} className="text-white" />
                            ) : (
                              <Play size={28} className="ml-1 text-white" />
                            )}
                          </motion.div>
                        </motion.div>
                      )}

                      {/* Hover Play Icon */}
                      {!isActive && (
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          initial={{ scale: 0.8 }}
                          whileHover={{ scale: 1 }}
                        >
                          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm">
                            <Play size={24} className="ml-1 text-white" />
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Video Info */}
                    <div className="p-5">
                      <h3 className="mb-2 line-clamp-2 font-rajdhani text-lg font-bold text-white transition-colors group-hover:text-purple-300">
                        {video.title}
                      </h3>

                      {/* Genre Badge */}
                      <div className="mb-3 inline-block rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 font-rajdhani text-xs font-bold uppercase text-purple-300">
                        {video.genre}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between border-t border-white/5 pt-3 font-rajdhani text-xs">
                        <span className="flex items-center gap-1 text-gray-400">
                          <Eye className="h-3 w-3" />
                          {video.views}
                        </span>
                        <span className="text-gray-500">
                          {video.uploadDate}
                        </span>
                      </div>
                    </div>

                    {/* Active Glow Effect */}
                    {isActive && (
                      <motion.div
                        className="absolute -inset-0.5 -z-10 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 opacity-75 blur-lg"
                        animate={{
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="mx-auto mb-6 h-px w-64 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          <p className="font-rajdhani text-sm text-gray-500">
            Powered by Magic Worlds • All gameplay footage captured in real-time
          </p>
        </motion.div>
      </div>

      {/* Video Expanded Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="relative w-full max-w-6xl border border-purple-500/30 bg-gradient-to-br from-purple-900/20 via-black to-fuchsia-900/20 p-2 shadow-2xl shadow-purple-500/30"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{ borderRadius: "24px" }}
            >
              {/* Glowing Border */}
              <div className="absolute -inset-1 -z-10 rounded-3xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-cyan-600 opacity-20 blur-2xl" />

              {/* Close Button */}
              <motion.button
                onClick={handleCloseModal}
                className="absolute -right-4 -top-4 z-20 rounded-full border-2 border-white/20 bg-gradient-to-r from-purple-600 to-fuchsia-600 p-3 text-white shadow-2xl backdrop-blur-sm transition-all hover:scale-110 hover:border-white/40"
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} />
              </motion.button>

              {/* Video Container */}
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
                <video
                  ref={modalVideoRef}
                  className="h-full w-full object-contain"
                  src={videos[activeIndex]?.videoUrl}
                  autoPlay
                  controls
                  muted={isMuted}
                  playsInline
                />
              </div>

              {/* Video Info */}
              <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="mb-3 font-orbitron text-3xl font-black uppercase text-white">
                      {videos[activeIndex]?.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 font-rajdhani text-sm font-bold text-purple-300">
                        <TrendingUp className="h-4 w-4" />
                        {videos[activeIndex]?.genre}
                      </span>
                      <span className="flex items-center gap-2 text-gray-300">
                        <Eye className="h-4 w-4" />
                        <span className="font-rajdhani font-medium">
                          {videos[activeIndex]?.views} views
                        </span>
                      </span>
                      <span className="font-rajdhani text-sm text-gray-400">
                        {videos[activeIndex]?.uploadDate}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-3 text-yellow-400 transition-all hover:bg-yellow-500/20"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Star className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3 text-cyan-400 transition-all hover:bg-cyan-500/20"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Users className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <p className="font-rajdhani text-base leading-relaxed text-gray-300">
                    Experience the thrill of this incredible gameplay moment
                    from our Magic Worlds collection. Immerse yourself in
                    stunning visuals, epic battles, and unforgettable adventures
                    across the multiverse. Each video showcases the best moments
                    from the most exciting games in our library.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EpicGamingShowcase;
