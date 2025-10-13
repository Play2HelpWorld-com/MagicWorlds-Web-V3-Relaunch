import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Play Now",
    newTab: false,
    path: "/play",
  },
  {
    id: 3,
    title: "Worlds",
    newTab: false,
    path: "/worlds",
  },

  {
    id: 6,
    title: "Networks",
    newTab: false,
    submenu: [
      {
        id: 61,
        title: "Code",
        newTab: false,
        path: "https://github.com/orgs/TheMagicWorlds",
      },
      {
        id: 62,
        title: "Apps",
        newTab: false,
        path: "https://magicworlds.itch.io/magic-world",
      },
      {
        id: 63,
        title: "Teams",
        newTab: false,
        path: "https://www.linkedin.com/company/magic-worlds",
      },
      {
        id: 64,
        title: "Customer Service",
        newTab: false,
        path: "https://www.facebook.com/MagikWorlds",
      },
      {
        id: 65,
        title: "News",
        newTab: false,
        path: "https://x.com/magicworlds3",
      },
      {
        id: 66,
        title: "TV",
        newTab: false,
        path: "https://youtube.com/@magicworldstv?si=FHtkbuWJh5aYKmQy",
      },
      {
        id: 67,
        title: "WhitePapers",
        newTab: false,
        path: "https://helix-labs-gmbh.notion.site/Magic-Worlds-Layer-2-Whitepaper-1adf1e88252580baa4e9cb08def48ba7?pvs=4",
      },
    ],
  },
  {
    id: 5,
    title: "Join Us",
    newTab: false,
    submenu: [
      {
        id: 52,
        title: "Memes",
        newTab: false,
        path: "https://www.tiktok.com/@magicworldsonline",
      },
      {
        id: 53,
        title: "Gamer Tips",
        newTab: false,
        path: "https://discord.com/invite/NcNSaTVNdn",
      },
      {
        id: 54,
        title: "Blogs",
        newTab: false,
        path: "https://mauricebigmoflynn.wordpress.com/",
      },
      {
        id: 55,
        title: "Open Source",
        newTab: false,
        path: "https://www.reddit.com/user/MagicWorlds_/",
      },
      {
        id: 56,
        title: "Gamer Videos",
        newTab: false,
        path: "https://www.twitch.tv/magicworldsonline",
      },
      {
        id: 57,
        title: "Influencers",
        newTab: false,
        path: "https://www.instagram.com/magikworlds/",
      },
      {
        id: 58,
        title: "Mobile Game Link",
        newTab: false,
        path: "https://drive.google.com/file/d/141f8EDsJhFywxbtJ0KfJUH8HRarf3P4j/view?usp=drive_link",
      },
    ],
  },
  {
    id: 4,
    title: "About",
    newTab: false,
    path: "/docs",
  },
];

export default menuData;
