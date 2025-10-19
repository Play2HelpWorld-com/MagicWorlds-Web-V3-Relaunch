"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ProfileModal } from "../accounts/profileModal";

import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [hideOnScroll, setHideOnScroll] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const pathUrl = usePathname();

  interface MenuItem {
    id: number;
    title: string;
    path?: string;
    submenu?: MenuItem[];
  }

  const handleDropdownClick = (menuTitle: string) => {
    // Only toggle on mobile (below xl breakpoint)
    setActiveDropdown(activeDropdown === menuTitle ? null : menuTitle);
  };

  const handleNavItemClick = () => {
    setNavigationOpen(false);
    setActiveDropdown(null);
  };

  // No hover timers needed; desktop uses pure CSS hover. Mobile uses click + state.

  // Handle sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    }
  };

  // Handle sticky menu and hide on scroll
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      setHideOnScroll(true);
    } else {
      setHideOnScroll(false);
    }

    setLastScrollY(currentScrollY);
    setStickyMenu(currentScrollY >= 80);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setHideOnScroll(currentScrollY > lastScrollY && currentScrollY > 80);
      setLastScrollY(currentScrollY);
      setStickyMenu(currentScrollY >= 80);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [lastScrollY]);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 w-full transition-all duration-700 ease-out ${
        hideOnScroll
          ? "-translate-y-full opacity-0"
          : "translate-y-0 opacity-100"
      }`}
      style={{
        transition:
          "transform 0.7s cubic-bezier(0.86, 0, 0.07, 1), opacity 0.5s ease-out",
      }}
    >
      <div className="mx-auto mt-2 max-w-7xl px-4 transition-all duration-500 ease-out md:px-6 lg:px-8">
        <div
          className={`relative mx-auto items-center justify-between border border-white/20 bg-black/95 px-3 py-1.5 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-700 ease-[cubic-bezier(0.86,0,0.07,1)] sm:px-4 sm:py-2 xl:flex ${
            stickyMenu
              ? "rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
              : "rounded-[2.5rem] shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          }`}
          style={{
            transition: "all 0.7s cubic-bezier(0.86, 0, 0.07, 1)",
          }}
        >
          <div className="flex w-full items-center justify-between transition-all duration-500 ease-out xl:w-auto xl:flex-shrink-0">
            <Link
              href="/"
              title="Home"
              className="transition-opacity duration-300 ease-out hover:opacity-80"
            >
              <Image
                src="/images/logo/logo.png"
                alt="logo"
                width={200}
                height={50}
                className="hidden h-10 w-16 transition-opacity duration-300 dark:block sm:h-11 sm:w-18 md:h-12 md:w-20"
              />
              <Image
                src="/images/logo/logo.png"
                alt="logo"
                width={200}
                height={50}
                className="h-10 w-16 transition-opacity duration-300 dark:hidden sm:h-11 sm:w-18 md:h-12 md:w-20"
              />
            </Link>

            {/* <!-- Hamburger Toggle BTN --> */}
            <button
              aria-label="hamburger Toggler"
              className="block rounded-full p-2 transition-all duration-300 ease-out hover:bg-white/10 xl:hidden"
              onClick={() => setNavigationOpen(!navigationOpen)}
            >
              <span className="relative block h-5.5 w-5.5 cursor-pointer">
                <span className="absolute right-0 block h-full w-full">
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-white transition-all duration-500 ease-[cubic-bezier(0.86,0,0.07,1)] ${!navigationOpen ? "!w-full delay-300" : "w-0"}`}
                  ></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-white transition-all delay-75 duration-500 ease-[cubic-bezier(0.86,0,0.07,1)] ${!navigationOpen ? "delay-400 !w-full" : "w-0"}`}
                  ></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-white transition-all delay-150 duration-500 ease-[cubic-bezier(0.86,0,0.07,1)] ${!navigationOpen ? "!w-full delay-500" : "w-0"}`}
                  ></span>
                </span>
                <span className="du-block absolute right-0 h-full w-full rotate-45">
                  <span
                    className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-white transition-all delay-300 duration-500 ease-[cubic-bezier(0.86,0,0.07,1)] ${!navigationOpen ? "!h-0 delay-[0]" : "h-full"}`}
                  ></span>
                  <span
                    className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-white transition-all duration-500 ease-[cubic-bezier(0.86,0,0.07,1)] ${!navigationOpen ? "!h-0 delay-200" : "h-0.5"}`}
                  ></span>
                </span>
              </span>
            </button>
            {/* <!-- Hamburger Toggle BTN --> */}
          </div>

          {/* Nav Menu Start   */}
          <div
            className={`w-full items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.86,0,0.07,1)] xl:visible xl:ml-6 xl:flex xl:h-auto xl:w-full 2xl:ml-8 ${
              navigationOpen
                ? "navbar !visible h-auto max-h-[70vh] overflow-y-auto rounded-2xl bg-black/95 p-3 opacity-100 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:p-4 xl:mt-0 xl:h-auto xl:max-h-none xl:overflow-visible xl:bg-transparent xl:p-0 xl:shadow-none"
                : "invisible h-0 opacity-0 xl:visible xl:opacity-100"
            }`}
            style={{
              transition: "all 0.7s cubic-bezier(0.86, 0, 0.07, 1)",
            }}
          >
            <nav>
              <ul
                className="nav-list flex flex-col gap-2 font-bold sm:gap-3 xl:flex-row xl:items-center xl:gap-4 2xl:gap-6"
                style={{
                  fontFamily: "'Orbitron', 'Rajdhani', 'Exo 2', sans-serif",
                }}
              >
                {menuData.map((menuItem, key) => (
                  <li key={key} className="dropdown-container group relative">
                    {menuItem.submenu ? (
                      <>
                        <button
                          onClick={() => handleDropdownClick(menuItem.title)}
                          className="flex w-full cursor-pointer items-center justify-between gap-3 text-xs font-bold uppercase tracking-wider text-white transition-all duration-500 ease-out hover:bg-gradient-to-r hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400 hover:bg-clip-text hover:text-transparent sm:text-sm xl:w-auto"
                        >
                          {menuItem.title}
                          <span
                            className={`transition-transform duration-300 ease-out ${
                              activeDropdown === menuItem.title
                                ? "rotate-180 xl:rotate-0"
                                : "rotate-0"
                            } group-hover:xl:rotate-180`}
                          >
                            <svg
                              className="h-2.5 w-2.5 fill-white transition-all duration-500 ease-out group-hover:fill-indigo-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                            >
                              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                            </svg>
                          </span>
                        </button>

                        {/* Hover bridge strip to keep hover state while moving down to the dropdown */}
                        <span className="pointer-events-auto absolute left-0 top-full hidden h-8 w-full xl:block"></span>

                        {/* Mobile: Accordion-style submenu */}
                        <ul
                          className={`flex flex-col gap-2 overflow-hidden transition-all duration-500 ease-out xl:hidden ${
                            activeDropdown === menuItem.title
                              ? "mt-2 max-h-96 opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          {menuItem.submenu.map((item, subKey) => (
                            <li
                              key={subKey}
                              className="pl-4 transition-all duration-300 ease-out hover:translate-x-2"
                            >
                              <Link
                                href={item.path || "#"}
                                onClick={handleNavItemClick}
                                target={item.newTab ? "_blank" : undefined}
                                rel={item.newTab ? "noopener noreferrer" : undefined}
                                className="block text-[10px] font-bold uppercase tracking-wide text-white/80 transition-all duration-500 ease-out hover:bg-gradient-to-r hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400 hover:bg-clip-text hover:text-transparent sm:text-xs"
                                style={{
                                  fontFamily:
                                    "'Orbitron', 'Rajdhani', 'Exo 2', sans-serif",
                                }}
                              >
                                {item.title}
                              </Link>
                            </li>
                          ))}
                        </ul>

                        {/* Desktop: Dropdown menu */}
                        <ul
                          className={`nav-dropdown absolute left-0 top-full z-50 mt-0 hidden min-w-[220px] flex-col gap-1 rounded-2xl border border-purple-500/40 bg-black bg-gradient-to-b from-black via-black to-purple-950 p-2 shadow-[0_24px_64px_rgba(139,92,246,0.35)] xl:pointer-events-none xl:flex xl:translate-y-[-6px] xl:scale-95 xl:opacity-0 xl:transition-all xl:duration-200 xl:ease-out group-hover:xl:pointer-events-auto group-hover:xl:translate-y-8 group-hover:xl:scale-100 group-hover:xl:opacity-100`}
                          style={{
                            transformOrigin: "top center",
                            backgroundColor: "rgba(0,0,0,1)",
                          }}
                        >
                          {menuItem.submenu.map((item, subKey) => (
                            <li
                              key={subKey}
                              className="group/item"
                              style={{
                                animationDelay: `${subKey * 50}ms`,
                              }}
                            >
                              <Link
                                href={item.path || "#"}
                                onClick={() => setActiveDropdown(null)}
                                target={item.newTab ? "_blank" : undefined}
                                rel={item.newTab ? "noopener noreferrer" : undefined}
                                className="relative block overflow-hidden rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-white/90 transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-purple-600/20 hover:via-fuchsia-600/20 hover:to-cyan-600/20 hover:text-white hover:shadow-[inset_0_0_20px_rgba(168,85,247,0.4)] sm:text-sm"
                                style={{
                                  fontFamily:
                                    "'Orbitron', 'Rajdhani', 'Exo 2', sans-serif",
                                }}
                              >
                                <span className="relative z-10 flex items-center gap-2">
                                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 opacity-0 transition-opacity duration-300 group-hover/item:opacity-100"></span>
                                  {item.title}
                                  <svg
                                    className="ml-auto h-3 w-3 -translate-x-2 opacity-0 transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </span>
                                <span className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500/0 via-fuchsia-500/0 to-cyan-500/0 opacity-0 blur-xl transition-opacity duration-300 group-hover/item:from-purple-500/20 group-hover/item:via-fuchsia-500/20 group-hover/item:to-cyan-500/20 group-hover/item:opacity-100"></span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <Link
                        href={`${menuItem.path}`}
                        onClick={handleNavItemClick}
                        target={menuItem.newTab ? "_blank" : undefined}
                        rel={menuItem.newTab ? "noopener noreferrer" : undefined}
                        className={`relative inline-block text-xs font-bold uppercase tracking-wider transition-all duration-500 ease-out sm:text-sm ${
                          pathUrl === menuItem.path
                            ? "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                            : "text-white hover:bg-gradient-to-r hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400 hover:bg-clip-text hover:text-transparent"
                        }`}
                        style={{
                          fontFamily:
                            "'Orbitron', 'Rajdhani', 'Exo 2', sans-serif",
                        }}
                      >
                        <span className="relative inline-flex items-center">
                          <span className="relative z-10">
                            {menuItem.title}
                          </span>
                          {pathUrl === menuItem.path && (
                            <>
                              <span className="absolute -bottom-1 left-0 h-0.5 w-full animate-[shimmer_2s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_8px_rgba(99,102,241,0.6)] transition-all duration-500 ease-out"></span>
                              <span className="absolute -inset-1 -z-10 animate-pulse rounded-lg bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-sm"></span>
                            </>
                          )}
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-3 flex items-center gap-3 sm:gap-4 xl:mt-0">
              {/* <ProfileModal navOpen={navigationOpen} setNavopen = {setNavigationOpen}/> */}
              <Link
                href="/support"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-indigo-500/50 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.86,0,0.07,1)] before:absolute before:inset-0 before:bg-gradient-to-r before:from-pink-600 before:via-purple-600 before:to-indigo-600 before:opacity-0 before:transition-opacity before:duration-500 hover:shadow-[0_8px_32px_rgba(99,102,241,0.6)] hover:before:opacity-100 sm:px-5 sm:py-2 sm:text-sm"
                style={{
                  transition: "all 0.5s cubic-bezier(0.86, 0, 0.07, 1)",
                  fontFamily: "'Orbitron', 'Rajdhani', 'Exo 2', sans-serif",
                }}
              >
                <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                  <span className="tracking-wider">Contact Us</span>
                  <svg
                    className="h-3 w-3 transition-transform duration-500 ease-out group-hover:translate-x-1 sm:h-4 sm:w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </Link>
              {/* <ThemeToggler /> */}
            </div>
          </div>
        </div>
      </div>

      {/* Apple-style smooth animations CSS */}
      <style jsx>{`
        @keyframes shimmer {
          0%,
          100% {
            opacity: 1;
            transform: scaleX(1);
          }
          50% {
            opacity: 0.7;
            transform: scaleX(0.95);
          }
        }

        @keyframes dropdown-open {
          0% {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes dropdown-close {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
        }

        .animate-dropdown-open {
          animation: dropdown-open 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)
            forwards;
        }

        .animate-dropdown-close {
          animation: dropdown-close 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Desktop: delay close only when leaving the whole nav list; no delay when switching items */
        @media (min-width: 1280px) {
          /* Default: no transition delay while the nav list is hovered */
          .nav-list:hover .nav-dropdown {
            transition-delay: 0ms !important;
          }
          /* When not hovering the nav list (mouse leaving nav), apply a small delay before opacity/transform start */
          .nav-list:not(:hover) .nav-dropdown {
            transition-delay: 250ms !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
