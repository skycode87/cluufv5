import { FC, useState } from "react";

import { useForm, Controller } from "react-hook-form";
import NextLink from "next/link";
import Swal from "sweetalert2";

import { LoadingButton } from "@mui/lab";
import {
  Link,
  Box,
  Zoom,
  Button,
  capitalize,
  Checkbox,
  Divider,
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
import {
  SaveOutlined,
  ArrowBackIos,
  DeleteForever,
  Person,
} from "@mui/icons-material";
import { MobileDatePicker } from "@mui/x-date-pickers";

//import ClienteAutocomplete from "./clientAutocomplete";

import moment from "moment";

const validSoftware = [
  "Via-Control",
  "TopSolid V7",
  "TopSolid V6",
  "Especial",
  "CNC·Creator",
  "ARDIS Stock",
  "ARDIS Optimizer",
  "3CAD",
];
const validStatus = [true, false];

import { green } from "@mui/material/colors";
import { CardHeader1 } from "../../components/ui";

const colorText = { color: "#294595" };

const PlanForm = ({ onSubmit, isSaving = false, plan, owners }) => {
  const [newTagValue, setNewTagValue] = useState("");
  const [clientAutocomplete, setClientAutocomplete] = useState([]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm({
    defaultValues: plan,
  });

  const handleChange = ({ target }) => {
    const { value, name } = target;
    console.log(target);
  };

  const onDelete = () => {
    const { code } = getValues();

    Swal.fire({
      title: "Deseas confirmar la eliminación?",
      text: `Codigo #${code}`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Si, deseo eliminarlo",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // setValue('isDelete',true);
        handleSubmit(onSubmit)();
      } else if (result.isDenied) {
      }
    });
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
              <NextLink passHref href={`/plan/list`}>
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
                title={plan?.name}
                avatar={
                  <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                    <Person />
                  </Avatar>
                }
              />
              <p>
                <b>Aplicaciones:</b> {plan?.totalApps}
                <br />
                <b>Paquete:</b> {plan?.packId?.name}
                <br />
                <b>Fecha:</b> {plan?.departureDate}
                <br />
                <b>Hora:</b> {plan?.departureTime}
                <br />
                <b>Serial:</b>
                {plan?.serial}
                <br />
                <b>Precio:</b>
                {plan?.price}
                <br />
              </p>
            </Box>
          </Zoom>
        </Grid>
      </Grid>
    </form>
  );
};

export default PlanForm;
