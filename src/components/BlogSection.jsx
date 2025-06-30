import React, { useRef } from 'react';
import { Container, Typography, Grid, Box, Button } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowForward } from '@mui/icons-material';
import AnimatedCard from '../ui/AnimatedCard';
import GradientLetters from './GradientLetters';

// Dummy blog data – replace with real data or CMS integration later
const blogs = [
  {
    title: 'Tokenization Trends in 2024',
    date: 'Mar 21, 2024',
    excerpt: 'Discover how asset tokenization is reshaping traditional finance and what the future holds for cross-chain markets.',
    image: '/assets/images/blog-1.png',
  },
  {
    title: 'Green Finance & Carbon Credits',
    date: 'Feb 14, 2024',
    excerpt: 'A deep dive into sustainable investing, carbon credit markets, and how blockchain brings transparency to ESG assets.',
    image: '/assets/images/blog-2.png',
  },
  {
    title: 'Democratising Private Equity',
    date: 'Jan 07, 2024',
    excerpt: 'Fractional ownership lowers the barrier to entry for private equity. Explore the mechanisms and opportunities.',
    image: '/assets/images/blog-3.png',
  },
];

// 3D Camera-Based Background Component for Blog Section
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

/**
 * BlogSection – displays a grid of the latest blog posts / insights
 */
const BlogSection = () => {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <CameraBackground>
        <Grid container spacing={2.5} justifyContent="center" 
                sx={{
                backgroundImage: 'url(/assets/sections/bg-blog-section.png)',
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
      {/* Section heading */}
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ fontWeight: 700, mb: 6, display: 'inline-block' }}
        className='flex flex-wrap justify-center'
      >
        <GradientLetters text="Latest Insights" keyPrefix="blog-heading" />
      </Typography>

      {/* Blog cards grid */}
      <Grid container spacing={{ xs: 4, md: 6 }}>
        {blogs.map((blog, idx) => (
          <Grid item xs={12} md={4} key={blog.title}>
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <AnimatedCard className="flex flex-col h-full">
                {/* Image */}
                <Box
                  component="img"
                  src={blog.image}
                  alt={blog.title}
                  sx={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: '1.5rem', mb: 2 }}
                />

                {/* Card content */}
                <Box display="flex" flexDirection="column" flexGrow={1}>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                    {blog.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {blog.date}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 3, flexGrow: 1 }}>
                    {blog.excerpt}
                  </Typography>

                  {/* Read more button */}
                  <Button
                    endIcon={<ArrowForward fontSize="small" />}
                    className="btn-primary mt-auto"
                    size="small"
                  >
                    Read More
                  </Button>
                </Box>
              </AnimatedCard>
            </motion.div>
          </Grid>
        ))}
      </Grid>
      </Grid>
      </CameraBackground>
    </Container>
  );
};

export default BlogSection; 