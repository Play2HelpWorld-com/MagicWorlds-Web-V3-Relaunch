"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Lines from "@/components/Lines";
import ScrollToTop from "@/components/ScrollToTop";
import MarketingBanner from "@/components/Hero/MarketingBanner";
import { ThemeProvider } from "next-themes";
import { Inter, Orbitron, Rajdhani, Exo_2 } from "next/font/google";
import "./globals.css";
import ToasterContext from "./utils/context/ToastContext";
import StoreProvider from "./utils/provider/StoreProvider";
import { useEffect } from "react";
import { useAppDispatch } from "@/configs/redux/hooks";
import { fetchLoggedInUser } from "@/configs/redux/auth/authSlice";
import { WagmiProviderComponent } from "./utils/provider/WagmiProvider";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });
const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
});
const exo2 = Exo_2({ subsets: ["latin"], variable: "--font-exo2" });

const ReduxInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchLoggedInUser());
  }, [dispatch]);
  return <>{children}</>;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${orbitron.variable} ${rajdhani.variable} ${exo2.variable}`}
      >
        <meta
          name="impact-site-verification"
          content="3211f99b-74dc-43e7-9fe6-193de26f04a0"
        />
        <SpeedInsights />
        <body
          className={`${inter.className} relative min-h-screen overflow-x-hidden`}
        >
          {/* Global background - solid colors only */}
          <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#0a0015] via-[#1a0b2e] to-[#0a0015]" />

          <ThemeProvider
            enableSystem={false}
            attribute="class"
            defaultTheme="dark"
          >
            <WagmiProviderComponent>
              <ReduxInitializer>
                <MarketingBanner />
                <div className="relative z-10">
                  {/* <Lines /> */}
                  <Header />
                  <ToasterContext />
                  <Toaster
                    position="top-right"
                    closeButton={true}
                    richColors
                    toastOptions={{ classNames: { toast: "px-4 py-4" } }}
                  />
                  {children}
                  <Footer />
                  <ScrollToTop />
                </div>
              </ReduxInitializer>
            </WagmiProviderComponent>
          </ThemeProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
