import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Grid, Link, Zoom } from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box1 from "../../pages/helps/box1";

import Card from "./card";

export default function SimpleAccordion({
  matrix,
  title = "",
  open,
  active,
  subtitle = "",
  setSetting,
}) {
  const [status, setStatus] = React.useState(false);

  const change = (x, expanded) => {
    setStatus(expanded);
  };

  const clicki = () => {
    setStatus(!status);
  };

  React.useEffect(() => {
    setStatus(open);
  }, [open]);

  return (
    matrix?.length > 0 && (
      <Zoom in style={{ transitionDelay: "300ms" }}>
        <Link onClick={() => clicki()}>
          <Accordion
            onChange={change}
            expanded={status}
            onClick={clicki}
            sx={{ backgroundColor: "#ccdbe166", p: 1, mb: 2 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h5">{subtitle}</Typography>
              {"  "}&nbsp;&nbsp;
              <Typography
                variant="h5"
                sx={{
                  background: "hsl(240deg 100% 96%)",
                  pl: 1,
                  pr: 1,
                  borderRadius: 3,
                  fontWeight: "bold",
                }}
              >
                {title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {matrix.map((item_, index) => {
                  return (
                    <Grid key={index} item xs={12} sm={4}>
                      <Card
                        data={item_}
                        imagenUrl={item_?.imageUrl || null}
                        title={item_.title}
                        code={item_.code}
                        setSetting={setSetting}
                        active={active}
                        name={item_.name}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </AccordionDetails>
          </Accordion>
          <hr />
        </Link>
      </Zoom>
    )
  );
}
