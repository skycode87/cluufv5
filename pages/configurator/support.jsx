import { useState, useEffect } from "react";
import NextLink from "next/link";
import { PeopleOutline } from "@mui/icons-material";

import { Grid, Box } from "@mui/material";

import { AdminLayout } from "../../components/layouts/AdminLayout";

import Steeper from "../../components/configurator/support/steeperSupport";
import Main from "../../components/configurator/support/mainSupport";

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

const SupportConfigurator = () => {
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
              section01={<Main setting={setting} setSetting={setSetting} />}
            />
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
};

export default SupportConfigurator;
