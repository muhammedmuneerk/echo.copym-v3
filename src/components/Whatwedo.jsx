import React, { useRef } from "react";
import { Container, Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import CustomButton from "./CustomButton";
import { useNavigate } from "react-router-dom";
import GradientLetters from "./GradientLetters";

// Background motion effect
const CameraBackground = ({ children, disable = false }) => {
  if (disable) return <>{children}</>; // Return plain children when disabled (e.g., on small screens)
  const backgroundRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: backgroundRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [-50, 0, 50]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [25, 0, -25]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-30, 0, 30]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);

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

const WhatWeDo = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleExplore = () => navigate("/tokenization");
  const handleAction = () => navigate("/marketplace");

  return (
    <Box id="what-we-do-section" className="py-12 md:py-16 lg:py-10 relative overflow-hidden"
    // sx={{
    //           backgroundImage: 'url(/assets/sections/bg-features-section.png)',
    //           backgroundSize: 'cover',
    //           backgroundPosition: 'center',
    //           borderRadius: "2.5rem",
    //           backgroundRepeat: 'no-repeat',
    //           boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    //           border: '5px solid rgba(255, 255, 255, 0.1)',
    //           backdropFilter: 'blur(10px)',
    //           minHeight: '580px',
    //           px: { xs: 2, sm: 4, md: 6 },
    //           py: { xs: 6, sm: 8, md: 10 },
    //         }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        {/* <CameraBackground disable={isMobile}> */}
          <Grid
            container
            sx={{
              px: { xs: 2, sm: 4, md: 6 },
           py: { xs: 6, sm: 8, md: 10 },
            }}
          >
            {/* Content Row */}
            <Grid item xs={12}>
              <Grid container spacing={{ xs: 4, md: 2 }} alignItems="flex-start">
                {/* Left Column: Title & Description */}
                <Grid item xs={12} md={6}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <Typography
                      variant="h2"
                      className="text-3xl sm:text-4xl md:text-5xl mb-2 md:mb-4 pb-1 text-center md:text-left"
                    >
                      {/* Small screens: two-line title */}
                      <Box className="block md:hidden">
                        <Box className="flex flex-wrap justify-center">
                          <GradientLetters text="Tokenization Made" keyPrefix="sm-line1" />
                        </Box>
                        <Box className="flex flex-wrap justify-center mt-1">
                          <GradientLetters text="Simple" keyPrefix="sm-line2" />
                        </Box>
                      </Box>

                      {/* Medium & large screens: single-line title */}
                      <Box className="hidden md:flex flex-wrap justify-start">
                        <GradientLetters text="Tokenization Made Simple" keyPrefix="lg-line" />
                      </Box>
                    </Typography>
                    <Typography
                      variant="body1"
                      className="max-w-md text-center md:text-left text-sm sm:text-base"
                      sx={{ color: 'white', opacity: 0.9 }}
                    >
                      Understand how assets like gold, real estate, and collectibles move on-chain using our simplified process.
                    </Typography>
                  </motion.div>
                </Grid>

                {/* Right Column: Image */}
                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <Box component="img"
                      src="/assets/images/copym-platform.png"
                      alt="Tokenization Flowchart"
                      sx={{
                        width: '100%',
                        maxWidth: '500px',
                        height: '100%',
                        borderRadius: '2.5rem',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                        border: '5px solid rgba(255, 255, 255, 0.1)',
                        opacity: 0.85,
                      }}
                    />
                  </motion.div>
                </Grid>
              </Grid>
            </Grid>

            {/* Buttons Row */}
            <Grid item xs={12} sx={{ mt: { xs: 4, md: 6 } }}>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                <CustomButton label="Bring It On-Chain" onClick={handleExplore} />
                <CustomButton label="Explore High-Yield Assets" onClick={handleAction} />
              </Box>
            </Grid>
          </Grid>
        {/* </CameraBackground> */}
      </Container>
    </Box>
  );
};

export default WhatWeDo;
