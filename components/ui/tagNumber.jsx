import React from "react";
import { Box, Typography, Zoom } from "@mui/material";

const TagNumber = ({ title = "", subtitle, backgroundColor = "#000" }) => {
  return (
    <Zoom in style={{ transitionDelay: "300ms" }}>
      <Box
        className={`cardNumbers`}
        sx={{ p: 1, mb: 2, mr: 2, pl: 2, minWidth: 120, backgroundColor }}
      >
        <Typography variant="button" component="div">
          <b>{title}</b> {subtitle}
        </Typography>
      </Box>
    </Zoom>
  );
};

export default TagNumber;
