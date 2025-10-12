"use client";

import React from "react";

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
          an immersive gaming experience that transports you to fantastical
          dimensions filled with adventure, mystery, and magic.
        </p>

        <div className="rounded-lg border border-purple-500/50 bg-purple-900/30 p-4">
          <h3 className="mb-2 text-xl font-bold text-purple-300">
            What Makes Magic Worlds Special?
          </h3>
          <p>
            Unlike traditional games, Magic Worlds combines procedural
            generation with hand-crafted storytelling to create unique
            experiences for every player. Your choices matter, permanently
            altering the world around you.
          </p>
        </div>

        <h3 className="text-xl font-bold text-blue-300">Key Highlights</h3>
        <ul className="list-disc space-y-2 pl-6">
          <li>Dynamic, ever-evolving game world</li>
          <li>Personalized magic system that adapts to your playstyle</li>
          <li>Cross-platform multiplayer with seamless integration</li>
          <li>Community-driven world events and seasonal content</li>
          <li>Advanced AI companions that remember your journey</li>
        </ul>

        <p>
          This documentation will guide you through everything you need to know
          about Magic Worlds, from your first steps into the realm to becoming a
          master wizard capable of shaping reality itself.
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
          account, create your first character, and take your initial steps into
          the magical realms.
        </p>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-blue-500/30 bg-gray-800/50 p-4">
            <h3 className="mb-2 text-xl font-bold text-blue-300">
              System Requirements
            </h3>
            <ul className="space-y-1">
              <li>OS: Windows 10/11, macOS 11+, Linux</li>
              <li>CPU: Intel i5 / AMD Ryzen 5 or better</li>
              <li>RAM: 8GB minimum, 16GB recommended</li>
              <li>GPU: GTX 1060 / RX 580 or better</li>
              <li>Storage: 40GB available space</li>
              <li>Internet: Broadband connection</li>
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
                Exclusive cosmetics & mount
              </li>
              <li>
                <span className="font-semibold text-white">
                  Collector&apos;s:
                </span>{" "}
                + Art book, soundtrack & season pass
              </li>
              <li>
                <span className="font-semibold text-white">Legendary:</span> +
                Beta access & named NPC
              </li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-indigo-300">
          Installation Steps
        </h3>
        <ol className="list-decimal space-y-2 pl-6">
          <li>
            Create an account at{" "}
            <span className="font-mono rounded bg-purple-900/50 px-2 py-1 text-purple-200">
              play.magicworlds.com
            </span>
          </li>
          <li>Download the launcher for your platform</li>
          <li>Sign in with your account credentials</li>
          <li>Select your preferred installation location</li>
          <li>Choose which content packs to install (Core is required)</li>
          <li>Wait for installation to complete</li>
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
            privileges on your device.
          </p>
        </div>
      </div>
    ),
  },

  features: {
    title: "Features & Systems",
    content: (
      <div className="space-y-6">
        <p className="text-lg leading-relaxed">
          Magic Worlds offers a variety of innovative features that set it apart
          from other games in the fantasy genre. Discover the mechanics that
          make your journey unique.
        </p>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-purple-500/30 bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-4">
            <h3 className="mb-2 text-xl font-bold text-purple-300">
              Adaptive Magic
            </h3>
            <p>
              Your spellcasting evolves based on your choices. Cast fire spells
              often? Your flames grow stronger, but ice magic becomes harder to
              master.
            </p>
          </div>

          <div className="rounded-lg border border-blue-500/30 bg-gradient-to-br from-blue-900/40 to-cyan-900/40 p-4">
            <h3 className="mb-2 text-xl font-bold text-blue-300">
              Realm Shaping
            </h3>
            <p>
              Advanced players can alter the landscape, create structures, and
              even establish settlements that others can discover.
            </p>
          </div>

          <div className="rounded-lg border border-green-500/30 bg-gradient-to-br from-green-900/40 to-emerald-900/40 p-4">
            <h3 className="mb-2 text-xl font-bold text-green-300">
              Living Ecology
            </h3>
            <p>
              Creatures adapt to player behavior. Hunting too many wolves?
              Expect deer populations to surge and new challenges to emerge.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-indigo-300">
          Magic System Progression
        </h3>
        <div className="relative">
          <div className="absolute bottom-0 left-6 top-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600"></div>
          <div className="relative ml-14 space-y-6">
            <div>
              <div className="absolute -left-10 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500">
                1
              </div>
              <h4 className="text-lg font-semibold">Apprentice</h4>
              <p>
                Learn basic spells across the six elements. Focus on channeling
                energy and controlling magical flow.
              </p>
            </div>

            <div>
              <div className="absolute -left-10 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500">
                2
              </div>
              <h4 className="text-lg font-semibold">Adept</h4>
              <p>
                Specialize in two elements. Combine simple spells to create new
                effects and discover your affinity.
              </p>
            </div>

            <div>
              <div className="absolute -left-10 flex h-6 w-6 items-center justify-center rounded-full bg-violet-500">
                3
              </div>
              <h4 className="text-lg font-semibold">Master</h4>
              <p>
                Perfect your chosen path. Create personalized spells and enchant
                items with permanent magical properties.
              </p>
            </div>

            <div>
              <div className="absolute -left-10 flex h-6 w-6 items-center justify-center rounded-full bg-purple-500">
                4
              </div>
              <h4 className="text-lg font-semibold">Archmage</h4>
              <p>
                Bend reality to your will. Establish magical sanctums, mentor
                apprentices, and influence world events.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  gameplay: {
    title: "Mechanics & Controls",
    content: (
      <div className="space-y-6">
        <p className="text-lg leading-relaxed">
          Master the various gameplay mechanics and controls to navigate the
          magical realms with ease and precision.
        </p>

        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-xl font-bold text-blue-300">
              Basic Controls
            </h3>
            <div className="overflow-hidden rounded-lg border border-gray-700 bg-gray-800/50">
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="font-mono px-4 py-2 text-purple-300">
                      WASD
                    </td>
                    <td className="px-4 py-2">Movement</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="font-mono px-4 py-2 text-purple-300">
                      SPACE
                    </td>
                    <td className="px-4 py-2">Jump / Levitate</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="font-mono px-4 py-2 text-purple-300">E</td>
                    <td className="px-4 py-2">Interact</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="font-mono px-4 py-2 text-purple-300">F</td>
                    <td className="px-4 py-2">Cast selected spell</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="font-mono px-4 py-2 text-purple-300">Q</td>
                    <td className="px-4 py-2">Open spell wheel</td>
                  </tr>
                  <tr>
                    <td className="font-mono px-4 py-2 text-purple-300">TAB</td>
                    <td className="px-4 py-2">Toggle quest journal</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-xl font-bold text-green-300">
              Combat System
            </h3>
            <div className="space-y-3 rounded-lg border border-gray-700 bg-gray-800/50 p-4">
              <p>
                Combat in Magic Worlds combines spell-casting with tactical
                positioning. Each enemy has strengths and weaknesses to
                different magical elements.
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Left-click for quick attack</li>
                <li>Hold right-click to charge powerful spells</li>
                <li>Dodge rolls provide brief invulnerability</li>
                <li>Chain different elemental spells for combo effects</li>
                <li>Environmental interactions can turn the tide of battle</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-600 bg-gray-800/70 p-4">
          <h3 className="mb-3 text-xl font-bold text-orange-300">
            Spell Crafting System
          </h3>
          <p className="mb-3">
            Create your own spells by combining magical essences with intent
            patterns. Each spell has three components:
          </p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="rounded border border-orange-700/30 bg-orange-950/30 p-3">
              <h4 className="font-bold text-orange-300">Element</h4>
              <p className="text-sm">
                The base magical substance: Fire, Water, Earth, Air, Light, or
                Shadow.
              </p>
            </div>
            <div className="rounded border border-blue-700/30 bg-blue-950/30 p-3">
              <h4 className="font-bold text-blue-300">Form</h4>
              <p className="text-sm">
                How the spell manifests: Projectile, Burst, Beam, Shield,
                Enchantment, or Summoning.
              </p>
            </div>
            <div className="rounded border border-purple-700/30 bg-purple-950/30 p-3">
              <h4 className="font-bold text-purple-300">Modifier</h4>
              <p className="text-sm">
                Special properties: Duration, Power, Range, Silence, Bounce, or
                Split.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-blue-500/50 bg-blue-900/30 p-4">
          <h4 className="mb-2 text-lg font-bold">Pro Tip: Quick Casting</h4>
          <p>
            Assign your favorite spells to hotkeys (1-9) for instant access
            during combat. You can create different hotkey profiles for various
            scenarios (exploration, combat, social).
          </p>
        </div>
      </div>
    ),
  },

  worldBuilding: {
    title: "World of Worlds",
    content: (
      <div className="space-y-6">
        <p className="text-lg leading-relaxed">
          Immerse yourself in the rich lore and diverse regions of Magic Worlds.
          From ancient histories to current conflicts, discover the stories that
          shape this mystical universe.
        </p>

        <div className="mb-6 rounded-lg border border-gray-600 bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-5">
          <h3 className="mb-3 text-2xl font-bold text-amber-300">
            The World of Aetheria
          </h3>
          <p className="mb-4">
            Aetheria exists across multiple planes of reality, connected by
            ancient portals and ley lines of magical energy. After the
            Convergence event 1,000 years ago, five distinct realms became
            inexorably linked.
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded border border-blue-700/30 bg-blue-900/30 p-3">
              <h4 className="font-bold text-blue-300">Crystalline Heights</h4>
              <p className="text-sm">
                Floating islands of crystal formations where the air is thick
                with magic. Home to the scholarly Aether Mages.
              </p>
            </div>
            <div className="rounded border border-green-700/30 bg-green-900/30 p-3">
              <h4 className="font-bold text-green-300">Verdant Wilds</h4>
              <p className="text-sm">
                Primeval forests where ancient spirits dwell. The boundary
                between plant and animal blurs in this realm.
              </p>
            </div>
            <div className="rounded border border-red-700/30 bg-red-900/30 p-3">
              <h4 className="font-bold text-red-300">Molten Core</h4>
              <p className="text-sm">
                A realm of fire and stone where powerful elementals forge
                magical artifacts in eternal flames.
              </p>
            </div>
            <div className="rounded border border-indigo-700/30 bg-indigo-900/30 p-3">
              <h4 className="font-bold text-indigo-300">Abyssal Depths</h4>
              <p className="text-sm">
                The mysterious ocean realms where ancient leviathans and the
                secretive Mer civilizations reside.
              </p>
            </div>
            <div className="rounded border border-purple-700/30 bg-purple-900/30 p-3">
              <h4 className="font-bold text-purple-300">Shadow Veil</h4>
              <p className="text-sm">
                The space between realms, where dreams and nightmares take
                physical form. Few return unchanged.
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-purple-300">Major Factions</h3>
        <div className="space-y-4">
          <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
            <h4 className="flex items-center font-bold text-amber-300">
              <span className="mr-2 inline-block h-3 w-3 rounded-full bg-amber-400"></span>
              The Arcanum Council
            </h4>
            <p>
              The governing body of magical practitioners, dedicated to
              maintaining balance between the realms and regulating dangerous
              magic. Based in the neutral city of Lumina.
            </p>
          </div>

          <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
            <h4 className="flex items-center font-bold text-emerald-300">
              <span className="mr-2 inline-block h-3 w-3 rounded-full bg-emerald-400"></span>
              Keepers of the Wild
            </h4>
            <p>
              Druids and shamans who protect the natural order of magic. They
              seek to restore balance to ecosystems disturbed by careless
              spellcasting.
            </p>
          </div>

          <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
            <h4 className="flex items-center font-bold text-red-300">
              <span className="mr-2 inline-block h-3 w-3 rounded-full bg-red-400"></span>
              The Ashen Hand
            </h4>
            <p>
              A secretive organization that believes all magic should be free
              from regulation. They work from the shadows to undermine the
              Arcanum&apos;s authority.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-gray-600 bg-gray-800/70 p-4">
          <h3 className="mb-2 text-xl font-bold text-blue-300">
            Timeline of Major Events
          </h3>
          <div className="space-y-3">
            <div className="flex">
              <div className="font-mono w-24 flex-shrink-0 text-amber-300">
                Year 0
              </div>
              <div>
                The Convergence - Five separate realms collide, forever changing
                the nature of magic
              </div>
            </div>
            <div className="flex">
              <div className="font-mono w-24 flex-shrink-0 text-amber-300">
                Year 212
              </div>
              <div>
                Formation of the Arcanum Council following the Mage Wars
              </div>
            </div>
            <div className="flex">
              <div className="font-mono w-24 flex-shrink-0 text-amber-300">
                Year 578
              </div>
              <div>
                The Great Sealing - Dangerous void entities contained beyond the
                Veil
              </div>
            </div>
            <div className="flex">
              <div className="font-mono w-24 flex-shrink-0 text-amber-300">
                Year 942
              </div>
              <div>
                Emergence of Wild Magic - Unpredictable magical anomalies begin
                appearing
              </div>
            </div>
            <div className="flex">
              <div className="font-mono w-24 flex-shrink-0 text-amber-300">
                Year 998
              </div>
              <div>
                Present day - Signs of the Veil weakening as the Millennial
                Convergence approaches
              </div>
            </div>
          </div>
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

  developers: {
    title: "Developer Resources",
    content: (
      <div className="space-y-6">
        <p className="text-lg leading-relaxed">
          Magic Worlds provides extensive modding support and APIs for
          developers interested in extending the game with custom content,
          tools, and integrations.
        </p>

        <div className="mb-6 rounded-lg border border-gray-600 bg-gray-800/60 p-4">
          <h3 className="mb-3 text-xl font-bold text-blue-300">
            API Documentation
          </h3>
          <p className="mb-4">
            Our comprehensive API allows developers to interact with the game in
            various ways:
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded border border-blue-700/30 bg-blue-900/30 p-3">
              <h4 className="font-bold text-blue-300">World Data API</h4>
              <p className="mb-2 text-sm">
                Access game world information and modify environments.
              </p>
              <div className="font-mono rounded bg-gray-900/80 p-2 text-xs text-green-300">
                GET /api/v1/world/regions
                <br />
                GET /api/v1/world/entities
                <br />
                POST /api/v1/world/objects
              </div>
            </div>

            <div className="rounded border border-indigo-700/30 bg-indigo-900/30 p-3">
              <h4 className="font-bold text-indigo-300">Character API</h4>
              <p className="mb-2 text-sm">
                Manage player characters, inventories, and progression.
              </p>
              <div className="font-mono rounded bg-gray-900/80 p-2 text-xs text-green-300">
                GET /api/v1/character/inventory
                <br />
                POST /api/v1/character/equip
                <br />
                DELETE /api/v1/character/delete
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-purple-300">Modding Tools</h3>

        <div className="rounded-lg border border-gray-600 bg-gray-800/60 p-4">
          <h3 className="mb-3 text-xl font-bold text-blue-300">Asset Editor</h3>
          <p className="mb-4">
            Create custom models, textures, animations, and effects for use in
            the game. The editor supports importing popular file formats and
            exporting to our proprietary format.
          </p>

          <h3 className="mb-3 text-xl font-bold text-green-300">
            Scripting Engine
          </h3>
          <p className="mb-4">
            Develop interactive quests, NPC behaviors, and world events using
            our Lua-based scripting language. The engine provides access to game
            systems and events.
          </p>

          <h3 className="mb-3 text-xl font-bold text-purple-300">
            Plugin Framework
          </h3>
          <p>
            Extend the game&apos;s functionality with custom plugins that can
            modify UI elements, add new features, or integrate with external
            services. Plugins are written in C# and compiled at runtime.
          </p>
        </div>
      </div>
    ),
  },
};
