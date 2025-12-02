"use client";

import React from "react";
import Image from "next/image";

type DocSection = {
  title: string;
  content: React.ReactNode;
};

export const docsData: Record<string, DocSection> = {
  introduction: {
    title: "Introduction",
    content: (
      <div className="space-y-6">
        <p className="text-lg leading-relaxed">
          Step into a realm where imagination meets reality.{" "}
          <span className="font-semibold text-purple-400">Magic Worlds</span> is
          an immersive gaming ecosystem where players explore interconnected
          digital worlds, each with unique challenges, rewards, and interactive
          experiences.
        </p>

        <div className="rounded-lg border border-purple-500/50 bg-purple-900/30 p-4">
          <h3 className="mb-2 text-xl font-bold text-purple-300">
            What Makes Magic Worlds Special?
          </h3>
          <p>
            Unlike traditional games, Magic Worlds combines procedural
            generation with hand-crafted storytelling to create unique
            experiences for every player. Your choices matter, permanently
            altering the world around you. In The Otherworlds Edition,
            you&apos;ll pilot a spaceship, navigate to different planets, and
            unlock their hidden magic.
          </p>
        </div>

        <h3 className="text-xl font-bold text-blue-300">Key Highlights</h3>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Dynamic, ever-evolving game universe with interconnected worlds
          </li>
          <li>Personalized magic system that adapts to your playstyle</li>
          <li>Cross-platform multiplayer with seamless integration</li>
          <li>Community-driven world events and seasonal content</li>
          <li>Advanced AI companions and NPCs that remember your journey</li>
          <li>Play-to-Earn (P2E) mechanics with real-world rewards</li>
          <li>
            Blockchain integration for digital ownership and transparent
            transactions
          </li>
        </ul>

        <p>
          This documentation will guide you through everything you need to know
          about Magic Worlds, from your first steps into the various realms to
          becoming a master creator capable of shaping reality itself.
        </p>
      </div>
    ),
  },

  gettingStarted: {
    title: "Getting Started",
    content: (
      <div className="space-y-6">
        <p className="text-lg">
          Ready to begin your adventure? This guide will help you set up your
          account, navigate to your first world, and take your initial steps
          into the magical universe.
        </p>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-blue-500/30 bg-gray-800/50 p-4">
            <h3 className="mb-2 text-xl font-bold text-blue-300">
              System Requirements
            </h3>
            <ul className="space-y-1">
              <li>OS: Windows 10/11, macOS 11+, Linux</li>
              <li>CPU: Intel i3 / AMD Ryzen 3 or better</li>
              <li>RAM: 8GB minimum, 16GB recommended</li>
              <li>GPU: GTX 1030 / RX 580 or better</li>
              <li>Storage: 15GB available space</li>
              <li>Also available on Android and iOS devices</li>
            </ul>
          </div>

          <div className="rounded-lg border border-purple-500/30 bg-gray-800/50 p-4">
            <h3 className="mb-2 text-xl font-bold text-purple-300">
              Game Editions
            </h3>
            <ul className="space-y-1">
              <li>
                <span className="font-semibold text-white">Standard:</span> Base
                game experience
              </li>
              <li>
                <span className="font-semibold text-white">Deluxe:</span> +
                Exclusive cosmetics & skins (coming soon)
              </li>
              <li>
                <span className="font-semibold text-white">
                  Collector&apos;s:
                </span>{" "}
                + Art book, soundtrack & season pass (coming soon)
              </li>
              {/* <li>
                <span className="font-semibold text-white">Premium Pass:</span>{" "}
                + $9.99/month for exclusive content (coming soon)
              </li> */}
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-indigo-300">
          Getting Started Steps
        </h3>
        <ol className="list-decimal space-y-2 pl-6">
          <li>
            Visit{" "}
            <span className="font-mono rounded bg-purple-900/50 px-2 py-1 text-purple-200">
              magicworlds.free.nf
            </span>{" "}
            to explore available worlds
          </li>
          <li>
            Create an account to track progress, earnings, and achievements
          </li>
          <li>Launch Magic Worlds and enter your spaceship</li>
          <li>
            Select a world by clicking the plus sign (+) to be transported there
            automatically
          </li>
          <li>Explore the world, complete missions, and earn rewards</li>
          <li>
            Exit by entering the return password [2025], summoning a jet to
            return to your spaceship
          </li>
        </ol>

        <div className="mt-4 rounded-lg border border-yellow-500/50 bg-yellow-900/30 p-4">
          <h4 className="mb-2 flex items-center text-lg font-bold">
            <svg
              className="mr-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
            Important Note
          </h4>
          <p>
            If you encounter any installation issues, please ensure your
            graphics drivers are up to date and that you have administrative
            privileges on your device. For mobile devices, ensure you have
            sufficient storage and your OS is updated to the latest version.
          </p>
        </div>
      </div>
    ),
  },

  worlds: {
    title: "Worlds & Magic",
    content: (
      <div className="space-y-6">
        <p className="text-lg leading-relaxed">
          Magic Worlds features a diverse range of interconnected digital
          realms, each with its own unique theme, challenges, and magical
          properties. Explore these worlds to discover their secrets and earn
          rewards.
        </p>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-blue-500/30 bg-gradient-to-br from-blue-900/40 to-cyan-900/40 p-4">
            <h3 className="mb-2 text-xl font-bold text-blue-300">Edu World</h3>
            <p>
              AI-powered interactive learning experiences where you can chat
              with virtual Albert Einstein and explore Generative AI
              simulations. Perfect for those who seek knowledge and wisdom.
            </p>
          </div>

          <div className="rounded-lg border border-green-500/30 bg-gradient-to-br from-green-900/40 to-emerald-900/40 p-4">
            <h3 className="mb-2 text-xl font-bold text-green-300">
              Farm World
            </h3>
            <p>
              Grow crops like pumpkins and compete against AI farmers for land
              in this strategic farming simulation. Outsmart intelligent
              opponents and build your agricultural empire.
            </p>
          </div>

          <div className="rounded-lg border border-purple-500/30 bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-4">
            <h3 className="mb-2 text-xl font-bold text-purple-300">
              Music World
            </h3>
            <p>
              Join virtual club scenes and hang out with top celebrities in this
              rhythmic realm. Customize your music experience, discover hidden
              tracks, and express your creativity.
            </p>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-gray-500/30 bg-gradient-to-br from-gray-900/40 to-slate-900/40 p-4">
            <h3 className="mb-2 text-xl font-bold text-gray-300">City World</h3>
            <p>
              Face off against powerful figures like Mark, Jeff, Elon, and Trump
              in this urban landscape. Conquer city resources, build your
              influence, and become the ultimate ruler of the metropolis.
            </p>
          </div>

          <div className="rounded-lg border border-red-500/30 bg-gradient-to-br from-red-900/40 to-orange-900/40 p-4">
            <h3 className="mb-2 text-xl font-bold text-red-300">Car World</h3>
            <p>
              Customize futuristic vehicles and compete in high-speed races
              across spectacular tracks. Win races to earn tokens and unlock
              powerful upgrades for your dream machine.
            </p>
          </div>

          <div className="rounded-lg border border-yellow-500/30 bg-gradient-to-br from-yellow-900/40 to-amber-900/40 p-4">
            <h3 className="mb-2 text-xl font-bold text-yellow-300">
              Casino World
            </h3>
            <p>
              Test your luck in virtual casinos featuring slots, poker, and more
              in this high-stakes adventure. Strategize your bets to multiply
              your earnings—but beware of risks!
            </p>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-indigo-500/30 bg-gradient-to-br from-indigo-900/40 to-blue-900/40 p-4">
            <h3 className="mb-2 text-xl font-bold text-indigo-300">
              Gamers World
            </h3>
            <p>
              Play classic and modern indoor games in a meta-gaming experience
              that celebrates gaming culture. Compete in various challenges and
              earn exciting rewards while connecting with fellow gamers.
            </p>
          </div>

          <div className="rounded-lg border border-emerald-500/30 bg-gradient-to-br from-emerald-900/40 to-green-900/40 p-4">
            <h3 className="mb-2 text-xl font-bold text-emerald-300">
              Sport World
            </h3>
            <p>
              Participate in virtual soccer, basketball, and other sports
              tournaments. Train and compete against AI or other players for top
              rewards and glory in the sporting arena.
            </p>
          </div>

          <div className="rounded-lg border border-rose-500/30 bg-gradient-to-br from-rose-900/40 to-pink-900/40 p-4">
            <h3 className="mb-2 text-xl font-bold text-rose-300">Tech World</h3>
            <p>
              A futuristic city with innovation-focused AI NPCs where you can
              explore cutting-edge technologies. Build, program, and innovate in
              this digital playground of the future.
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-blue-500/50 bg-blue-900/30 p-4">
          <h4 className="mb-2 text-lg font-bold">World Exploration Tip</h4>
          <p>
            Each world has hidden secrets, special events, and unique resources.
            Take your time to fully explore a world before moving to the next
            one. The more thoroughly you explore, the greater your rewards will
            be!
          </p>
        </div>
      </div>
    ),
  },

  "game-design": {
    title: "Game Design",
    content: (
      <div className="space-y-6">
        <div className="rounded-lg border border-purple-500/50 bg-purple-900/20 p-4">
          <h4 className="mb-3 text-xl font-bold text-purple-300">
            Game Information
          </h4>
          <ul className="space-y-2">
            <li className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 text-blue-300">Title:</strong>
              <span className="text-lg">Magic Worlds</span>
            </li>
            <li className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 text-blue-300">Genre:</strong>
              <span>
                Build & 3D Experience World, Simulation/Sandbox/RPG Hybrid with
                Web3 Integration
              </span>
            </li>
            <li className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 text-blue-300">Platforms:</strong>
              <span>PC (Windows), MacOS, Android, iOS</span>
            </li>
            <li className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 text-blue-300">
                Target Audience:
              </strong>
              <span>
                Web3 enthusiasts, gamers, creators, and educators aged 13–40
              </span>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-xl font-bold text-purple-300">Game Concept</h4>
          <p className="leading-relaxed">
            Magic Worlds is a decentralized gaming ecosystem where players and
            creators collaboratively build infinite virtual realms using
            pre-existing world templates. Realms can be personalized and powered
            by the native MAGIC token and its world-specific variants. Built
            with Unity, the game integrates AI-driven NPCs to enhance gameplay
            and drive the in-game economy.
          </p>
          <Image
            className="my-4 rounded-lg border border-purple-500/40"
            src="/images/play/magicworlds.jpg"
            alt="Magic Worlds Concept Art"
            width={800}
            height={450}
          />
        </div>

        <div className="space-y-3">
          <h4 className="text-xl font-bold text-purple-300">Game Modes</h4>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-blue-500/50 bg-blue-900/20 p-4">
              <h5 className="mb-2 font-bold text-blue-300">Explorer Mode</h5>
              <p>Visit worlds, complete quests, and interact with AI NPCs.</p>
            </div>
            <div className="rounded-lg border border-green-500/50 bg-green-900/20 p-4">
              <h5 className="mb-2 font-bold text-green-300">Creator Mode</h5>
              <p>
                Design personalized worlds, monetize with custom tokens or NFTs.
              </p>
            </div>
            <div className="rounded-lg border border-amber-500/50 bg-amber-900/20 p-4">
              <h5 className="mb-2 font-bold text-amber-300">Social Mode</h5>
              <p>Collaborate, trade, or compete in shared worlds.</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xl font-bold text-purple-300">Unique Features</h4>
          <ul className="list-disc space-y-2 pl-6">
            <li>Procedurally generated worlds with customizable parameters</li>
            <li>Player-governed economy with dynamic market systems</li>
            <li>Blockchain-verified digital asset ownership</li>
            <li>Cross-world travel and resource management</li>
            <li>Persistent world changes and environmental evolution</li>
          </ul>
        </div>
      </div>
    ),
  },

  PlayToEarn: {
    title: "Crypto & Blockchain",
    content: (
      <div className="space-y-6">
        <p className="text-lg leading-relaxed">
          Magic Worlds integrates Play-to-Earn (P2E) mechanics, allowing players
          to earn real-world rewards by completing missions and challenges, all
          secured by blockchain technology.
        </p>

        <h3 className="text-xl font-bold text-indigo-300">
          Key Play2 Programs
        </h3>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-indigo-500/30 bg-indigo-900/30 p-4">
            <h4 className="font-bold text-indigo-300">Play2Work</h4>
            <p className="text-sm">
              Earn rewards through virtual work simulations and productive
              activities within the game. Complete tasks, develop skills, and be
              rewarded for your contribution to the virtual economy.
            </p>
          </div>

          <div className="rounded-lg border border-green-500/30 bg-green-900/30 p-4">
            <h4 className="font-bold text-green-300">Play2Help</h4>
            <p className="text-sm">
              Donate in-game earnings to real-world charities and causes. Make a
              difference both in the virtual world and the real world by
              supporting meaningful initiatives.
            </p>
          </div>

          <div className="rounded-lg border border-blue-500/30 bg-blue-900/30 p-4">
            <h4 className="font-bold text-blue-300">Play2Health</h4>
            <p className="text-sm">
              Complete wellness and fitness challenges for tokens. Stay healthy
              and active while being rewarded for your commitment to well-being
              and physical fitness.
            </p>
          </div>

          <div className="rounded-lg border border-amber-500/30 bg-amber-900/30 p-4">
            <h4 className="font-bold text-amber-300">Play2Learn</h4>
            <p className="text-sm">
              Enhance skills through gamified education. Learn new subjects,
              develop valuable skills, and earn rewards for your intellectual
              growth and knowledge acquisition.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-purple-300">
          Magic Token & Blockchain Integration
        </h3>

        <div className="rounded-lg border border-gray-600 bg-gray-800/70 p-4">
          <p className="mb-3">
            Magic Worlds utilizes blockchain technology to provide secure
            digital ownership, transparent transactions, and fair rewards
            distribution.
          </p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="rounded border border-purple-700/30 bg-purple-950/30 p-3">
              <h4 className="font-bold text-purple-300">MAGIC Token</h4>
              <p className="text-sm">
                The universal currency for transactions, staking, and governance
                with a total supply of 1 billion tokens. Used for buying assets,
                world upgrades, and AI NPC hiring.
              </p>
            </div>
            <div className="rounded border border-blue-700/30 bg-blue-950/30 p-3">
              <h4 className="font-bold text-blue-300">World-Specific Tokens</h4>
              <p className="text-sm">
                Local currencies tied to specific worlds and their economies.
                Players can mint custom tokens for their personalized worlds and
                establish unique economic systems.
              </p>
            </div>
            <div className="rounded border border-amber-700/30 bg-amber-950/30 p-3">
              <h4 className="font-bold text-amber-300">Tokenomics</h4>
              <p className="text-sm">
                1% of each transaction is burned to reduce supply over time. 2%
                transaction fee on MAGIC trades funds development and community
                rewards.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-indigo-600 bg-indigo-900/30 p-4">
          <h3 className="mb-3 text-xl font-bold text-indigo-300">
            Economic Activities
          </h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="mr-2 mt-1 inline-block h-2 w-2 rounded-full bg-indigo-400"></span>
              <div>
                <span className="font-semibold text-white">Trading:</span> Buy
                and sell assets with MAGIC tokens in the marketplace
              </div>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1 inline-block h-2 w-2 rounded-full bg-indigo-400"></span>
              <div>
                <span className="font-semibold text-white">Staking:</span> Lock
                MAGIC tokens to earn passive income and rewards
              </div>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1 inline-block h-2 w-2 rounded-full bg-indigo-400"></span>
              <div>
                <span className="font-semibold text-white">
                  Land Ownership:
                </span>{" "}
                Purchase virtual plots as NFTs and develop them
              </div>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1 inline-block h-2 w-2 rounded-full bg-indigo-400"></span>
              <div>
                <span className="font-semibold text-white">
                  Creator Revenue:
                </span>{" "}
                Earn from content you create and share
              </div>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1 inline-block h-2 w-2 rounded-full bg-indigo-400"></span>
              <div>
                <span className="font-semibold text-white">NFT Creation:</span>{" "}
                Mint assets, skins, and world features as NFTs
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  gameplay: {
    title: "Gameplay & Mechanics",
    content: (
      <div className="space-y-6">
        <p className="text-lg leading-relaxed">
          Magic Worlds offers diverse gameplay modes and mechanics to suit
          different play styles. From exploring to creating, from social
          interactions to competitive activities, there&apos;s something for
          every player.
        </p>

        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-xl font-bold text-blue-300">Game Modes</h3>
            <div className="space-y-3 rounded-lg border border-gray-700 bg-gray-800/50 p-4">
              <div>
                <h4 className="font-bold text-blue-300">Explorer Mode</h4>
                <p className="text-sm">
                  Visit worlds, complete quests, and interact with AI NPCs.
                  Discover hidden secrets and rare resources as you travel
                  between different realms.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-green-300">Creator Mode</h4>
                <p className="text-sm">
                  Design personalized worlds, monetize with custom tokens or
                  NFTs. Express your creativity and establish your own unique
                  space in the universe.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-purple-300">Social Mode</h4>
                <p className="text-sm">
                  Collaborate, trade, or compete in shared worlds. Form
                  alliances, build communities, and participate in social
                  activities with other players.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-xl font-bold text-green-300">
              Core Mechanics
            </h3>
            <div className="space-y-3 rounded-lg border border-gray-700 bg-gray-800/50 p-4">
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  Building: Use Unity&apos;s tools to create 3D environments
                </li>
                <li>
                  Exploration: Discover various world templates and
                  user-generated realms
                </li>
                <li>
                  Interaction: Engage with AI NPCs for quests, tutoring, or
                  performances
                </li>
                <li>Economy: Earn, trade, and stake MAGIC tokens</li>
                <li>
                  Token Minting: Launch custom tokens tied to personal worlds
                </li>
                <li>Questing: Complete missions and challenges for rewards</li>
                <li>Progression: Level up skills and unlock new abilities</li>
                <li>Customization: Personalize avatars, worlds, and items</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-600 bg-gray-800/70 p-4">
          <h3 className="mb-3 text-xl font-bold text-orange-300">
            Grind Activities to Earn Tokens
          </h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="rounded border border-blue-700/30 bg-blue-950/30 p-3">
              <h4 className="font-bold text-blue-300">Explorer Grind</h4>
              <ul className="space-y-1 text-sm">
                <li>Complete AI NPC quests</li>
                <li>Discover hidden treasures or landmarks</li>
                <li>Navigate challenging environments</li>
                <li>Solve puzzles and riddles</li>
              </ul>
            </div>
            <div className="rounded border border-green-700/30 bg-green-950/30 p-3">
              <h4 className="font-bold text-green-300">Creator Grind</h4>
              <ul className="space-y-1 text-sm">
                <li>Construct assets or expand worlds</li>
                <li>Earn based on player visits</li>
                <li>Design and sell virtual items</li>
                <li>Create engaging experiences</li>
              </ul>
            </div>
            <div className="rounded border border-purple-700/30 bg-purple-950/30 p-3">
              <h4 className="font-bold text-purple-300">Social Grind</h4>
              <ul className="space-y-1 text-sm">
                <li>Team up for group projects</li>
                <li>Post gameplay on social media for rewards</li>
                <li>Participate in community events</li>
                <li>Trade and barter with other players</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-blue-500/50 bg-blue-900/30 p-4">
          <h3 className="mb-3 text-xl font-bold text-blue-300">Controls</h3>
          <div className="overflow-hidden rounded-lg border border-gray-700 bg-gray-800/50">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="font-mono px-4 py-2 text-purple-300">WASD</td>
                  <td className="px-4 py-2">Movement</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="font-mono px-4 py-2 text-purple-300">SPACE</td>
                  <td className="px-4 py-2">Jump / Levitate</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="font-mono px-4 py-2 text-purple-300">E</td>
                  <td className="px-4 py-2">Interact</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="font-mono px-4 py-2 text-purple-300">Q</td>
                  <td className="px-4 py-2">Open action wheel</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="font-mono px-4 py-2 text-purple-300">TAB</td>
                  <td className="px-4 py-2">Toggle quest journal</td>
                </tr>
                <tr>
                  <td className="font-mono px-4 py-2 text-purple-300">2025</td>
                  <td className="px-4 py-2">Return to spaceship</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ),
  },

  aiNpcs: {
    title: "AI NPCs & Characters",
    content: (
      <div className="space-y-6">
        <p className="text-lg leading-relaxed">
          Magic Worlds features unique AI-driven NPCs based on stylized
          historical or popular figures that enhance gameplay and drive the
          in-game economy. These characters offer quests, knowledge, and special
          interactions.
        </p>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-blue-500/30 bg-gradient-to-br from-blue-900/40 to-indigo-900/40 p-4">
            <h3 className="mb-2 text-xl font-bold text-blue-300">Einstein</h3>
            <p className="text-sm">
              Found in the{" "}
              <span className="font-semibold">World of Learning</span>, this
              brilliant AI tutor teaches STEM topics, offers educational quests,
              and shares fascinating insights about science and the universe.
            </p>
            <div className="mt-2 rounded bg-blue-950/60 p-2 text-xs">
              <span className="font-semibold">Special Ability:</span> Can
              simplify complex concepts and provide personalized learning paths
            </div>
          </div>

          <div className="rounded-lg border border-purple-500/30 bg-gradient-to-br from-purple-900/40 to-indigo-900/40 p-4">
            <h3 className="mb-2 text-xl font-bold text-purple-300">Mozart</h3>
            <p className="text-sm">
              Residing in <span className="font-semibold">Music World</span>,
              this virtuoso AI collaborates on compositions, judges
              performances, and teaches musical theory to aspiring musicians and
              composers.
            </p>
            <div className="mt-2 rounded bg-purple-950/60 p-2 text-xs">
              <span className="font-semibold">Special Ability:</span> Can
              transform simple melodies into complex musical arrangements
            </div>
          </div>

          <div className="rounded-lg border border-amber-500/30 bg-gradient-to-br from-amber-900/40 to-orange-900/40 p-4">
            <h3 className="mb-2 text-xl font-bold text-amber-300">
              Financial Titans
            </h3>
            <p className="text-sm">
              Characters like Mark, Jeff, Elon, and Trump populate{" "}
              <span className="font-semibold">City World</span>, challenging
              players to economic competitions and teaching business strategies.
            </p>
            <div className="mt-2 rounded bg-amber-950/60 p-2 text-xs">
              <span className="font-semibold">Special Ability:</span> Each has
              unique business strategies and economic insights to share
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-green-300">NPC Functionality</h3>
        <div className="space-y-4 rounded-lg border border-gray-600 bg-gray-800/60 p-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="rounded border border-green-700/30 bg-green-900/20 p-3">
              <h4 className="font-bold text-green-300">Quest Givers</h4>
              <p className="text-sm">
                AI NPCs assign various tasks and missions for players to
                complete. These quests range from simple errands to complex
                multi-stage adventures, each with appropriate rewards.
              </p>
            </div>
            <div className="rounded border border-blue-700/30 bg-blue-900/20 p-3">
              <h4 className="font-bold text-blue-300">Economic Agents</h4>
              <p className="text-sm">
                NPCs buy and sell goods, adjust prices based on supply and
                demand, and participate actively in the game&apos;s economy.
                Some may offer special deals or rare items.
              </p>
            </div>
            <div className="rounded border border-amber-700/30 bg-amber-900/20 p-3">
              <h4 className="font-bold text-amber-300">Skill Trainers</h4>
              <p className="text-sm">
                Many NPCs can teach real-world skills and in-game abilities.
                Learning from these characters can unlock new gameplay options
                and improve your character&apos;s capabilities.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-indigo-500/50 bg-indigo-900/30 p-4">
          <h4 className="mb-2 flex items-center text-lg font-bold">
            <svg
              className="mr-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1
              0 01-1.414 0l-.707-.707a1 1 0 00-1.414 1.414l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1
              1 0 00-1.414 1.414l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 00-.707.707a1 1 0
              001.414 1.414l.707-.707a1 1 0 01.707-.707l.707.707a1 1 0 001.414-1.414l-.707-.707a1
              1 0 01.414-1.414l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 01.414-1.414l.707.707a1
              1 0 00.707-.707a1 1 0 00-.707-.707l-.707.707a1 1 0 01-.707.707l-.707-.707a1 1 0
              00-.707-.707a1 1 0 00.707-.707l.707-.707a1 1 0 01.707-.707l.707.707a1 1 0 00.707-.707
              l-.707-.707a1 1 0 01-.707-.707l.707-.707a1 1 0 00.707-.707a1 1 0 00-.707-.707l-.707.707

              a1 1 0 01-.707.707l-.707-.707a1 1 0 00-.707-.707a1 1 0 00-.707.707l.707.707a1 1 0
              01-.707.707l-.707-.707a1 1 0 00-.707.707a1 1 0 00.707.707l.707-.707a1 1 0 01.707-.707
              l.707.707a1 1 0 00.707.707a1 1 0 00.707-.707l-.707-.707a1 1 0 01.707-.707l.707.707a1
              1 0 00.707.707a1 1 0 00.707-.707l-.707-.707a1 1 0 01.707-.707l.707.707a1 1 0 00.707.707
              a1 1 0 00.707-.707l-.707-.707z"
              ></path>
            </svg>
            AI NPC Interaction Tip
          </h4>
          <p>
            Engaging with AI NPCs can reveal hidden quests, unique items, and
            lore about the world. Make sure to talk to every character you meet
            to uncover all the secrets they hold.
          </p>
        </div>
      </div>
    ),
  },

  community: {
    title: "Community & Multiplayer",
    content: (
      <div className="space-y-6">
        <p className="text-lg leading-relaxed">
          Magic Worlds thrives on its vibrant community. Learn how to connect
          with other players, join guilds, participate in events, and contribute
          to the evolving world.
        </p>

        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-indigo-500/30 bg-indigo-900/30 p-4">
            <h3 className="mb-3 text-xl font-bold text-indigo-300">
              Multiplayer Modes
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2 mt-2 inline-block h-2 w-2 rounded-full bg-indigo-400"></span>
                <div>
                  <span className="font-semibold text-white">
                    Cooperative Questing
                  </span>
                  <p className="text-sm">
                    Form parties of up to 6 players to tackle challenging quests
                    and dungeons. Rewards are instanced for each player.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-2 inline-block h-2 w-2 rounded-full bg-indigo-400"></span>
                <div>
                  <span className="font-semibold text-white">
                    Guild Territories
                  </span>
                  <p className="text-sm">
                    Join a guild to claim and develop territory. Build
                    structures, establish trade routes, and defend against
                    rivals.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-2 inline-block h-2 w-2 rounded-full bg-indigo-400"></span>
                <div>
                  <span className="font-semibold text-white">
                    Arcane Arenas
                  </span>
                  <p className="text-sm">
                    Test your magical combat skills in structured PvP duels and
                    team-based competitions with seasonal rankings.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-purple-500/30 bg-purple-900/30 p-4">
            <h3 className="mb-3 text-xl font-bold text-purple-300">
              Community Events
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2 mt-2 inline-block h-2 w-2 rounded-full bg-purple-400"></span>
                <div>
                  <span className="font-semibold text-white">
                    Seasonal Festivals
                  </span>
                  <p className="text-sm">
                    Quarterly celebrations with unique quests, limited-time
                    rewards, and world-changing outcomes based on collective
                    player choices.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-2 inline-block h-2 w-2 rounded-full bg-purple-400"></span>
                <div>
                  <span className="font-semibold text-white">World Bosses</span>
                  <p className="text-sm">
                    Weekly spawns of powerful entities requiring dozens of
                    players to coordinate and defeat for prestigious rewards.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-2 inline-block h-2 w-2 rounded-full bg-purple-400"></span>
                <div>
                  <span className="font-semibold text-white">
                    Building Competitions
                  </span>
                  <p className="text-sm">
                    Monthly showcases where players display their architectural
                    and magical engineering prowess. Winners&apos; creations
                    become permanent landmarks.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-green-300">Guild System</h3>
        <div className="space-y-4 rounded-lg border border-gray-600 bg-gray-800/60 p-4">
          <p>
            Guilds are the backbone of the Magic Worlds community. They offer
            progression systems, shared resources, and specialized facilities.
          </p>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="rounded border border-green-700/30 bg-green-900/20 p-3">
              <h4 className="font-bold text-green-300">Guild Ranks</h4>
              <ul className="space-y-1 text-sm">
                <li>Initiate (new members)</li>
                <li>Member (basic privileges)</li>
                <li>Adept (can recruit)</li>
                <li>Elder (management rights)</li>
                <li>Council (leadership votes)</li>
                <li>Guildmaster (full control)</li>
              </ul>
            </div>
            <div className="rounded border border-blue-700/30 bg-blue-900/20 p-3">
              <h4 className="font-bold text-blue-300">Guild Facilities</h4>
              <ul className="space-y-1 text-sm">
                <li>Alchemy Laboratory</li>
                <li>Enchanting Chamber</li>
                <li>Portal Network</li>
                <li>Training Grounds</li>
                <li>Resource Repository</li>
                <li>Guild Hall (social hub)</li>
              </ul>
            </div>
            <div className="rounded border border-amber-700/30 bg-amber-900/20 p-3">
              <h4 className="font-bold text-amber-300">Guild Activities</h4>
              <ul className="space-y-1 text-sm">
                <li>Weekly raiding events</li>
                <li>Resource gathering expeditions</li>
                <li>Inter-guild tournaments</li>
                <li>Mentorship programs</li>
                <li>Magical research projects</li>
                <li>Territory defense missions</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-blue-500/50 bg-blue-900/30 p-4">
          <h4 className="mb-2 flex items-center text-lg font-bold">
            <svg
              className="mr-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"></path>
            </svg>
            Community Guidelines
          </h4>
          <p>
            Magic Worlds is committed to maintaining a positive community. All
            players must adhere to our Code of Conduct emphasizing respect,
            inclusivity, and fair play. Report disruptive behavior through the
            in-game menu or on our community discord.
          </p>
        </div>
      </div>
    ),
  },

  "game-economy": {
    title: "In-Game Economy",
    content: (
      <div className="space-y-6">
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-900/20 p-4">
          <h4 className="mb-2 font-bold text-emerald-300">Core Token: MAGIC</h4>
          <ul className="space-y-2">
            <li className="flex items-start">
              <div className="mr-2 mt-1 text-emerald-400">•</div>
              <div>
                <strong className="text-white">Purpose:</strong> Universal
                currency for transactions, staking, and governance.
              </div>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-1 text-emerald-400">•</div>
              <div>
                <strong className="text-white">Earning:</strong> Through
                gameplay activities and world contributions.
              </div>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-1 text-emerald-400">•</div>
              <div>
                <strong className="text-white">Spending:</strong> On assets,
                world upgrades, and AI NPC hiring.
              </div>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-blue-500/30 bg-blue-900/20 p-4">
            <h4 className="mb-2 font-bold text-blue-300">
              World-Specific Variants
            </h4>
            <p>
              Local currencies for specific worlds, tied to their economies.
            </p>
          </div>

          <div className="rounded-lg border border-amber-500/30 bg-amber-900/20 p-4">
            <h4 className="mb-2 font-bold text-amber-300">Tokenomics</h4>
            <ul className="space-y-1">
              <li>
                <strong className="text-white">Total Supply:</strong> 1 billion
                MAGIC tokens.
              </li>
              <li>
                <strong className="text-white">Burn Mechanism:</strong> 1% of
                each transaction burned to reduce supply.
              </li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg border border-purple-500/30 bg-purple-900/20 p-4">
          <h4 className="mb-2 font-bold text-purple-300">
            Economic Activities
          </h4>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
            <div className="rounded-md bg-purple-800/30 p-3">
              <strong className="block text-white">Trading</strong>
              <span className="text-sm">Buy/sell assets with MAGIC</span>
            </div>
            <div className="rounded-md bg-purple-800/30 p-3">
              <strong className="block text-white">Staking</strong>
              <span className="text-sm">Lock MAGIC to earn passive income</span>
            </div>
            <div className="rounded-md bg-purple-800/30 p-3">
              <strong className="block text-white">Land Ownership</strong>
              <span className="text-sm">Purchase virtual plots as NFTs</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  "technical-design": {
    title: "Technical Design",
    content: (
      <div className="space-y-4">
        <div className="rounded-lg border border-gray-500/30 bg-gray-800/50 p-4">
          <h4 className="mb-2 font-bold text-blue-300">Engine</h4>
          <p>Unity: 3D rendering, cross-platform support, asset management.</p>
        </div>

        <div className="rounded-lg border border-emerald-500/30 bg-emerald-900/20 p-4">
          <h4 className="mb-2 font-bold text-emerald-300">
            Blockchain Integration
          </h4>
          <ul className="space-y-2">
            <li className="flex items-start">
              <svg
                className="mr-2 h-5 w-5 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              <span>
                Magic Blockchain: Custom layer-1 blockchain for tokens and NFTs.
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="mr-2 h-5 w-5 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              <span>Wallet: In-game wallet for MAGIC and NFTs.</span>
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-indigo-500/30 bg-indigo-900/20 p-4">
          <h4 className="mb-2 font-bold text-indigo-300">AI Implementation</h4>
          <p>
            Agentic AI: NPCs adapt, learn, and evolve through player
            interactions.
          </p>
        </div>

        <div className="rounded-lg border border-amber-500/30 bg-amber-900/20 p-4">
          <h4 className="mb-2 font-bold text-amber-300">
            Cross-Platform Features
          </h4>
          <ul className="space-y-2">
            <li className="flex items-start">
              <svg
                className="mr-2 h-5 w-5 text-amber-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
              <span>Syncing: Worlds sync across devices via cloud saves.</span>
            </li>
            <li className="flex items-start">
              <svg
                className="mr-2 h-5 w-5 text-amber-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
              <span>
                Optimization: Adjustable settings for mobile performance.
              </span>
            </li>
          </ul>
        </div>
      </div>
    ),
  },

  //   "repository-structure": {
  //     title: "Repository Structure",
  //     content: (
  //       <div className="overflow-x-auto rounded-lg border border-gray-600 bg-gray-800 p-4">
  //         <pre className="text-sm text-gray-200">
  //           {`Magic-World/
  // │── .github/                  # GitHub-specific settings
  // │── docs/                     # Documentation
  // │   ├── patch-notes/          # Patch notes for each version
  // │   ├── project-management/   # Project management documentation
  // │   ├── README.md             # Project overview
  // │   ├── CONTRIBUTING.md       # Contribution guidelines
  // │── scripts/                  # Automation and deployment scripts
  // │── src/                      # Source code for the main game
  // │   ├── core/                 # Core game mechanics
  // │   ├── assets/               # Global assets
  // │   ├── engine/               # Game engine logic
  // │── tests/                    # Testing framework
  // │── worlds/                   # Sub-worlds stored as folders
  // │   ├── music-world/          # Music World files
  // │   ├── fashion-world/        # Fashion World files
  // │   ├── sub-world/            # Additional sub-worlds files
  // │── CHANGELOG.md              # Patch notes
  // │── LICENSE                   # Open-source license
  // │── README.md                 # Main repository overview`}
  //         </pre>
  //       </div>
  //     ),
  //   },

  monetization: {
    title: "Monetization",
    content: (
      <div className="space-y-6">
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-900/20 p-4">
          <h4 className="mb-2 font-bold text-emerald-300">Web3 Revenue</h4>
          <ul className="divide-y divide-emerald-800/30">
            <li className="py-2">
              <strong className="text-white">NFT Sales:</strong> Players
              buy/sell land, assets, and AI NPC skins.
            </li>
            <li className="py-2">
              <strong className="text-white">Token Fees:</strong> 2% transaction
              fee on MAGIC trades.
            </li>
            <li className="py-2">
              <strong className="text-white">Staking Rewards:</strong>{" "}
              Incentives for long-term token holding.
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-indigo-500/30 bg-indigo-900/20 p-4">
          <h4 className="mb-2 font-bold text-indigo-300">
            Traditional Revenue
          </h4>
          <ul className="divide-y divide-indigo-800/30">
            <li className="py-2">
              <strong className="text-white">Premium Pass:</strong> $9.99/month
              for exclusive content.
            </li>
            <li className="py-2">
              <strong className="text-white">Marketplace Fees:</strong> 10%
              commission on player-to-player sales.
            </li>
          </ul>
        </div>
      </div>
    ),
  },

  "progression-rewards": {
    title: "Progression & Rewards",
    content: (
      <div className="space-y-6">
        <div className="rounded-lg border border-blue-500/30 bg-blue-900/20 p-4">
          <h4 className="mb-2 font-bold text-blue-300">Player Levels</h4>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded-md bg-blue-800/30 p-3">
              <strong className="block text-white">Explorer Rank</strong>
              <span className="text-sm">
                Earned through quests and exploration
              </span>
            </div>
            <div className="rounded-md bg-blue-800/30 p-3">
              <strong className="block text-white">Creator Rank</strong>
              <span className="text-sm">
                Based on world popularity and quality
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-amber-500/30 bg-amber-900/20 p-4">
          <h4 className="mb-2 font-bold text-amber-300">Achievements</h4>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex items-center rounded-md bg-amber-800/30 p-3">
              <div className="mr-3 rounded-full bg-amber-600 p-1">
                <svg
                  className="h-4 w-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <div>
                <strong className="block text-white">World Maker</strong>
                <span className="text-xs">Build your first world</span>
              </div>
            </div>
            <div className="flex items-center rounded-md bg-amber-800/30 p-3">
              <div className="mr-3 rounded-full bg-amber-600 p-1">
                <svg
                  className="h-4 w-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <div>
                <strong className="block text-white">AI Maestro</strong>
                <span className="text-xs">Complete 50 NPC quests</span>
              </div>
            </div>
            <div className="flex items-center rounded-md bg-amber-800/30 p-3">
              <div className="mr-3 rounded-full bg-amber-600 p-1">
                <svg
                  className="h-4 w-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <div>
                <strong className="block text-white">Token Tycoon</strong>
                <span className="text-xs">Mint a world-specific token</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  roadmap: {
    title: "Roadmap",
    content: (
      <div className="space-y-4">
        <div className="relative pb-12">
          <div className="absolute bottom-0 left-4 top-0 w-1 bg-purple-500"></div>
          <div className="relative ml-10">
            <div className="absolute -left-10 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 shadow">
              <span className="text-white">1</span>
            </div>
            <div className="rounded-lg border border-purple-500/30 bg-purple-900/20 p-4">
              <h4 className="mb-1 font-bold text-purple-300">
                Phase 1 (Q1 2025)
              </h4>
              <p>Core engine, 4 world templates, MAGIC token launch.</p>
            </div>
          </div>
        </div>

        <div className="relative pb-12">
          <div className="absolute bottom-0 left-4 top-0 w-1 bg-indigo-500"></div>
          <div className="relative ml-10">
            <div className="absolute -left-10 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 shadow">
              <span className="text-white">2</span>
            </div>
            <div className="rounded-lg border border-indigo-500/30 bg-indigo-900/20 p-4">
              <h4 className="mb-1 font-bold text-indigo-300">
                Phase 2 (Q2 2025)
              </h4>
              <p>30+ templates, AI NPC integration, mobile release.</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative ml-10">
            <div className="absolute -left-10 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 shadow">
              <span className="text-white">3</span>
            </div>
            <div className="rounded-lg border border-blue-500/30 bg-blue-900/20 p-4">
              <h4 className="mb-1 font-bold text-blue-300">
                Phase 3 (Q3 2025)
              </h4>
              <p>
                Player token minting, full decentralization, governance voting.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  developers: {
    title: "For Developers",
    content: (
      <div className="space-y-6">
        <div className="rounded-lg border border-gray-500/30 bg-gray-800/50 p-4">
          <p>
            Interested in the technical side of Magic Worlds? Check out our
            GitHub repository for installation instructions, contribution
            guidelines, and more. We welcome developers of all skill levels to
            join our community and help shape the future of Magic Worlds.
          </p>
        </div>

        <div className="rounded-lg border border-blue-500/30 bg-blue-900/20 p-4">
          <h4 className="mb-2 font-bold text-blue-300">
            Community Contributions
          </h4>
          <ul className="space-y-2">
            <li className="flex items-start">
              <svg
                className="mr-2 h-5 w-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
              <span>
                Fork our repositories on GitHub and contribute improvements.
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="mr-2 h-5 w-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
              <span>Report bugs & suggest new features.</span>
            </li>
            <li className="flex items-start">
              <svg
                className="mr-2 h-5 w-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
              <span>Join discussions and beta testing.</span>
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-purple-500/30 bg-purple-900/20 p-4">
          <h4 className="mb-2 font-bold text-purple-300">
            Project Documentation
          </h4>
          <p>
            We maintain a comprehensive Project Roadmap outlining key milestones
            (World, AI bots, Tokens), deliverables, and deadlines. Use GitHub
            Wikis or project-plan.md files to access our documentation.
          </p>
        </div>
      </div>
    ),
  },
  "contact-support": {
    title: "Contact & Support",
    content: (
      <div className="space-y-4">
        <p className="text-lg leading-relaxed">
          Have questions or need assistance with Magic Worlds? Our team is here
          to help! Connect with us through any of these channels:
        </p>
        <div className="rounded-lg border border-blue-500/50 bg-blue-900/20 p-4">
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <strong className="text-blue-300">Email:</strong>
              <a
                href="mailto:mflynn1999@gmail.com"
                className="text-purple-300 hover:text-purple-200 hover:underline"
              >
                mflynn1999@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              <strong className="text-blue-300">Facebook:</strong>
              <a
                href="https://www.facebook.com/MagikWorlds"
                className="text-purple-300 hover:text-purple-200 hover:underline"
              >
                Magic Worlds
              </a>
            </li>
            <li className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
              <strong className="text-blue-300">Twitter:</strong>
              <a
                href="https://x.com/magicworlds3"
                className="text-purple-300 hover:text-purple-200 hover:underline"
              >
                @magicworlds3
              </a>
            </li>
            <li className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
              <strong className="text-blue-300">YouTube:</strong>
              <a
                href="https://youtube.com/@magicworldstv"
                className="text-purple-300 hover:text-purple-200 hover:underline"
              >
                Magic Worlds TV
              </a>
            </li>
            <li className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="4"></circle>
                <line x1="4.93" y1="4.93" x2="8.69" y2="8.69"></line>
                <line x1="19.07" y1="4.93" x2="15.31" y2="8.69"></line>
                <line x1="4.93" y1="19.07" x2="8.69" y2="15.31"></line>
                <line x1="19.07" y1="19.07" x2="15.31" y2="15.31"></line>
              </svg>
              <strong className="text-blue-300">Open Source:</strong>
              <a
                href="https://github.com/orgs/TheMagicWorlds"
                className="text-purple-300 hover:text-purple-200 hover:underline"
              >
                GitHub Organization
              </a>
            </li>
            <li className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              <strong className="text-blue-300">LinkedIn:</strong>
              <a
                href="https://www.linkedin.com/company/magic-worlds"
                className="text-purple-300 hover:text-purple-200 hover:underline"
              >
                Magic Worlds
              </a>
            </li>
          </ul>
        </div>
        <div className="rounded-lg border border-green-500/50 bg-green-900/20 p-4">
          <h3 className="mb-2 text-xl font-bold text-green-300">
            Support Hours
          </h3>
          <p>
            Our dedicated team is available Monday-Friday, 9 AM - 6 PM (UTC).
            Expect responses within 24 hours during business days.
          </p>
        </div>
        <p>
          Join our community Discord server for real-time assistance, gameplay
          tips, and to connect with other Magic Worlds players!
        </p>
      </div>
    ),
  },

  "knowledge-hub": {
    title: "Documents",
    content: (
      <div className="space-y-6">
        <p className="text-lg">
          Explore the latest briefs, strategy docs, and compliance resources
          powering Magic Worlds.
        </p>

        <div className="rounded-lg border border-blue-500/40 bg-blue-900/20 p-4">
          <h3 className="mb-3 text-xl font-bold text-blue-300">
            Company Intelligence
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <a
              href="https://www.notion.so/What-Happened-In-Magic-Worlds-Last-Week-28b80e68c0ea803db590ea9b9bf83d07?source=copy_link"
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col rounded-lg border border-blue-500/20 bg-blue-950/30 p-4 transition hover:border-blue-300/60 hover:bg-blue-950/60"
            >
              <h4 className="font-semibold text-white group-hover:text-blue-200">
                Weekly Recap
              </h4>
              <p className="text-sm text-blue-200/80">
                A snapshot of wins, blockers, and KPIs from the past week.
              </p>
            </a>
            <a
              href="https://www.notion.so/Company-mission-and-strategy-28b80e68c0ea80778fb5ced94a5911d0?source=copy_link"
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col rounded-lg border border-indigo-500/20 bg-indigo-950/30 p-4 transition hover:border-indigo-300/60 hover:bg-indigo-950/60"
            >
              <h4 className="font-semibold text-white group-hover:text-indigo-200">
                Mission & Strategy
              </h4>
              <p className="text-sm text-indigo-200/80">
                Our north star, strategic pillars, and execution principles.
              </p>
            </a>
            <a
              href="https://www.notion.so/Proposal-for-new-year-campaign-28b80e68c0ea8054a383c5cb0e0a4555?source=copy_link"
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col rounded-lg border border-purple-500/20 bg-purple-950/30 p-4 transition hover:border-purple-300/60 hover:bg-purple-950/60"
            >
              <h4 className="font-semibold text-white group-hover:text-purple-200">
                New Year Campaign
              </h4>
              <p className="text-sm text-purple-200/80">
                Promotional beats, creative hooks, and ROI targets.
              </p>
            </a>
            <a
              href="https://www.notion.so/Customer-feedback-report-28b80e68c0ea8080a11ad681dce56e08?source=copy_link"
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col rounded-lg border border-emerald-500/20 bg-emerald-950/30 p-4 transition hover:border-emerald-300/60 hover:bg-emerald-950/60"
            >
              <h4 className="font-semibold text-white group-hover:text-emerald-200">
                Feedback Report
              </h4>
              <p className="text-sm text-emerald-200/80">
                Player sentiment, feature requests, and action items.
              </p>
            </a>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-amber-500/30 bg-amber-900/20 p-4">
            <h3 className="mb-3 text-xl font-bold text-amber-300">
              Vision & Research
            </h3>
            <div className="space-y-3">
              <a
                href="https://www.notion.so/White-Paper_Magic-Worlds_Pioneering-Gamified-Philanthropy-in-Immersive-Gaming-Universes-2a280e68c0ea80e1a2dce8152d320e67?source=copy_link"
                target="_blank"
                rel="noreferrer"
                className="block rounded-lg border border-amber-500/30 bg-amber-950/40 px-4 py-3 text-sm transition hover:border-amber-200/60 hover:bg-amber-950/70"
              >
                White Paper — Gamified Philanthropy
              </a>
              <a
                href="https://www.notion.so/BLOCKCHAIN-and-AI-29b80e68c0ea807fba10cde147345a4f?source=copy_link"
                target="_blank"
                rel="noreferrer"
                className="block rounded-lg border border-amber-500/30 bg-amber-950/40 px-4 py-3 text-sm transition hover:border-amber-200/60 hover:bg-amber-950/70"
              >
                Blockchain & AI Architecture
              </a>
            </div>
          </div>

          <div className="rounded-lg border border-red-500/30 bg-red-900/20 p-4">
            <h3 className="mb-3 text-xl font-bold text-red-300">
              Legal Center
            </h3>
            <div className="space-y-3">
              <a
                href="https://www.notion.so/WHITEPAPER-LEGAL-DISCLAIMER-29b80e68c0ea80449413d5ad66414c50?source=copy_link"
                target="_blank"
                rel="noreferrer"
                className="block rounded-lg border border-red-500/30 bg-red-950/40 px-4 py-3 text-sm transition hover:border-red-200/60 hover:bg-red-950/70"
              >
                Legal Disclaimer
              </a>
              <a
                href="https://www.notion.so/TERMS-OF-USE-29b80e68c0ea807583f1d61b98dc2439?source=copy_link"
                target="_blank"
                rel="noreferrer"
                className="block rounded-lg border border-red-500/30 bg-red-950/40 px-4 py-3 text-sm transition hover:border-red-200/60 hover:bg-red-950/70"
              >
                Terms of Use
              </a>
              <a
                href="https://www.notion.so/PRIVACY-POLICY-29b80e68c0ea805bae7cfcfca8c661a8?source=copy_link"
                target="_blank"
                rel="noreferrer"
                className="block rounded-lg border border-red-500/30 bg-red-950/40 px-4 py-3 text-sm transition hover:border-red-200/60 hover:bg-red-950/70"
              >
                Privacy Policy
              </a>
              <a
                href="https://www.notion.so/COOKIE-POLICY-29b80e68c0ea80c89001da11ad8194f0?source=copy_link"
                target="_blank"
                rel="noreferrer"
                className="block rounded-lg border border-red-500/30 bg-red-950/40 px-4 py-3 text-sm transition hover:border-red-200/60 hover:bg-red-950/70"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  "call-to-action": {
    title: "Call-to-Action (CTA)",
    content: (
      <div className="space-y-6">
        <div className="rounded-lg border-2 border-purple-500/70 bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-6 text-center">
          <h3 className="mb-4 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-2xl font-bold text-transparent">
            Ready to embark on your journey through Magic Worlds?
          </h3>
          <p className="mb-6 text-lg">
            Sign up today and start earning rewards! Visit{" "}
            <span className="font-bold text-purple-300">
              magicworlds.free.nf
            </span>{" "}
            to begin your adventure across multiple digital realms.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/play"
              className="inline-flex items-center justify-center rounded-md bg-purple-600 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-purple-700"
            >
              Join Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </a>
            <a
              href="/worlds"
              className="inline-flex items-center justify-center rounded-md border border-blue-500 bg-transparent px-6 py-3 font-semibold text-blue-400 transition-colors hover:bg-blue-950"
            >
              Watch Trailer
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="10 8 16 12 10 16 10 8"></polygon>
              </svg>
            </a>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-blue-500/30 bg-blue-900/10 p-4 text-center">
            <h4 className="mb-2 font-bold text-blue-300">
              Early Access Benefits
            </h4>
            <p>
              Join now to receive exclusive in-game items, bonus MAGIC tokens,
              and priority access to new worlds.
            </p>
          </div>
          <div className="rounded-lg border border-green-500/30 bg-green-900/10 p-4 text-center">
            <h4 className="mb-2 font-bold text-green-300">Community Rewards</h4>
            <p>
              Invite friends and earn additional rewards. Build your network
              across multiple realms.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-900/10 p-4 text-center">
            <h4 className="mb-2 font-bold text-amber-300">Creator Economy</h4>
            <p>
              Design worlds, craft items, and earn real value from your
              creativity and imagination.
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="italic text-blue-300">
            &quot;Magic Worlds isn&apos;t just a game - it&apos;s a digital
            ecosystem where imagination becomes reality and creativity has real
            value.&quot;
          </p>
        </div>
      </div>
    ),
  },
};
