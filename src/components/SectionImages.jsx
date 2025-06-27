import { Box } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * SectionImage – Displays an image that comes alive with scroll-triggered and hover-triggered
 * animations powered by Framer-motion.  The component is generic and can be dropped into any
 * section to achieve an advanced parallax-style reveal.
 *
 * 1. Fade + slide-in when the component enters the viewport
 * 2. Slight parallax translation tied to page scroll
 * 3. Subtle hover scale for interactivity
 */

const SectionImage = ({ src, alt = "" }) => {
  //  --- scroll-based parallax ---
  const { scrollY } = useScroll();
  // Move image ±30px over total viewport height
  const y = useTransform(scrollY, [0, window.innerHeight], [0, -30]);

  return (
    <Box className="w-full py-8 overflow-visible">
      <Box className="flex justify-center">
        <motion.img
          loading="lazy"
          src={src}
          alt={alt}
          style={{ y }}
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ type: "spring", stiffness: 90, damping: 20 }}
          whileHover={{ scale: 1.04 }}
          className="w-[90%] max-w-xl will-change-transform"
        />
      </Box>
    </Box>
  );
};

export default SectionImage;
