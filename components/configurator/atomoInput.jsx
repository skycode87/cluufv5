/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { MobileDatePicker } from "@mui/x-date-pickers";

import { Grid, Link, Zoom, Button, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import moment from "moment";

export default function SimpleAccordion({
  selecciones,
  open,
  primary,
  selected,
  setSelected,
  defaultValues,
  handleChange,
}) {
  const [status, setStatus] = React.useState(false);
  const [data, setData] = React.useState(selected);
  const [valuex, setValuex] = React.useState("");

  const change = (x, expanded) => {
    setStatus(expanded);
  };

  const clicki = () => {
    // setStatus(!status);
  };

  const handleChange1 = (e) => {
    const valorTexto = valuex;

    if (valorTexto) {
      selecciones.push({ ...data, value: valorTexto });
      handleChange({ ...data, value: valorTexto });
      if (e.next !== "end") {
        setSelected(defaultValues[e.next]);
      }
    }
  };

  const handleChange2 = (e) => {
    setValuex(e.target.value);
  };

  React.useEffect(() => {
    setStatus(open);
  }, [open]);

  React.useEffect(() => {
    setData(selected);
  }, [selected]);

  const defaultVal = () => {
    let val = "";
    primary.forEach((item) => {
      if (item.code === selected.code && selected.type === "input") {
        val = item.value;
      }
    });
    setValuex(val);
    return val;
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
                  <Grid key={index} item xs={12} sm={12}>
                    <TextField
                      variant="filled"
                      fullWidth
                      sx={{ mb: 1 }}
                      name={selected.code}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={valuex}
                      defaultValue={defaultVal}
                      onChange={handleChange2}
                    />
                    <hr />
                    <Button
                      sx={{
                        minHeight: "70px",
                        width: "100%",
                        fontSize: "1.1rem",
                        fontWeight: "600",
                      }}
                      onClick={() => {
                        handleChange1(item);
                      }}
                    >
                      Continuar
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
