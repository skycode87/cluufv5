import { Typography } from "@mui/material";
import { ToggleOn, ToggleOff } from "@mui/icons-material";
export const statusFormat = (value) => {
  if (value === "open")
    return (
      <Typography sx={{ color: "green", fontWeight: "bold" }}>
        Abierta
      </Typography>
    );
  if (value === "close")
    return (
      <Typography sx={{ color: "red", fontWeight: "bold" }}>Cerrada</Typography>
    );
  if (value === "inwait")
    return (
      <Typography sx={{ color: "orange", fontWeight: "bold" }}>
        En espera
      </Typography>
    );
  if (value === "cancel")
    return (
      <Typography sx={{ color: "gray", fontWeight: "bold" }}>
        Anulada
      </Typography>
    );
};

export const statusIconFormat = (value) => {
  if (value === "open")
    return <ToggleOn sx={{ color: "green", fontWeight: "bold" }} />;
  if (value === "close")
    return <ToggleOff sx={{ color: "red", fontWeight: "bold" }} />;
  if (value === "inwait")
    return <ToggleOff sx={{ color: "orange", fontWeight: "bold" }} />;
  if (value === "cancel")
    return <ToggleOff sx={{ color: "gray", fontWeight: "bold" }} />;
};

<ToggleOn />;

export const insituFormat = (value) => {
  if (value === true)
    return (
      <Typography sx={{ color: "green", fontWeight: "bold" }}>SI</Typography>
    );
  if (value === false)
    return (
      <Typography sx={{ color: "red", fontWeight: "bold" }}>NO</Typography>
    );
};

export const statusFormatOnlyText = (value) => {
  if (value === "open") return "Abierta";
  if (value === "close") return "Cerrada";
  if (value === "inwait") return "En espera";
  if (value === "cancel") return "Anulada";
};

export const insituFormatOnlyText = (value) => {
  if (value === true) return "SI";
  if (value === false) return "NO";
};

export const moneyFormat = (text) =>
  `$ ${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
