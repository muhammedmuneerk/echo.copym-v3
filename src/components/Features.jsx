import { Container, Typography, Box, Grid, Button } from "@mui/material";
import { motion } from "framer-motion";
import { ArrowForward } from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import AnimatedCard from "../ui/AnimatedCard.jsx";
import GradientLetters from "./GradientLetters.jsx";
import { Globe, Fingerprint, Briefcase, Bot, Banknote, Percent } from "lucide-react";

// Updated features array with appropriate Lucide icons
const features = [
  {
    title: "Chain-Agnostic Tokenization",
    description:
      "Mint on any chain — Ethereum, Solana, Polygon, Optimism, Cardano, and more. No native token required.",
    icon: <Globe size={28} className="text-gray-400" />,
  },
  {
    title: "Smart Compliance & Identity",
    description:
      "DID-powered onboarding, SBT-based credentials, and pre-audited contracts with jurisdictional flexibility.",
    icon: <Fingerprint size={28} className="text-gray-400" />,
  },
  {
    title: "Built with Experts, Backed by Experience",
    description:
      "Curated by seasoned market professionals for unmatched access and returns.",
    icon: <Briefcase size={28} className="text-gray-400" />,
  },
  {
    title: "AI Portfolio Intelligence",
    description:
      "Let Copym's AI suggest diversified, high-yield portfolios tailored to your goals.",
    icon: <Bot size={28} className="text-gray-400" />,
  },
  {
    title: "Liquidity on Your Terms",
    description:
      "Trade anytime on our secondary market. No lock-in. Full control. Best-in-class real-world inventory.",
    icon: <Banknote size={28} className="text-gray-400" />,
  },
  {
    title: "Zero-Fee Experience",
    description:
      "No gas fees. No platform charges. Simple, transparent, and cost-free at every step.",
    icon: <Percent size={28} className="text-gray-400" />,
  },
];

export default function Features() {
  const [screenSize, setScreenSize] = useState("lg");

  // Check screen size on mount and window resize
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 1024) {
        setScreenSize("lg");
      } else if (window.innerWidth >= 768) {
        setScreenSize("md");
      } else {
        setScreenSize("sm");
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return (
    <Box
      className="py-24 relative overflow-hidden"
      
    >
      <Container maxWidth="xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          
        >
          <Typography
            variant="overline"
            className="gradient-letter"
          >
            ALL-IN-ONE PLATFORM
          </Typography>
          <Typography
            variant="h2"
            className="text-3xl sm:text-4xl md:text-5xl mb-4 pb-1 text-center"
          >
            <Box
              component="div"
              className="flex flex-col items-center justify-center leading-snug max-w-xs sm:max-w-xl lg:max-w-5xl mx-auto"
            >
              {/* Small & Medium Screens (2 lines) */}
              <Box className="block lg:hidden">
                <Box component="div" className="flex justify-center">
                  <GradientLetters text="Everything You Need" keyPrefix="sm-line1" />
                </Box>
                <Box component="div" className="flex justify-center">
                  <GradientLetters text="In One Place" keyPrefix="sm-line2" />
                </Box>
              </Box>

              {/* Large Screens (2 lines) */}
              <Box className="hidden lg:block">
                <Box component="div" className="flex justify-center">
                  <GradientLetters text="Everything You Need" keyPrefix="lg-line1" />
                </Box>
                <Box component="div" className="flex justify-center">
                  <GradientLetters text="In One Place" keyPrefix="lg-line2" />
                </Box>
              </Box>
            </Box>
          </Typography>

          <Typography
            variant="body1"
            className=" max-w-2xl mx-auto"
          >
            No more juggling multiple services or platforms. Copym provides
            end-to-end solutions for the entire tokenization lifecycle.
          </Typography>
        </motion.div>

        {/* Card grid */}
        <Grid container spacing={2.5} justifyContent="center" 
        sx={{
        backgroundImage: 'url(/assets/sections/bg-features-section.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '2rem 1rem',
        marginTop: '-2rem',
        paddingBottom: '4rem',
        marginLeft: '-10px',
        borderRadius: '2.5rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        border: '5px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
      }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={feature.title} sx={{ display: 'flex', justifyContent: 'center',  }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="h-full bg-white/5 rounded-2xl -ml-6"
              >
                <AnimatedCard style={{ perspective: "1000px" }}>
                  
                  {/* Wrap content in a div for 3D effect */}
                  <div className="card-content">
                    <Box
                      className="w-12 h-12 rounded-2xl mb-4 flex items-center justify-center text-2xl card-icon"
                      sx={{
                        background: "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(5px)",
                        boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.05)",
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" className="mb-3">
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-text-secondary mb-4"
                    >
                      {feature.description}
                    </Typography>
                    <Button
                      endIcon={<ArrowForward />}
                      className="text-primary hover:bg-primary/5 px-0 pb-0 mb-0"
                    >
                      Learn more
                    </Button>
                  </div>
                </AnimatedCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}