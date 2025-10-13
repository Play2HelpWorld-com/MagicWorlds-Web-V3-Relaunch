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
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string>();
  const [hideOnScroll, setHideOnScroll] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const pathUrl = usePathname();

  interface MenuItem {
    id: number;
    title: string;
    path?: string;
    submenu?: MenuItem[];
  }

  const handleLinkClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    menuItem: MenuItem,
  ) => {
    e.preventDefault();
    setActiveMenu(menuItem.title);
    if (menuItem.id === 5 || menuItem.id === 6) {
      setDropdownToggler(!dropdownToggler);
    } else {
      setNavigationOpen(!navigationOpen);
    }
  };

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
      <div className="mx-auto mt-3 max-w-7xl px-4 transition-all duration-500 ease-out md:px-6 lg:px-8">
        <div
          className={`relative mx-auto items-center justify-between border border-white/20 bg-black/95 px-2 py-0.5 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-700 ease-[cubic-bezier(0.86,0,0.07,1)] md:px-6 xl:flex ${
            stickyMenu
              ? "scale-[0.98] rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
              : "scale-100 rounded-[2.5rem] shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          } hover:scale-[0.99] hover:shadow-[0_12px_40px_rgba(0,0,0,0.7)]`}
          style={{
            transition: "all 0.7s cubic-bezier(0.86, 0, 0.07, 1)",
            willChange: "transform, box-shadow, border-radius",
          }}
        >
          <div className="flex w-full items-center justify-between transition-all duration-500 ease-out xl:w-[12%]">
            <Link
              href="/"
              title="Home"
              className="transition-transform duration-500 ease-out hover:scale-105 active:scale-95"
            >
              <Image
                src="/images/logo/logo.png"
                alt="logo"
                width={200}
                height={50}
                className="hidden h-18 w-24 transition-opacity duration-300 dark:block"
              />
              <Image
                src="/images/logo/logo.png"
                alt="logo"
                width={200}
                height={50}
                className="h-18 w-24 transition-opacity duration-300 dark:hidden"
              />
            </Link>

            {/* <!-- Hamburger Toggle BTN --> */}
            <button
              aria-label="hamburger Toggler"
              className="block rounded-full p-2 transition-all duration-300 ease-out hover:bg-white/10 active:scale-90 xl:hidden"
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
            className={`w-full items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.86,0,0.07,1)] xl:visible xl:flex xl:h-auto xl:w-full ${
              navigationOpen
                ? "navbar !visible mt-4 h-auto max-h-[400px] scale-100 rounded-2xl bg-black/95 p-6 opacity-100 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-2xl xl:mt-0 xl:h-auto xl:bg-transparent xl:p-0 xl:shadow-none"
                : "invisible h-0 scale-95 opacity-0 xl:visible xl:scale-100 xl:opacity-100"
            }`}
            style={{
              transition: "all 0.7s cubic-bezier(0.86, 0, 0.07, 1)",
            }}
          >
            <nav>
              <ul
                className="flex flex-col gap-5 font-bold xl:flex-row xl:items-center xl:gap-10"
                style={{
                  fontFamily: "'Orbitron', 'Rajdhani', 'Exo 2', sans-serif",
                }}
              >
                {menuData.map((menuItem, key) => (
                  <li
                    onClick={(e) => handleLinkClick(e, menuItem)}
                    key={key}
                    className="group relative transition-all duration-500 ease-out hover:scale-105 active:scale-95"
                  >
                    {menuItem.submenu ? (
                      <>
                        <button className="flex cursor-pointer items-center justify-between gap-3 text-sm font-bold uppercase tracking-wider text-white transition-all duration-500 ease-out hover:translate-x-1 hover:bg-gradient-to-r hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400 hover:bg-clip-text hover:text-transparent">
                          {menuItem.title}
                          <span className="transition-transform duration-500 ease-out group-hover:rotate-180 group-hover:scale-110">
                            <svg
                              className="h-2.5 w-2.5 cursor-pointer fill-white transition-all duration-500 ease-out group-hover:fill-indigo-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                            >
                              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                            </svg>
                          </span>
                        </button>

                        {menuItem.title === activeMenu && (
                          <ul
                            className={`dropdown transition-all duration-700 ease-[cubic-bezier(0.86,0,0.07,1)] ${dropdownToggler ? "flex scale-100 opacity-100" : "scale-95 opacity-0"}`}
                            style={{
                              transition:
                                "all 0.7s cubic-bezier(0.86, 0, 0.07, 1)",
                            }}
                          >
                            {menuItem.submenu.map((item, key) => (
                              <li
                                onClick={(e) => handleLinkClick(e, item)}
                                key={key}
                                className="transition-all duration-500 ease-out hover:translate-x-2 hover:scale-105"
                              >
                                <Link
                                  href={item.path || "#"}
                                  className="text-xs font-bold uppercase tracking-wide text-white/80 transition-all duration-500 ease-out hover:bg-gradient-to-r hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400 hover:bg-clip-text hover:text-transparent"
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
                        )}
                      </>
                    ) : (
                      <Link
                        href={`${menuItem.path}`}
                        className={`relative inline-block text-sm font-bold uppercase tracking-wider transition-all duration-500 ease-out hover:translate-y-[-2px] hover:scale-105 active:scale-95 ${
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

            <div className="mt-7 flex items-center gap-6 xl:mt-0">
              {/* <ProfileModal navOpen={navigationOpen} setNavopen = {setNavigationOpen}/> */}
              <Link
                href="/support"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-2.5 font-black uppercase tracking-wider text-white shadow-lg shadow-indigo-500/50 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.86,0,0.07,1)] before:absolute before:inset-0 before:bg-gradient-to-r before:from-pink-600 before:via-purple-600 before:to-indigo-600 before:opacity-0 before:transition-opacity before:duration-500 hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_8px_32px_rgba(99,102,241,0.6)] hover:before:opacity-100 active:translate-y-0 active:scale-95"
                style={{
                  transition: "all 0.5s cubic-bezier(0.86, 0, 0.07, 1)",
                  fontFamily: "'Orbitron', 'Rajdhani', 'Exo 2', sans-serif",
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="tracking-wider">Contact Us</span>
                  <svg
                    className="h-4 w-4 transition-transform duration-500 ease-out group-hover:translate-x-1"
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

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </header>
  );
};

export default Header;
