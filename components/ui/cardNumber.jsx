import React from "react";
import { Box, Typography, Zoom } from "@mui/material";

const CardNumber = ({ title, subtitle, clase = "" }) => {
  return (
    <Zoom in style={{ transitionDelay: "300ms" }}>
      <Box
        className={`cardNumbers ${clase}`}
        sx={{ p: 1, mb: 2, mr: 2, pl: 2, minWidth: 120 }}
      >
        <Typography variant="h3" component="div">
          <b>{title}</b>
        </Typography>
        <Typography variant="button" component="div">
          {subtitle}
        </Typography>
      </Box>
    </Zoom>
  );
};

export default CardNumber;
