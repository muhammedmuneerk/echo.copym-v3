import React from "react";
import { Box, Typography } from "@mui/material";

const KeywordFlag = ({
  text,
  top = "0%",
  left = "0%",
  fontSize = "0.9rem",
  color = "#ffffff",
  shadowColor = "rgba(0,0,0,0.5)",
}) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top,
        left,
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Dot */}
      <Box
        sx={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          marginRight: "6px",
          boxShadow: `0 0 4px ${shadowColor}`,
        }}
      />

      {/* Connecting Line */}
      <Box
        sx={{
          width: "40px",
          height: "2px",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          marginRight: "6px",
        }}
      />

      {/* Keyword box */}
      <Box
        sx={{
          minWidth: "100px",
          maxWidth: "150px",
          px: 2,
          py: 1,
          borderRadius: "8px",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          border: "1px solid rgba(13, 247, 137, 0.1)",
          boxShadow: `0 3px 10px ${shadowColor}`,
        }}
      >
        <Typography
          sx={{
            fontSize,
            fontWeight: 700,
            color: "rgba(94, 94, 94, 0.8)",
            textAlign: "center",
            textShadow: `1px 1px 3px ${shadowColor}`,
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

export default KeywordFlag;

