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

const PackList = () => {
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

  const columns = [
    {
      field: "id",
      headerName: "",
      width: 220,
      renderCell: ({ row }) => {
        return (
          <>
            <NextLink href={`/planPack/${row.id}`} passHref>
              <Link underline="always">
                <Tooltip title="Abrir un nuevo Tour">
                  <Button
                    color="success"
                    className="circular-btn"
                    type="button"
                  >
                    <Add /> Plan
                  </Button>
                </Tooltip>
              </Link>
            </NextLink>
            &nbsp;&nbsp;
            <NextLink href={`/appWeb/${row.id}`} passHref>
              <Link underline="always">
                <Tooltip title="Registrar un usuario a un Tour ya existente">
                  <Button
                    color="success"
                    className="circular-btn"
                    type="button"
                  >
                    <Add /> App
                  </Button>
                </Tooltip>
              </Link>
            </NextLink>
          </>
        );
      },
    },
    {
      field: "name",
      headerName: "Nombre",
      width: 220,
      renderCell: ({ row }) => {
        return (
          <Typography>
            <b>{row.name}</b>
          </Typography>
        );
      },
    },
    {
      field: "maxLimit",
      headerName: "Limite",
      width: 100,
      renderCell: ({ row }) => {
        return <Typography>{row.maxLimit} </Typography>;
      },
    },
    {
      field: "price",
      headerName: "Precio",
      width: 120,
      renderCell: ({ row }) => {
        return (
          <Typography>
            {!row.isFree ? moneyFormat(row.price) : "Propinas"}
          </Typography>
        );
      },
    },
  ];

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
          Paquetes
        </Typography>
        {!isLoading ? (
          <Grid container className="fadeIn" spacing={2}>
            <Grid item xs={12} md={6} sx={{ mb: 3 }}></Grid>

            {/*
            <Grid item xs={12} md={2}>
              <FormLabel>
                <Typography
                  sx={{ mb: 1, color: "#294595" }}
                  variant="button"
                  display="block"
                  gutterBottom
                >
                  Busqueda por:
                </Typography>
              </FormLabel>
              <Select
                labelId="demo-simple-select-label"
                id="search"
                label="search"
                onChange={handleChange}
                defaultValue="proximos"
                name="search"
              >
                <MenuItem value="proximos">Proximos</MenuItem>
                <MenuItem value="pasados">Pasados</MenuItem>
                <MenuItem value="50">últimos 50</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} md={2}>
              <FormLabel>
                <Typography
                  sx={{ mb: 1, color: "#294595" }}
                  variant="button"
                  display="block"
                  gutterBottom
                >
                  Busqueda por Guía:
                </Typography>
              </FormLabel>
            </Grid>
            */}

            {datas.length > 0 ? (
              <Grid item xs={12} sx={{ height: 1000, width: "100%" }}>
                {!isLoading ? (
                  <DataGrid
                    rows={datas}
                    columns={columns}
                    pageSize={30}
                    rowsPerPageOptions={[30]}
                  />
                ) : (
                  <CircularProgress />
                )}
              </Grid>
            ) : (
              <Grid item xs={12} sx={{ height: 50, width: "100%" }}>
                No hay registros
              </Grid>
            )}
          </Grid>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </AdminLayout>
  );
};

export default PackList;
