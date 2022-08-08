/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Grid, Link, Zoom, Button } from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function SimpleAccordion({
  selecciones,
  open,
  primary,
  selected,
  setSelected,
  defaultValues,
  onSubmitForm,
  handleChange,
}) {
  const [status, setStatus] = React.useState(false);
  const [data, setData] = React.useState(selected);

  const change = (x, expanded) => {
    setStatus(expanded);
  };

  const clicki = () => {
    // setStatus(!status);
  };

  const handleChange1 = (e) => {
    selecciones.push({ ...e, value: String(e.code).split("-")[1] });
    handleChange({ ...e, value: String(e.code).split("-")[1] });

    if (e.next === "submit") {
      onSubmitForm();
    } else if (e.next !== "end") {
      setSelected(defaultValues[e.next]);
    }
  };

  React.useEffect(() => {
    setStatus(open);
  }, [open]);

  React.useEffect(() => {
    setData(selected);
  }, [selected]);

  const isActiveStyle = (data) => {
    const found2 = primary.filter((element) => {
      return String(element.code).indexOf(String(data.code).split("-")[0]) >= 0;
    });

    if (
      found2 !== undefined &&
      found2.length > 0 &&
      found2[0].title === data.title
    ) {
      return { border: "5px solid #00d0e2" };
    } else {
      return { border: "1px solid gray" };
    }
  };

  return (
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
            {"  "}&nbsp;&nbsp;
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              sx={{
                background: "hsl(240deg 100% 96%)",
                pl: 1,
                pr: 1,
                borderRadius: 3,
                fontWeight: "bold",
              }}
            >
              {data.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {data.options.map((item, index) => {
                return (
                  <Grid key={index} item xs={12} sm={4}>
                    <Button
                      style={isActiveStyle(item)}
                      sx={{
                        minHeight: "70px",
                        width: "100%",
                        fontSize: "1.1rem",
                        fontWeight: "600",
                      }}
                      onClick={() => {
                        handleChange1(item);
                      }}
                      disabled={item.disabled ? true : false}
                    >
                      {data.type === "text" ? (
                        <small>{item.title}</small>
                      ) : (
                        <img
                          src={item.image}
                          style={{ width: "60px", height: "60px" }}
                        />
                      )}
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Link>
    </Zoom>
  );
}
