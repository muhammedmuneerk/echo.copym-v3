import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import { KeyboardArrowDown } from "@mui/icons-material";
import GradientLetters from "./GradientLetters";
import CustomButton from "./CustomButton";
import { useNavigate } from "react-router-dom";
import KeywordFlag from "./KeywordFlag";

export default function Hero() {
  const navigate = useNavigate();

  const handleExplore = () => navigate("/tokenization");
  const handleAction = () => navigate("/marketplace");

  return (
    <Box
      className="min-h-screen relative overflow-hidden"
      sx={{
        position: "relative",
        backgroundImage: `
          radial-gradient(ellipse at center, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.75) 100%),
          url('/assets/sections/bg-hero-section-1.png')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-black/20">
        <Container
          maxWidth="xl"
          className="relative z-20 px-4 sm:px-6 md:px-8"
        >
          <motion.div
            className="flex flex-col items-center justify-center min-h-screen text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full mt-20 mr-40"
            >
              {/* Keyword Flags – Hidden on mobile (xs) */}
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100vh",
                  display: { xs: "none", sm: "block" },
                }}
              >
                <KeywordFlag text="Innovation" top="68%" left="89%" direction="left" />
                <KeywordFlag text="Security" top="40%" left="65%" direction="right" />
                <KeywordFlag text="Trust" top="35%" left="25%" direction="top" />
                <KeywordFlag text="Accessibility" top="65%" left="25%" direction="top" />
                <KeywordFlag text="Transparency" top="30%" left="90%" direction="bottom" />
              </Box>

              {/* Logo – Hidden on mobile (xs) */}
              <Box
                sx={{
                  position: "absolute",
                  top: "18.8%",
                  left: "35.8%",
                  zIndex: 10,
                  perspective: "1000px",
                  display: { xs: "none", sm: "block" },
                }}
              >
                <Box
                  sx={{
                    transform: "rotateX(28deg) rotateY(-39deg)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <img
                    src="/copym/png/Copym-05.png"
                    alt="Copym Logo"
                    style={{ height: 319, width: "auto" }}
                  />
                </Box>
              </Box>
            </motion.div>
          </motion.div>

          {/* Discover More CTA */}
          <motion.div
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
            style={{ zIndex: 20 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Typography
              variant="button"
              className="text-white flex flex-col items-center cursor-pointer text-sm sm:text-base"
              onClick={() => {
                const target = document.getElementById("main-content");
                if (target) {
                  target.scrollIntoView({ behavior: "smooth" });
                } else {
                  window.scrollTo({
                    top: window.innerHeight * 1.1,
                    behavior: "smooth",
                  });
                }
              }}
            >
              Discover More
              <KeyboardArrowDown className="mt-1 sm:mt-2" />
            </Typography>
          </motion.div>

        </Container>
      </div>
    </Box>
  );
}
