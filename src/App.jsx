import { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { animate } from 'animejs';
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import Navbar from "./components/Navbar";
import Features from "./components/Features";
import Hero from "./components/Hero";
import Blockchains from "./components/Blockchains";
import GlobalMarkets from "./components/GlobalMarkets";
import TokenizationSlider from "./components/TokenizationSlider";
import Metrics from "./components/Metrics";
import Footer from "./components/Footer";
import CTA from "./components/CTA";
import Marketplace from "./pages/Marketplace/Marketplace";
import TokenizationHub from "./pages/TokenizationHub/TokenizationHub";
import GoldMarket from "./pages/investor/GoldMarket/GoldMarket";
import RealEstateTokenization from "./pages/issuer/RealEstateTokenization/RealEstateTokenization";
import ArtTokenization from "./pages/issuer/ArtTokenization/ArtTokenization";
import CommoditiesTokenization from "./pages/issuer/CommoditiesTokenization/CommoditiesTokenization";
import CarbonCreditsTokenization from "./pages/issuer/CarbonCreditsTokenization/CarbonCreditsTokenization";
import PrivateEquityTokenization from "./pages/issuer/PrivateEquityTokenization/PrivateEquityTokenization";
import DiverseAssetTokenization from "./pages/issuer/DiverseAssetTokenization/DiverseAssetTokenization";
import RealEstateMarket from "./pages/investor/RealEstateMarket/RealEstateMarket";
import GreenTokenization from "./pages/GreenTokenization/GreenTokenization";
import SplashScreen from "./components/SplashScreen";
import ScrollToTop from "./components/ScrollToTop";
import GreenTokenizationPopup from "./components/GreenTokenizationPopup";
import GoldTokenizationPopup from "./components/GoldTokenizatinPopup";
import ScrollAnimationWrapper from "./components/ScrollAnimationWrapper";
import BackgroundPattern from "./ui/BackgroundPattern";
import { div } from "framer-motion/client";
import ArtMarket from "./pages/investor/ArtMarket/ArtMarket";
import PrivateEquityMarket from "./pages/investor/PrivateEquityMarket/PrivateEquityMarket";
import CarbonCreditsMarket from "./pages/investor/CarbonCreditsMarket/CarbonCreditsMarket";
import BlogSection from "./components/BlogSection";
import MarketSlider from "./components/MarketSlider";

/**
 * HomePage component - Main landing page layout
 * Wraps all homepage sections with the ScrollAnimationWrapper
 */
function HomePage() {
  const { scrollY } = useScroll();

  // responsive based on hero viewport height
  const viewportH = typeof window !== 'undefined' ? window.innerHeight : 800;

  const heroOpacity = useTransform(scrollY, [0, viewportH * 0.8, viewportH * 1.0], [1, 1, 0]);
  const heroScale = useTransform(scrollY, [0, viewportH], [1, 0.94]);
  const heroY = useTransform(scrollY, [0, viewportH], [0, -150]);

  return (
    <div className="relative">
      {/* Fixed hero that stays under subsequent sections */}
      <motion.section
        className="hero-section"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          zIndex: 1,
          opacity: heroOpacity,
          scale: heroScale,
          y: heroY,
          pointerEvents: scrollY.get() > viewportH ? 'none' : undefined,
        }}
      >
        <Hero />
      </motion.section>

      {/* Background pattern that sits above hero but below all other content */}
      {/* <BackgroundPattern /> */}

      {/* All other homepage sections */}
      <div
        id="main-content"
        className="sections-wrapper"
        style={{
          position: 'relative',
          zIndex: 3,
          marginTop: '110vh', // extra offset so hero finishes fading before next section
        }}
      >
        {/* <GreenTokenizationPopup />
        <GoldTokenizationPopup /> */}

        {/* <ScrollAnimationWrapper> */}
          <section className="blockchains-section">
            <Blockchains />
          </section>

          <section className="features-section">
            <Features />
          </section>
        {/* </ScrollAnimationWrapper> */}

        {/* <section className="global-markets-section">
          <GlobalMarkets />
        </section> */}

        <section className="tokenizationslider-section">
          <TokenizationSlider />
        </section>

        {/* Marketplace slider */}
        <section className="marketslider-section">
          <MarketSlider />
        </section>

        {/* <ScrollAnimationWrapper> */}
          <section className="metrics-section">
            <Metrics />
          </section>

          {/* Blog / insights */}
          <section className="blog-section">
            <BlogSection />
          </section>

          <section className="cta-section">
            <CTA />
          </section>
        {/* </ScrollAnimationWrapper> */}
      </div>
    </div>
  );
}

