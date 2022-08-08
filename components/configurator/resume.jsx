import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { green, pink } from "@mui/material/colors";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Zoom from "@mui/material/Zoom";

import Link from "@mui/material/Link";

export default function Resume({ setting, openSection }) {
  const {
    program,
    color,
    extension,
    tipoCajon,
    tipoConstruccion,
    fijacion,
    tipoBloqueo,
    sincronizacion,
    capacidadCargaLargo,
    varianteMontaje,
    tecnologiaMovimiento,
    tipoAcoplamiento,
  } = setting;
  return (
    <>
      {setting.program?.code && (
        <Zoom in style={{ transitionDelay: "300ms" }}>
          <List
            className="resumeCard"
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <Typography variant="h6" gutterBottom component="div">
              Selección de productos
            </Typography>
            {program?.code && (
              <Link
                onClick={() => {
                  openSection({ program: true });
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar variant="square" src={program.imageUrl} />
                  </ListItemAvatar>
                  <ListItemText primary={program.title} secondary="Programa" />
                </ListItem>
              </Link>
            )}

            {extension?.code && (
              <Link
                onClick={() => {
                  openSection({ extension: true });
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar variant="square" src={extension.imageUrl} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={extension.title}
                    secondary="Extensión"
                  />
                </ListItem>
              </Link>
            )}

            {color?.code && (
              <Link
                onClick={() => {
                  openSection({ color: true });
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar variant="square" src={color.imageUrl} />
                  </ListItemAvatar>
                  <ListItemText primary={color.title} secondary="Color" />
                </ListItem>
              </Link>
            )}
          </List>
        </Zoom>
      )}

      {setting.tipoCajon?.code && (
        <Zoom in style={{ transitionDelay: "300ms" }}>
          <List
            className="resumeCard"
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <Typography variant="h6" gutterBottom component="div">
              Construcción
            </Typography>

            {tipoCajon?.code && (
              <Link
                onClick={() => {
                  openSection({ tipoCajon: true });
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar variant="square" src={tipoCajon.imageUrl} />
                  </ListItemAvatar>

                  <ListItemText
                    primary={tipoCajon.title}
                    secondary="Tipo de Cajón"
                  />
                </ListItem>
              </Link>
            )}

            {tipoConstruccion?.code && (
              <Link
                onClick={() => {
                  openSection({ tipoConstruccion: true });
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar variant="square" src={tipoConstruccion.imageUrl} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={tipoConstruccion.title}
                    secondary="Tipo construcción"
                  />
                </ListItem>
              </Link>
            )}

            {tipoBloqueo?.code && (
              <Link
                onClick={() => {
                  openSection({ tipoBloqueo: true });
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar variant="square" src={tipoBloqueo.imageUrl} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={tipoBloqueo.title}
                    secondary="Tipo Bloqueo"
                  />
                </ListItem>
              </Link>
            )}

            {sincronizacion?.code && (
              <Link
                onClick={() => {
                  openSection({ sincronizacion: true });
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: green[500] }}>
                      <AssignmentIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={sincronizacion.title}
                    secondary="Sincronización"
                  />
                </ListItem>
              </Link>
            )}

            {fijacion?.code && (
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: green[500] }}>
                    <AssignmentIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={fijacion.title}
                  secondary="Fijación de guía del cuerpo de mueble"
                />
              </ListItem>
            )}
          </List>
        </Zoom>
      )}

      {setting.capacidadCargaLargo?.code && (
        <Zoom in style={{ transitionDelay: "300ms" }}>
          <List
            className="resumeCard"
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <Typography variant="h6" gutterBottom component="div">
              Mediciones
            </Typography>

            {capacidadCargaLargo?.code && (
              <Link
                onClick={() => {
                  openSection({ capacidadCargaLargo: true });
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: green[500] }}>
                      <AssignmentIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={capacidadCargaLargo.title}
                    secondary="Capacidades:"
                  />
                </ListItem>
              </Link>
            )}

            {varianteMontaje?.code && (
              <Link
                onClick={() => {
                  openSection({ varianteMontaje: true });
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: green[500] }}>
                      <AssignmentIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={varianteMontaje.title}
                    secondary="Variante Montaje:"
                  />
                </ListItem>
              </Link>
            )}

            {tipoAcoplamiento?.code && (
              <Link
                onClick={() => {
                  openSection({ tipoAcoplamiento: true });
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: green[500] }}>
                      <AssignmentIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={tipoAcoplamiento.title}
                    secondary="Tipo de Acomplamiento:"
                  />
                </ListItem>
              </Link>
            )}

            {tecnologiaMovimiento?.code && (
              <Link
                onClick={() => {
                  openSection({ tecnologiaMovimiento: true });
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: green[500] }}>
                      <AssignmentIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={tecnologiaMovimiento.title}
                    secondary="Tecnología de movimiento:"
                  />
                </ListItem>
              </Link>
            )}
          </List>
        </Zoom>
      )}
    </>
  );
}
