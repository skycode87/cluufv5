import { useForm } from "react-hook-form";
import NextLink from "next/link";

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

const colorText = { color: "#294595" };

const WebForm = ({ onSubmit, isSaving = false, plans, packId, pack }) => {
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
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      document: "",
      documentType: "",
      insitu: false,
      status: "open",
      paymentMode: "none",
      isPayment: false,
      packId,
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
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <b>Planes</b>
                  <Select
                    id="planId"
                    label="planId"
                    name="planId"
                    sx={{ p: 1, fontSize: 16, height: "70px" }}
                    // onChange={handleChangeGuide}
                    fullWidth
                  >
                    {plans?.map((item) => (
                      <MenuItem value={item._id}>
                        {item.packId.name} &nbsp;&nbsp;{" "}
                        <b>
                          {item.departureDate} &nbsp;&nbsp;&nbsp;{" "}
                          {item.departureTime}
                        </b>
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>

                <Grid item xs={12} sm={3}>
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
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={6}>
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
              </Grid>

              {pack && !pack?.isFree && (
                <Grid container spacing={2}>
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
                        defaultValue="false"
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
                        defaultValue="none"
                        name="paymentMode"
                      >
                        <MenuItem value="none">Ninguno</MenuItem>
                        <MenuItem value="card">Tarjeta</MenuItem>
                        <MenuItem value="cash">Efectivo</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={3}>
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
                        defaultValue="open"
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
                        defaultValue="true"
                        name="insitu"
                      >
                        <MenuItem value="true">Si</MenuItem>
                        <MenuItem value="false">No</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              )}
            </Box>
          </Zoom>
        </Grid>
      </Grid>
    </form>
  );
};

export default WebForm;
