import { useState } from "react";

import { useForm, Controller } from "react-hook-form";
import NextLink from "next/link";
import Swal from "sweetalert2";
import moment from "moment";
import InputAdornment from "@mui/material/InputAdornment";

import { MobileDatePicker } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import { LoadingButton } from "@mui/lab";
import {
  Link,
  Box,
  Zoom,
  Button,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Avatar,
} from "@mui/material";
import { SaveOutlined, ArrowBackIos } from "@mui/icons-material";

import { CardHeader1 } from "../../components/ui";

const colorText = { color: "#294595" };

const PlanForm = ({ onSubmit, isSaving = false, pack, guides = {} }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      name: pack?.name,
      kind: pack?.kind,
      price: pack?.price,
      packId: pack?._id,
      maxLimit: pack?.maxLimit,
    },
  });
  const [timeVal, setTimeVal] = useState(new Date());

  const handleChangeTime = (newValue) => {
    setTimeVal(newValue);
    setValue("departureTime", moment(newValue).format("HH:mm"));
  };

  const handleChangeGuide = async (e) => {
    try {
      const { name, value } = e.target;
      setValue("guideId", value);
    } catch (err) {
      ToastErrorServer(err);
    } finally {
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {pack?._id && (
        <Grid container spacing={2}>
          {/* Data */}
          <Grid item xs={12} sm={12}>
            <Zoom in style={{ transitionDelay: "500ms" }}>
              <Box
                className="card-style01"
                display="flex"
                justifyContent="end"
                sx={{ mb: 1 }}
              >
                <NextLink passHref href={`/pack/list`}>
                  <Link>
                    <Button
                      color="secondary"
                      className="circular-btn"
                      startIcon={<ArrowBackIos />}
                      sx={{ width: "150px" }}
                      type="button"
                    >
                      Volver átras
                    </Button>
                  </Link>
                </NextLink>

                <LoadingButton
                  loading={isSaving}
                  color="secondary"
                  startIcon={<SaveOutlined />}
                  sx={{ width: "100px" }}
                  type="submit"
                  disabled={isSaving}
                >
                  Guardar
                </LoadingButton>
              </Box>
            </Zoom>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Zoom in style={{ transitionDelay: "500ms" }}>
              <Box className="card">
                <CardHeader1
                  title={
                    <>
                      <p>{pack?.name}</p>
                    </>
                  }
                />

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <FormGroup>
                      <FormLabel>
                        <Typography
                          variant="button"
                          display="block"
                          sx={{ ...colorText }}
                          gutterBottom
                        >
                          Fecha
                        </Typography>
                      </FormLabel>

                      <Controller
                        control={control}
                        name="departureDate"
                        rules={{ required: true }} //optional
                        render={({
                          field: { onChange, name, value },
                          fieldState: { invalid, isDirty }, //optional
                        }) => (
                          <>
                            <MobileDatePicker
                              value={getValues("departureDate")}
                              inputFormat="MM/dd/yyyy"
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                              onChange={(valos) => {
                                handleChange;
                                setValue(
                                  "departureDate",
                                  moment(valos).format("MM/DD/YYYY")
                                );
                              }}
                              onAccept={(valos) => {
                                setValue(
                                  "departureDate",
                                  moment(valos).format("MM/DD/YYYY")
                                );
                              }}
                            />
                          </>
                        )}
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormLabel>
                      <Typography
                        variant="button"
                        display="block"
                        sx={{ ...colorText }}
                        gutterBottom
                      >
                        Hora de salida
                      </Typography>
                    </FormLabel>
                    <TimePicker
                      label="Time"
                      value={timeVal}
                      onChange={handleChangeTime}
                      fullWidth
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormLabel>
                      <Typography
                        variant="button"
                        display="block"
                        sx={{ ...colorText }}
                        startAdornment={
                          <InputAdornment position="start">$</InputAdornment>
                        }
                        gutterBottom
                      >
                        Precio
                      </Typography>
                    </FormLabel>
                    <TextField
                      variant="filled"
                      fullWidth
                      sx={{ mb: 1 }}
                      {...register("price")}
                      error={!!errors.price}
                      helperText={errors.price?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <FormLabel>
                      <Typography
                        variant="button"
                        display="block"
                        sx={{ ...colorText }}
                        gutterBottom
                      >
                        Limite Máximo
                      </Typography>
                    </FormLabel>
                    <TextField
                      variant="filled"
                      fullWidth
                      type="number"
                      sx={{ mb: 1 }}
                      {...register("maxLimit")}
                      error={!!errors.maxLimit}
                      helperText={errors.maxLimit?.message}
                    />
                  </Grid>

                  {pack && guides && (
                    <Grid item xs={12} md={6}>
                      <b>Tour Guide</b>
                      <Select
                        id="tourguide"
                        label="tourguide"
                        name="tourguide"
                        onChange={handleChangeGuide}
                        fullWidth
                      >
                        {guides?.map((item) => (
                          <MenuItem value={item._id}>
                            {item.firstname} / {item.login}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Zoom>
          </Grid>
        </Grid>
      )}
    </form>
  );
};

export default PlanForm;