/**
 * App component - Main application entry point
 * Handles routing and initial app loading animations
 */
function App() {
  const [showSplash, setShowSplash] = useState(true);
  const appRef = useRef(null);
  const videoRef = useRef(null);

  // Handle splash screen timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      
      // Initial page load animation after splash screen
      if (appRef.current) {
        animate('.bg-background', {
          opacity: [0, 1],
          duration: 7000,
          easing: 'easeInOutQuad'
        });
      }
    }, 7000); 

    return () => clearTimeout(timer);
  }, []);

  // Additional animation for navbar
  useEffect(() => {
    if (!showSplash) {
      animate('nav', {
        translateY: [-50, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo'
      });
    }
  }, [showSplash]);

  // ScrollTrigger for video background
  useEffect(() => {
    if (showSplash) return; // wait until splash is gone

    const video = videoRef.current;
    if (!video) return;

    const onReady = () => {
      if (!video.duration || isNaN(video.duration)) return;

      // Kill any existing ScrollTriggers tied to this video to prevent duplicates.
      ScrollTrigger.getAll().forEach(t => t.kill());

      // Ensure GSAP renders on every frame (disables lag smoothing that can drop frames during fast scroll)
      gsap.ticker.lagSmoothing(0);

      // Create a ScrollTrigger that directly maps scroll progress to the video's currentTime
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // smooth catching-up time in seconds
        invalidateOnRefresh: true,
        onUpdate: self => {
          // Map progress (0-1) to the video's duration
          video.currentTime = self.progress * video.duration;
        }
      });
    };

    // If metadata already loaded use it immediately, otherwise wait.
    if (video.readyState >= 1) {
      onReady();
    } else {
      video.addEventListener("loadedmetadata", onReady, { once: true });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [showSplash]);

  // Show splash screen during initial load
  //if (showSplash) {
   // return <SplashScreen />;
 // }

  return (
    <Box 
      ref={appRef} 
      className="min-h-screen relative bg-custom-gradient text-text-primary overflow-x-hidden"
    >
      {/* Background Video for entire app */}
      <video
        ref={videoRef}
        className="fixed inset-0 w-full h-full object-cover z-0"
        muted
        playsInline
        preload="metadata"
      >
        <source src="/assets/bg-video-1-1080p.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay gradient for better readability */}
      <div className="fixed inset-0 bg-black/20 z-10"></div>
      
      <ScrollToTop />
      <Navbar />
      <main className="relative z-20 overflow-x-hidden">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/tokenization" element={<TokenizationHub />} />
          <Route path="/green-tokenization" element={<GreenTokenization />} />
          <Route path="/tokenization/real-estate/" element={<RealEstateTokenization />} />
          <Route path="/tokenization/art" element={<ArtTokenization />} />
          <Route path="/tokenization/Commodities" element={<CommoditiesTokenization />} />
          <Route path="/tokenization/carbon-credits" element={<CarbonCreditsTokenization />} />
          <Route path="/tokenization/private-equity" element={<PrivateEquityTokenization />} />
          <Route path="/tokenization/other-assets" element={<DiverseAssetTokenization />} />
          <Route path="/market/gold/" element={<GoldMarket />} />
          <Route path="/market/real-estate/" element={<RealEstateMarket />} />
          <Route path="/market/art/" element={<ArtMarket />} />
          <Route path="/market/private-equity/" element={<PrivateEquityMarket />} />
          <Route path="/market/carbon-credits/" element={<CarbonCreditsMarket />} />
        </Routes>
      </main>
      <Footer />
    </Box>
  );
}

export default App;