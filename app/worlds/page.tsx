import React from "react";
import { Metadata } from "next";
import Game from "@/components/Games";
import ExampleGameplayShowcase from "@/components/Worlds";
import DynamicGameplayShowcase from "@/components/Worlds";
import VideoGallery from "@/components/Worlds";
import EpicGamingShowcase from "@/components/Worlds";

export const metadata: Metadata = {
  title: "Worlds Page - Watch Gameplays",
  description: "Built by MagicWorlds",
  // other metadata
};

export const dynamic = "force-dynamic";

const PlayPage = () => {
  return (
    <main>
      <EpicGamingShowcase />
    </main>
  );
};

export default PlayPage;
