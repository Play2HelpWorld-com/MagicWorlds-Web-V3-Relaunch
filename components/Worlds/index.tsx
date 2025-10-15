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

const EpicGamingShowcase: React.FC = () => {
  // State management
  const [videos, setVideos] = useState<GameplayVideo[]>([]);
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

  // Generate video data
  useEffect(() => {
    const gameTitles = [
      { title: "Learning World: AI Tutor Mastery", genre: "Educational RPG" },
      { title: "Sport World: Extreme Soccer Showdown", genre: "Sports" },
      {
        title: "AI World: Cybernetic Battle Arena",
        genre: "Sci-Fi Strategy",
      },
      { title: "Music World: Ultimate DJ Remix Challenge", genre: "Rhythm" },
      { title: "Farm World: Epic Harvest Season", genre: "Simulation" },
      {
        title: "Magic Worlds: The Grand Sorcerer's Quest",
        genre: "Fantasy RPG",
      },
      {
        title: "Space World: Alien Galaxy Exploration",
        genre: "Sci-Fi Adventure",
      },
      { title: "War World: Battle of the Titans", genre: "FPS" },
      { title: "Racing World: Hyperdrive Grand Prix", genre: "Racing" },
      { title: "Survival World: Island Escape Challenge", genre: "Survival" },
      { title: "AI World: Sentient Machine Revolution", genre: "Sci-Fi RPG" },
      { title: "Music World: Battle of the Bands", genre: "Rhythm" },
      {
        title: "Learning World: History's Greatest Mysteries",
        genre: "Educational",
      },
      { title: "Farm World: The Great Animal Rescue", genre: "Simulation" },
      {
        title: "Magic Worlds: Wizard's Tower Defense",
        genre: "Tower Defense",
      },
    ];

    const durations = [
      "12:45",
      "8:32",
      "15:07",
      "10:21",
      "6:18",
      "9:45",
      "7:33",
      "14:22",
      "11:09",
      "5:47",
      "16:38",
      "13:15",
    ];
    const viewCounts = [
      "1.2M",
      "845K",
      "3.7M",
      "698K",
      "2.1M",
      "1.5M",
      "922K",
      "1.8M",
      "762K",
      "4.2M",
      "552K",
      "1.1M",
    ];
    const uploadDates = [
      "2 days ago",
      "1 week ago",
      "3 days ago",
      "5 hours ago",
      "2 weeks ago",
      "1 day ago",
      "4 days ago",
      "12 hours ago",
      "3 weeks ago",
      "Just now",
      "8 hours ago",
      "Yesterday",
    ];

    const generatedVideos = gameTitles.map((game, i) => ({
      id: (i + 1).toString(),
      title: game.title,
      genre: game.genre,
      duration: durations[i] || "10:00",
      videoUrl: `/videos/worlds/gameplay-${(i % 12) + 1}.mp4`,
      thumbnailUrl: `/images/thumbnails/gameplay-${(i % 12) + 1}.jpg`,
      views: viewCounts[i] || "1M",
      uploadDate: uploadDates[i] || "Recently",
    }));

    setVideos(generatedVideos);
  }, []);

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
    <div className="relative min-h-screen w-full bg-gradient-to-b from-black via-purple-950/20 to-black pt-20 text-white">
      {/* Loading Screen */}
      <AnimatePresence>
        {loadingProgress < 100 && (
          <motion.div
            className="absolute inset-0 bottom-96 top-0 z-50 mb-96 flex flex-col items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            animate={loaderControls}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <motion.div
              className="relative h-2 w-64 overflow-hidden rounded-full bg-gray-800"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { delay: 0.4, duration: 0.6 },
              }}
            >
              <motion.div
                className="absolute h-full rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500"
                variants={progressBarVariants}
                initial="initial"
                animate="animate"
                custom={loadingProgress}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-16">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h1 className="mb-4 bg-gradient-to-r from-purple-400 to-fuchsia-500 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent">
            MAGIC WORLDS VAULT
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Explore extraordinary gaming moments from our Magic Worlds, captured
            in stunning detail
          </p>
        </motion.div>

        {/* Category Selection */}
        <motion.div
          className="mb-8 overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="flex space-x-2 pb-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  videoCategory === category
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
                onClick={() => setVideoCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Featured Video */}
        <motion.div
          ref={showcaseRef}
          className="mb-12"
          initial={{ opacity: 1 }}
          animate={mainVideoControls}
        >
          {videos.length > 0 && (
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-900/10 to-fuchsia-900/10 p-1">
              <motion.div
                className="relative aspect-video w-full overflow-hidden rounded-lg"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <video
                  ref={videoRef}
                  className="h-full w-full rounded-lg object-contain"
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
                    className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/30 transition-opacity hover:bg-black/40"
                    onClick={handlePlayPause}
                  >
                    <motion.div
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-600/80 text-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play size={30} />
                    </motion.div>
                  </div>
                )}

                {/* Video Controls Overlay - always visible on mobile, visible on hover for desktop */}
                <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 transition-opacity duration-300 hover:opacity-100 md:opacity-0 md:hover:opacity-100">
                  {/* Top Controls */}
                  <div className="flex justify-between">
                    <motion.div
                      animate={titleControls}
                      initial={{ opacity: 0, y: 20 }}
                    >
                      <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                        {videos[activeIndex]?.title}
                      </h3>
                      <p className="text-sm text-gray-300">
                        {videos[activeIndex]?.genre} •{" "}
                        {videos[activeIndex]?.views} views •{" "}
                        {videos[activeIndex]?.uploadDate}
                      </p>
                    </motion.div>
                    <button
                      className="rounded-full bg-gray-800/50 p-2 text-white transition-all hover:bg-gray-700"
                      onClick={handleOpenModal}
                    >
                      <Maximize2 size={20} />
                    </button>
                  </div>

                  {/* Bottom Controls */}
                  <div className="space-y-2">
                    {/* Progress Bar */}
                    <div
                      ref={progressBarRef}
                      className="group relative h-2 w-full cursor-pointer rounded-full bg-gray-700"
                      onClick={handleSeek}
                    >
                      <div
                        className="absolute h-full origin-left rounded-full bg-purple-500"
                        style={{ width: `${progressPercentage}%` }}
                      />
                      <div
                        className="absolute bottom-0 h-4 w-4 -translate-x-1/2 translate-y-1/2 rounded-full bg-purple-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{ left: `${progressPercentage}%` }}
                      />
                    </div>

                    {/* Control Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button
                          className="rounded-full bg-gray-800/50 p-2 text-white transition-all hover:bg-gray-700"
                          onClick={handlePlayPause}
                          disabled={!videoReady}
                        >
                          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                        </button>
                        <button
                          className="rounded-full bg-gray-800/50 p-2 text-white transition-all hover:bg-gray-700"
                          onClick={handleMuteToggle}
                        >
                          {isMuted ? (
                            <VolumeX size={20} />
                          ) : (
                            <Volume2 size={20} />
                          )}
                        </button>
                        <span className="text-sm text-gray-300">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          className="rounded-full bg-gray-800/50 p-2 text-white transition-all hover:bg-gray-700"
                          onClick={handlePrevVideo}
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          className="rounded-full bg-gray-800/50 p-2 text-white transition-all hover:bg-gray-700"
                          onClick={handleNextVideo}
                        >
                          <ChevronRight size={20} />
                        </button>
                        <button
                          className="rounded-full bg-gray-800/50 p-2 text-white transition-all hover:bg-gray-700"
                          onClick={handleFullScreen}
                        >
                          <Fullscreen size={20} />
                        </button>
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
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-white">
              More Epic Gameplay
            </h2>
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
                    className={`h-full overflow-hidden rounded-lg ${
                      isActive ? "ring-2 ring-purple-500" : "bg-gray-900"
                    } shadow-lg`}
                    variants={cardHoverVariants}
                    onClick={() => handleVideoSelect(videoIndex)}
                  >
                    <div className="relative aspect-video w-full overflow-hidden">
                      <video
                        className="h-full w-full object-cover"
                        src={video.videoUrl}
                        muted
                        loop
                        playsInline
                      />
                      <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
                        {video.duration}
                      </div>
                      {isActive && (
                        <div className="absolute inset-0 flex items-center justify-center bg-purple-600/30">
                          <div className="rounded-full bg-white/90 p-1">
                            {isPlaying ? (
                              <Pause size={24} className="text-purple-600" />
                            ) : (
                              <Play size={24} className="text-purple-600" />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="mb-1 line-clamp-1 text-lg font-semibold text-white">
                        {video.title}
                      </h3>
                      <p className="text-sm text-gray-400">{video.genre}</p>
                      <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                        <span>{video.views} views</span>
                        <span>{video.uploadDate}</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mb-12 text-center text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {/* <p className="text-sm">
            © 2025 Magic Worlds Vault. All gameplay footage is for
            demonstration purposes only.
          </p> */}
        </motion.div>
      </div>

      {/* Video Expanded Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative w-full max-w-4xl rounded-xl bg-gray-900 p-1"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="absolute right-4 top-4 z-10">
                <button
                  onClick={handleCloseModal}
                  className="rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/80"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="relative aspect-video w-full">
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

              <div className="p-6">
                <h2 className="mb-2 text-2xl font-bold text-white">
                  {videos[activeIndex]?.title}
                </h2>
                <p className="mb-4 text-gray-300">
                  {videos[activeIndex]?.genre} • {videos[activeIndex]?.views}{" "}
                  views • {videos[activeIndex]?.uploadDate}
                </p>
                <p className="text-gray-400">
                  Experience the thrill of this incredible gameplay moment from
                  our Magic Worlds collection. Each video showcases the best
                  moments from the most exciting games in our library.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EpicGamingShowcase;
