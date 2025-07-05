import React, { useRef } from "react";
import { Container, Box, Grid, Typography } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import CustomButton from "./CustomButton";
import { useNavigate } from "react-router-dom";

// Background motion effect
const CameraBackground = ({ children }) => {
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
  const handleExplore = () => navigate("/tokenization");
  const handleAction = () => navigate("/marketplace");

  return (
    <Box id="what-we-do-section" className="py-12 md:py-16 lg:py-10 relative overflow-hidden">
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <CameraBackground>
          <Grid
            container
            sx={{
              backgroundImage: 'url(/assets/sections/bg-features-section.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: "2.5rem",
              backgroundRepeat: 'no-repeat',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              border: '5px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              minHeight: '580px',
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              px: { xs: 2, sm: 6, md: 10 },
              py: { xs: 6, sm: 8, md: 10 },
              textAlign: "center"
            }}
          >
            {/* Top Left Content */}
            <Box
              sx={{
                position: "absolute",
                top: 24,
                left: 32,
                maxWidth: "380px",
                textAlign: "left"
              }}
            >
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Tokenization Made Simple
              </Typography>
              <Typography variant="body1" color="white" sx={{ opacity: 0.85 }}>
                Understand how assets like gold, real estate, and collectibles move on-chain using our simplified process.
              </Typography>
            </Box>

            {/* Centered Image */}
          <Box sx={{ mt: 8, mb: 4 }}>
  <img
    src="/assets/images/flowchart-removebg.png"
    alt="Tokenization Flowchart"
    style={{
      maxWidth: "100%",
      height: "auto",
      maxHeight: "340px",
      borderRadius: "16px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      opacity: 0.85, // slightly transparent
      // border: "4px solid rgba(0, 255, 128, 0.3)" // soft white border
    }}
  />
</Box>


            {/* Buttons at Bottom */}
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
              <CustomButton label="Bring It On-Chain" onClick={handleExplore} />
              <CustomButton label="Explore High-Yield Assets" onClick={handleAction} />
            </Box>
          </Grid>
        </CameraBackground>
      </Container>
    </Box>
  );
};

export default WhatWeDo;
