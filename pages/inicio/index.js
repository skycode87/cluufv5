import { useState, useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { PeopleOutline, Add } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import {
  Grid,
  Link,
  CircularProgress,
  Typography,
  Box,
  Button,
  Tooltip,
} from "@mui/material";

import { getPacks } from "../../handlers/pack";

import { AdminLayout } from "../../components/layouts/AdminLayout";

import { moneyFormat } from "../../utils/formats";

const Inicio = () => {
  const [datas, setDatas] = useState([]);
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const initialData = async () => {
    setLoading(true);

    try {
      const { packs, ok } = await getPacks();

      if (ok) {
        setDatas(
          packs.map((item) => ({
            name: item.name,
            id: item._id,
            price: item.price,
            kind: item.kind,
            maxLimit: item.maxLimit,
            isFree: item.isFree,
          }))
        );
        return packs;
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    initialData();
  }, []);

  const handleChange = (e) => {};

  return (
    <AdminLayout
      title={"Usuarios"}
      subTitle={"Mantenimiento de usuarios"}
      icon={<PeopleOutline />}
    >
      <Box className="card">
        <Typography variant="overline" display="block">
          Seleccione una opción
        </Typography>

        <Grid container className="fadeIn" spacing={2}>
          <Grid item xs={12} md={4} sx={{ p: 2 }}>
            <NextLink href={`/plan/list`} passHref>
              <Link underline="always">
                <Tooltip title="Abrir un nuevo Tour">
                  <Button
                    color="success"
                    className="circular-btn"
                    type="button"
                    fullWidth
                    sx={{ height: "50px", fontSize: 16 }}
                  >
                    Planes o Tours
                  </Button>
                </Tooltip>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={12} md={4} sx={{ p: 2 }}>
            <NextLink href={`/pack/list`} passHref>
              <Link underline="always">
                <Tooltip title="Abrir un nuevo Tour">
                  <Button
                    color="success"
                    className="circular-btn"
                    type="button"
                    fullWidth
                    sx={{ height: "50px", fontSize: 16 }}
                  >
                    Paquetes turisticos
                  </Button>
                </Tooltip>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={12} md={4} sx={{ p: 2 }}>
            <NextLink href={`/root/list`} passHref>
              <Link underline="always">
                <Tooltip title="Abrir un nuevo Tour">
                  <Button
                    color="success"
                    className="circular-btn"
                    type="button"
                    fullWidth
                    sx={{ height: "50px", fontSize: 16 }}
                  >
                    Usuarios del sistema
                  </Button>
                </Tooltip>
              </Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
};

export default Inicio;
