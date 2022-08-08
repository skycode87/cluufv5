import * as React from "react";

import { Box, Typography, TextField } from "@mui/material";

export default function NumberSelector({
  defaultValue = 1000,
  setSetting,
  title,
  suffix,
  min = 0,
  max = 1000,
}) {
  const [values, setValues] = React.useState(defaultValue);

  const handleChange = (prop) => {
    setValues(prop.target.value);
    setSetting({ code: prop.target.value });
  };

  return (
    <Box sx={{ width: "100%", pb: 3, pt: 3 }}>
      <Typography variant="h5">
        {title}: {values} {suffix}
      </Typography>
      <TextField
        onChange={handleChange}
        id="outlined-basic"
        variant="outlined"
        sx={{ fontSize: "32px" }}
      />
    </Box>
  );
}
