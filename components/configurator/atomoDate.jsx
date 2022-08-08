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

  const change = (x, expanded) => {
    setStatus(expanded);
  };

  const clicki = () => {
    // setStatus(!status);
  };

  const defaultVal = () => {
    let val = "";
    primary.forEach((item) => {
      if (item.code === selected.code && selected.type === "inputDate") {
        console.log(item.code, selected.code, item.value);
        val = item.value;
      }
    });

    return val;
  };

  const handleChange1 = (e) => {
    const date_ = getValues(selected.code);

    if (date_) {
      selecciones.push({ ...e, value: date_ });
      handleChange({ ...e, value: date_ });
      if (e.next !== "end") {
        setSelected(defaultValues[e.next]);
      }
    }
  };

  React.useEffect(() => {
    setStatus(open);
  }, [open]);

  React.useEffect(() => {
    setData(selected);
  }, [selected]);

  const {
    register,
    control,
    handleSubmit,
    formState: {},
    getValues,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      [selected.code]: defaultVal(),
    },
  });

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
                    <Controller
                      control={control}
                      name={selected.code}
                      rules={{ required: true }} //optional
                      render={({
                        field: { onChange, name, value },
                        fieldState: { invalid, isDirty }, //optional
                        formState: { errors }, //optional, but necessary if you want to show an error message
                      }) => (
                        <>
                          <MobileDatePicker
                            value={getValues(selected.code)}
                            inputFormat="MM/dd/yyyy"
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                sx={{
                                  width: "100%",
                                  background: "#fff",
                                  fontSize: "42px",
                                }}
                              />
                            )}
                            onChange={(valos) => {
                              handleChange;
                              setValue(
                                selected.code,
                                moment(valos).format("MM/DD/YYYY")
                              );
                            }}
                            onAccept={(valos) => {
                              setValue(
                                selected.code,
                                moment(valos).format("MM/DD/YYYY")
                              );
                            }}
                          />
                          {errors &&
                            errors[name] &&
                            errors[name].type === "required" && (
                              //if you want to show an error message
                              <span>your error message !</span>
                            )}
                        </>
                      )}
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
