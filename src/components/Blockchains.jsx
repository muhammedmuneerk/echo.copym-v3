import { Container, Typography, Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import SectionImage from "./SectionImages";
import BackgroundGlowEffect from "../ui/BackgroundGlowEffect";
import GradientLetters from "./GradientLetters";
import TokenizationAnimation from "./TokenizationAnimation";

const blockchains = [
 {
    name: "Solana",
    logo: <img src="/assets/blockchains-logos/solana-logo-white-removebg-preview.png" alt="Solana" className="w-full h-full object-contain" />,
  },
  {
    name: "Polygon",
    logo: <img src="/assets/blockchains-logos/Polygon-removebg-preview.png" alt="Polygon" className="w-full h-full object-contain" />,
  },
  {
    name: "Binance",
    logo: <img src="/assets/blockchains-logos/binance-removebg-preview.png" alt="Binance" className="w-full h-full object-contain" />,
  },
  {
    name: "Cardano",
    logo: <img src="/assets/blockchains-logos/Cardano-Logo.png" alt="Cardano" className="w-full h-full object-contain" />,
  },
  {
    name: "Optimism",
    logo: <img src="/assets/blockchains-logos/Optimism-removebg-preview.png" alt="Optimism" className="w-full h-full object-contain" />,
  },
];

// 3D Camera-Based Background Component
const CameraBackground = ({ children }) => {
  const backgroundRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: backgroundRef,
    offset: ["start end", "end start"]
  });
  
  // Camera effect: coming from far away, then going far away
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]); // Far -> Close -> Far
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]); // Moving up as it comes closer
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [-50, 0, 50]); // Side movement for depth
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [25, 0, -25]); // Angle changes for perspective
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-30, 0, 30]); // Rotation for 3D effect
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]); // Fade for depth perception
  
  return (
    <motion.div
      ref={backgroundRef}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '800px',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <motion.div
        style={{
          scale,
          x,
          y,
          rotateX,
          rotateY,
          opacity,
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%',
        }}
        transition={{ duration: 0.05, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default function Blockchains() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [key, setKey] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [slot1Icon, setSlot1Icon] = useState(0);
  const [slot2Icon, setSlot2Icon] = useState(1);
  const [slot3Icon, setSlot3Icon] = useState(2);

  // Function to handle visibility changes
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setKey(prevKey => prevKey + 1);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('blockchains-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  // Handle icon rotation
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setSlot1Icon(prev => (prev + 1) % blockchains.length);
        
        setTimeout(() => {
          setSlot2Icon(prev => (prev + 1) % blockchains.length);
        }, 700);
        
        setTimeout(() => {
          setSlot3Icon(prev => (prev + 1) % blockchains.length);
        }, 1400);
        
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  // Responsive styling variables
  const getGlobePosition = () => {
    if (isMobile) {
      // For mobile, place the globe in the middle (after description, before icons)
      return { 
        position: "relative", 
        height: "260px", 
        marginTop: "-20px",
        marginBottom: "-80px" // Creates overlap with icons below
      };
    }
    if (isTablet) return { 
      right: 0, 
      height: "400px", 
      marginTop: "100px",
      position: "absolute"
    };
    return { 
      right: 0, 
      height: "700px", 
      marginTop: "200px",
      position: "absolute"
    };
  };

  const getSlotSize = () => {
    if (isMobile) return { width: "30%", height: "100px" };
    if (isTablet) return { width: "28%", height: "140px" };
    return { width: "25%", height: "180px" };
  };

  const getIconSize = () => {
    if (isMobile) return "w-20 h-20";
    if (isTablet) return "w-24 h-24";
    return "w-40 h-40";
  };

  const globeStyles = getGlobePosition();
  const slotStyles = getSlotSize();
  const iconSizeClass = getIconSize();

  return (
    <Box
      id="blockchains-section"
      className="py-12 md:py-16 lg:py-10 relative overflow-hidden"
    >
      {/* Blockchain Image - For tablet and desktop only */}
      {!isMobile && (
        <Box sx={{ 
          position: globeStyles.position, 
          top: 0, 
          right: globeStyles.right,
          width: isTablet ? "70%" : "60%",
          bottom: 0, 
          zIndex: 3, 
          opacity: 1,
          height: globeStyles.height,
          marginTop: globeStyles.marginTop,
          pointerEvents: "none",
          display: "flex",
          justifyContent: "flex-end",
        }}>
          <Box className="ml-28 pl-28  -mt-24 "  sx={{ width: "100%", height: "100%",  }}>
            <TokenizationAnimation />
          </Box>
        </Box>
      )}

      {/* Content Container */}
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        {/* Outer Grid now carries the section background with scroll-triggered 3D tilt effect */}
        <CameraBackground>
          <Grid
            container
            sx={{
              backgroundImage: 'url(/assets/sections/bg-blockchains-section-1.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: "2.5rem",
              backgroundRepeat: 'no-repeat',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              border: '5px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              minHeight: '400px',
            }}
          >
            <Grid item xs={12}>
              <Grid container spacing={isMobile ? 1 : 2} alignItems="center">
                {/* Text section */}
                <Grid item xs={12} md={6}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-8 md:mb-12 -mt-28"
                  >
                    <Typography
                      variant="h2"
                      className="text-3xl sm:text-4xl md:text-5xl mb-2 md:mb-4 pb-1 text-center"
                    >
                      {/* First Line */}
                      <Box component="div" className="flex flex-wrap justify-center">
                        <GradientLetters text="Unified Access to All" keyPrefix="line1" />
                      </Box>

                      {/* Second Line */}
                      <Box component="div" className="flex flex-wrap justify-center mt-1">
                        <GradientLetters text="Major Blockchains" keyPrefix="line2" />
                      </Box>
                    </Typography>

                    <Typography
                      variant="body1"
                      className=" max-w-2xl mx-auto text-center text-sm sm:text-base px-4"
                    >
                      Tokenize assets on your preferred blockchain. Copym provides
                      seamless integration with all major networks through a single,
                      unified platform.
                    </Typography>
                  </motion.div>
                </Grid>

                {/* Hidden on mobile, visible on desktop */}
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: { xs: "none", md: "block" },
                    opacity: "10",
                    // marginBottom: "-50px",
                  }}
                >
                  <Box sx={{ position: "relative", width: "100%", height: "450px" }}>
                    {/* Space reserved for the 3D model */}
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            {/* Blockchain Image for Mobile - Between description and icons */}
            {isMobile && (
              <Grid item xs={12}>
                <Box sx={{ 
                  width: "100%",
                  zIndex: 0, 
                  opacity: 0.5,
                  height: globeStyles.height,
                  marginTop: "40px",
                  marginBottom: "-40px",
                  pointerEvents: "none",
                  padding: "20px"
                }}>
                  <img 
                    loading="lazy"
                    src="/assets/sections/blockchain-1.png" 
                    alt="Blockchain" 
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain"
                    }}
                  />
                </Box>
              </Grid>
            )}

            {/* Blockchain icons display */}
            <Grid item xs={12}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  mt: isMobile ? 4 : isTablet ? 3 : 1,
                  mb: isMobile ? 4 : isTablet ? 3 : 1,
                  display: "flex",
                  justifyContent: "space-evenly",
                  zIndex: isMobile ? 2 : 1,
                  px: isMobile ? 1 : 0,
                }}
              >
                {/* Slot 1 */}
                <Box
                  sx={{
                    width: slotStyles.width,
                    position: "relative",
                    height: slotStyles.height,
                    overflow: "hidden",
                  }}
                >
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={`slot1-${slot1Icon}-${key}`}
                      initial={{ opacity: 0, y: 100 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -100 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 120,
                        damping: 20,
                        duration: 0.8
                      }}
                      whileHover={{ opacity: 1, scale: 1.05 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <Box className={iconSizeClass}>
                        {blockchains[slot1Icon].logo}
                      </Box>
                    </motion.div>
                  </AnimatePresence>
                </Box>
                
                {/* Slot 2 */}
                <Box
                  sx={{
                    width: slotStyles.width,
                    position: "relative",
                    height: slotStyles.height,
                    overflow: "hidden",
                  }}
                >
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={`slot2-${slot2Icon}-${key}`}
                      initial={{ opacity: 0, y: 100 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -100 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 120,
                        damping: 20,
                        duration: 0.8
                      }}
                      whileHover={{ opacity: 1, scale: 1.05 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <Box className={iconSizeClass}>
                        {blockchains[slot2Icon].logo}
                      </Box>
                    </motion.div>
                  </AnimatePresence>
                </Box>
                
                {/* Slot 3 */}
                <Box
                  sx={{
                    width: slotStyles.width,
                    position: "relative",
                    height: slotStyles.height,
                    overflow: "hidden",
                  }}
                >
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={`slot3-${slot3Icon}-${key}`}
                      initial={{ opacity: 0, y: 100 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -100 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 120,
                        damping: 20,
                        duration: 0.8
                      }}
                      whileHover={{ opacity: 1, scale: 1.05 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <Box className={iconSizeClass}>
                        {blockchains[slot3Icon].logo}
                      </Box>
                    </motion.div>
                  </AnimatePresence>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CameraBackground>
      </Container>

      {/* Background glow effect commented out as in original code */}
      {/* <BackgroundGlowEffect/> */}
    </Box>
  );
}