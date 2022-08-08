import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function BasicTable({ setting }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          <TableRow
            key={2}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Programa
            </TableCell>
            <TableCell align="right">{setting.program?.title}</TableCell>
          </TableRow>

          <TableRow
            key={2}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Tipo de extensión
            </TableCell>
            <TableCell align="right">{setting.extension?.title}</TableCell>
          </TableRow>

          {setting.color?.title && (
            <TableRow
              key={3}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Color
              </TableCell>
              <TableCell align="right">{setting.color?.title}</TableCell>
            </TableRow>
          )}

          <TableRow
            key={4}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Tipo de cajón/guía
            </TableCell>
            <TableCell align="right">{setting.tipoCajon?.title}</TableCell>
          </TableRow>

          <TableRow
            key={5}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Tipo de construcción
            </TableCell>
            <TableCell align="right">
              {setting.tipoConstruccion?.title}
            </TableCell>
          </TableRow>

          <TableRow
            key={6}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Carga dinámica / Largo nominal
            </TableCell>
            <TableCell align="right">
              {setting.capacidadCargaLargo?.title}
            </TableCell>
          </TableRow>

          <TableRow
            key={7}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Tecnología de movimiento
            </TableCell>
            <TableCell align="right">
              {setting.tecnologiaMovimiento?.title}
            </TableCell>
          </TableRow>

          <TableRow
            key={8}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Tipo de montaje
            </TableCell>
            <TableCell align="right">
              {setting.varianteMontaje?.title}
            </TableCell>
          </TableRow>

          {setting.tipoBloqueo?.title && (
            <TableRow
              key={9}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Tipo de bloque
              </TableCell>
              <TableCell align="right">{setting.tipoBloqueo?.title}</TableCell>
            </TableRow>
          )}

          {setting.tipoAcoplamiento?.title && (
            <TableRow
              key={9}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Tipo de Acomplamiento
              </TableCell>
              <TableCell align="right">
                {setting.tipoAcoplamiento?.title}
              </TableCell>
            </TableRow>
          )}

          {setting.sincronizacion?.title && (
            <TableRow
              key={9}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Sincronización
              </TableCell>
              <TableCell align="right">
                {setting.sincronizacion?.title}
              </TableCell>
            </TableRow>
          )}

          {/*

          <TableRow
            key={3}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Tipo de cajón/guía
            </TableCell>
            <TableCell align="right">{setting.tipoCajon}</TableCell>
          </TableRow>

          <TableRow
            key={4}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Tipo Construcción
            </TableCell>
            <TableCell align="right">
              {setting.tipoConstruccion?.title}
            </TableCell>
          </TableRow>

          <TableRow
            key={5}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Tipo de bloqueo
            </TableCell>
            <TableCell align="right">{setting.tipoBloqueo?.title}</TableCell>
          </TableRow>

          <TableRow
            key={6}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Carga dinámica / Largo nominal
            </TableCell>
            <TableCell align="right">
              {setting.capacidadCargaLargo?.title}
            </TableCell>
          </TableRow>

          <TableRow
            key={7}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Variante de montaje
            </TableCell>
            <TableCell align="right">
              {setting.vatianteMontaje?.title}
            </TableCell>
          </TableRow>

          <TableRow
            key={8}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Tecnología de movimiento
            </TableCell>
            <TableCell align="right">
              {setting.tecnologiaMovimiento?.title}
            </TableCell>
          </TableRow>

          <TableRow
            key={9}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Tipo de montaje
            </TableCell>
            <TableCell align="right">{setting.tipoMontaje?.title}</TableCell>
          </TableRow>

          <TableRow
            key={10}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Tipo de montaje
            </TableCell>
            <TableCell align="right">{setting.tipoMontaje?.title}</TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
