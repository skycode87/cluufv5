import { useState, useEffect } from "react";
import NextLink from "next/link";
import { MailOutline, PeopleOutline } from "@mui/icons-material";
import moment from "moment";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Grid, Link, Button, Chip, Box, Avatar, Slide } from "@mui/material";

import ApartmentIcon from "@mui/icons-material/Apartment";

import { AdminLayout } from "../../components/layouts/AdminLayout";

import { green } from "@mui/material/colors";
import { CardHeader1, showToast, toastWarning } from "../../components/ui";

import Resume from "../../components/configurator/resume";
import Steeper from "../../components/configurator/steeper";
import SectionPlay from "../../components/configurator/sectionPlay";

const programData = [
  {
    title: "LEGRABOX",
    imageUrl:
      "https://e-services.blum.com/opc/resources/img/configuration/PROGLI~PURE.jpg",
    helpUrl: "",
    code: "1000",
  },
  {
    title: "TANDEMBOX",
    imageUrl:
      "https://e-services.blum.com/opc/resources/img/configuration/PROGLI~ANTARO.jpg",
    helpUrl: "",
    code: "2000",
  },
  {
    title: "METABOX",
    imageUrl:
      "https://e-services.blum.com/opc/resources/img/configuration/PROGLI~METABOX.jpg",
    helpUrl: "",
    code: "3000",
  },
];

const ClientsList = () => {
  const [setting, setSetting] = useState({
    color: null,
    program: programData,
    extension: null,
    tipoCajon: null,
    tipoConstruccion: null,
    tipoBloqueo: null,
    sincronizacion: null,
  });

  useEffect(() => {
    console.log(setting);
  }, [setting]);

  return (
    <AdminLayout
      title={"Usuarios"}
      subTitle={"Mantenimiento de usuarios"}
      icon={<PeopleOutline />}
    >
      <Box className="card">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Steeper
              setting={setting}
              section01={
                <SectionPlay setting={setting} setSetting={setSetting} />
              }
            />
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
};

export default ClientsList;
