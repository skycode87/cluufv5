import { useState } from "react";

import { useForm } from "react-hook-form";
import NextLink from "next/link";
import Swal from "sweetalert2";
import moment from "moment";

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

const PlanForm = ({ onSubmit, isSaving = false, apx }) => {
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
      firstname: apx?.userId?.firstname,
      lastname: apx?.userId?.lastname,
      phone: apx?.userId?.phone,
      email: apx?.userId?.email,
      document: apx?.userId?.document,
      documentType: apx?.userId?.documentType,
      insitu: apx?.insitu,
      status: apx?.status,
      paymentMode: apx?.paymentMode,
      isPayment: apx?.isPayment,
      _id: apx?._id,
      amount: apx?.amount,
      observation: apx?.observation,
      userId: apx?.userId?._id,
    },
  });

  const handleChange = ({ target }) => {
    const { value, name } = target;
    if (name === "insitu") setValue("insitu", value);
    if (name === "status") setValue("status", value);
    if (name === "isPayment") setValue("isPayment", value);
    if (name === "paymentMode") setValue("paymentMode", value);
    if (name === "amount") setValue("amount", value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {apx && (
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
                <NextLink passHref href={`/appsByPlan/${apx?.planId?._id}`}>
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
                      <p>
                        {apx?.code} / {apx?.packId?.name} /{" "}
                        {apx?.planId?.departureDate} /{" "}
                        {apx?.planId?.departureTime}
                      </p>{" "}
                    </>
                  }
                />

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={2}>
                    <FormLabel>
                      <Typography
                        variant="button"
                        display="block"
                        sx={{ ...colorText }}
                        gutterBottom
                      >
                        Nombre
                      </Typography>
                    </FormLabel>
                    <TextField
                      variant="filled"
                      fullWidth
                      sx={{ mb: 1 }}
                      {...register("firstname")}
                      error={!!errors.firstname}
                      helperText={errors.firstname?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <FormLabel>
                      <Typography
                        variant="button"
                        display="block"
                        sx={{ ...colorText }}
                        gutterBottom
                      >
                        Apellido
                      </Typography>
                    </FormLabel>
                    <TextField
                      variant="filled"
                      fullWidth
                      sx={{ mb: 1 }}
                      {...register("lastname")}
                      error={!!errors.lastname}
                      helperText={errors.lastname?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={2}>
                    <FormLabel>
                      <Typography
                        variant="button"
                        display="block"
                        sx={{ ...colorText }}
                        gutterBottom
                      >
                        Teléfono
                      </Typography>
                    </FormLabel>
                    <TextField
                      variant="filled"
                      fullWidth
                      sx={{ mb: 1 }}
                      {...register("phone")}
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={2}>
                    <FormControl fullWidth>
                      <FormLabel>
                        <Typography
                          variant="button"
                          display="block"
                          sx={{ ...colorText }}
                          gutterBottom
                        >
                          Estatus
                        </Typography>
                      </FormLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="status"
                        label="status"
                        onChange={handleChange}
                        defaultValue={apx?.status}
                        name="status"
                      >
                        <MenuItem value="open">Abierta</MenuItem>
                        <MenuItem value="close">Cerrada</MenuItem>
                        <MenuItem value="cancel">Anulada</MenuItem>
                        <MenuItem value="inwait">En Espera</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <FormControl fullWidth>
                      <FormLabel>
                        <Typography
                          variant="button"
                          display="block"
                          sx={{ ...colorText }}
                          gutterBottom
                        >
                          Asistencía
                        </Typography>
                      </FormLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="insitu"
                        label="insitu"
                        onChange={handleChange}
                        defaultValue={apx?.insitu}
                        name="insitu"
                      >
                        <MenuItem value="true">Si</MenuItem>
                        <MenuItem value="false">No</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <FormLabel>
                      <Typography
                        variant="button"
                        display="block"
                        sx={{ ...colorText }}
                        gutterBottom
                      >
                        Email
                      </Typography>
                    </FormLabel>
                    <TextField
                      variant="filled"
                      fullWidth
                      sx={{ mb: 1 }}
                      {...register("email")}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={2}>
                    <FormLabel>
                      <Typography
                        variant="button"
                        display="block"
                        sx={{ ...colorText }}
                        gutterBottom
                      >
                        Tipo Documento
                      </Typography>
                    </FormLabel>
                    <TextField
                      variant="filled"
                      fullWidth
                      sx={{ mb: 1 }}
                      {...register("documentType")}
                      error={!!errors.documentType}
                      helperText={errors.documentType?.message}
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
                        Documento
                      </Typography>
                    </FormLabel>
                    <TextField
                      variant="filled"
                      fullWidth
                      sx={{ mb: 1 }}
                      {...register("document")}
                      error={!!errors.document}
                      helperText={errors.document?.message}
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
                        Monto pagado
                      </Typography>
                    </FormLabel>
                    <TextField
                      variant="filled"
                      fullWidth
                      sx={{ mb: 1 }}
                      {...register("amount")}
                      error={!!errors.amount}
                      helperText={errors.amount?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={2}>
                    <FormControl fullWidth>
                      <FormLabel>
                        <Typography
                          variant="button"
                          display="block"
                          sx={{ ...colorText }}
                          gutterBottom
                        >
                          Pago?
                        </Typography>
                      </FormLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="isPayment"
                        label="isPayment"
                        onChange={handleChange}
                        defaultValue={apx?.isPayment}
                        name="isPayment"
                      >
                        <MenuItem value="true">Si</MenuItem>
                        <MenuItem value="false">No</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={2}>
                    <FormControl fullWidth>
                      <FormLabel>
                        <Typography
                          variant="button"
                          display="block"
                          sx={{ ...colorText }}
                          gutterBottom
                        >
                          Método de Pago
                        </Typography>
                      </FormLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="paymentMode"
                        label="paymentMode"
                        onChange={handleChange}
                        defaultValue={apx?.paymentMode}
                        name="paymentMode"
                      >
                        <MenuItem value="none">Ninguno</MenuItem>
                        <MenuItem value="card">Tarjeta</MenuItem>
                        <MenuItem value="cash">Efectivo</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <FormLabel>
                      <Typography
                        variant="button"
                        display="block"
                        sx={{ ...colorText }}
                        gutterBottom
                      >
                        Observación
                      </Typography>
                    </FormLabel>
                    <TextField
                      variant="filled"
                      fullWidth
                      sx={{ mb: 1 }}
                      {...register("observation")}
                      error={!!errors.observation}
                      helperText={errors.observation?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <small>
                      Registrado el {moment(apx?.date).format("LLL")}
                    </small>
                  </Grid>
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
