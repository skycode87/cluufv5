import { useState, useEffect, useContext } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useRoot } from "../../hooks";

import { PeopleOutline } from "@mui/icons-material";
import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";
import {
  Grid,
  Link,
  CircularProgress,
  Typography,
  Box,
  Button,
  FormLabel,
  MenuItem,
  Select,
} from "@mui/material";

import {
  planSearchAll,
  getPlansByDate,
  getPlansByGuia,
} from "../../handlers/plan";

import { AdminLayout } from "../../components/layouts/AdminLayout";
import TaskSearchByDate from "../../components/forms/taskSearchByDate";

import { statusFormat } from "../../utils/formats";

import { AuthContext } from "../../context/auth";

const PlanList = () => {
  const [datas, setDatas] = useState([]);
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingSearch, setLoadingSearch] = useState(false);
  const [isSearch, setSearch] = useState(false);

  //const { isGuide, isAdmin } = useRoot();

  const handlePlansByGuia = async () => {
    try {
      setLoading(true);
      const { plans, ok } = await getPlansByGuia("owner");
      if (ok) {
        setDatas(
          plans.map((plan) => ({
            departureDate: plan.departureDate,
            departureTime: plan.departureTime,
            maxLimit: plan.maxLimit,
            name: plan.name,
            packId: plan.packId,
            price: plan.price,
            serial: plan.serial,
            status: plan.status,
            totalApps: plan.totalApps,
            packName: plan.packId.name,
            guideName: plan?.guideId?.firstname,
            id: plan._id,
          }))
        );
        return plans;
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const initialData = async () => {
    setLoading(true);

    try {
      const { plans, ok } = await planSearchAll();
      if (ok) {
        setDatas(
          plans.map((plan) => ({
            departureDate: plan.departureDate,
            departureTime: plan.departureTime,
            maxLimit: plan.maxLimit,
            name: plan.name,
            packId: plan.packId,
            price: plan.price,
            serial: plan.serial,
            status: plan.status,
            totalApps: plan.totalApps,
            packName: plan.packId.name,
            guideName: plan?.guideId?.firstname,
            id: plan._id,
          }))
        );
        return plans;
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      field: "totalApps",
      headerName: "Apps",
      width: 80,
      renderCell: ({ row }) => {
        return <Typography>{row.totalApps} </Typography>;
      },
    },
    {
      field: "estatus",
      headerName: "Estado",
      width: 80,
      renderCell: ({ row }) => {
        return <Typography>{statusFormat(row.status)} </Typography>;
      },
    },
    {
      field: "packName",
      headerName: "Paquete",
      width: 200,
      renderCell: ({ row }) => {
        return (
          <NextLink href={`/appsByPlan/${row.id}`} passHref>
            <Link underline="always">
              <Typography>{row.packName} </Typography>
            </Link>
          </NextLink>
        );
      },
    },
    {
      field: "departureDate",
      headerName: "Fecha",
      width: 120,
      renderCell: ({ row }) => {
        return <Typography>{row.departureDate} </Typography>;
      },
    },
    {
      field: "departureTime",
      headerName: "Hora",
      width: 80,
      renderCell: ({ row }) => {
        return <Typography>{row.departureTime} </Typography>;
      },
    },
    {
      field: "guideId",
      headerName: "Guía",
      width: 120,
      renderCell: ({ row }) => {
        return <Typography>{row.guideName} </Typography>;
      },
    },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // console.log("guia", isGuide, "admin", isAdmin);
    //isGuide && handlePlansByGuia();
    initialData();
  }, []);

  const rangeDatesHandle = async (value) => {
    if (value && moment(value[0]).isValid() && moment(value[1]).isValid()) {
      setLoading(true);

      const { data, ok } = await getPlansByDate(value);
      if (ok)
        setDatas(
          data.map((plan) => ({
            departureDate: plan.departureDate,
            departureTime: plan.departureTime,
            maxLimit: plan.maxLimit,
            name: plan.name,
            packId: plan.packId,
            price: plan.price,
            serial: plan.serial,
            status: plan.status,
            totalApps: plan.totalApps,
            packName: plan.packId.name,
            guideName: plan?.guideId?.firstname,
            id: plan._id,
          }))
        );
      setLoading(false);
    }
  };

  const handleChange = (e) => {};

  return (
    <AdminLayout
      title={"Usuarios"}
      subTitle={"Mantenimiento de usuarios"}
      icon={<PeopleOutline />}
    >
      <Box className="card">
        {!isLoading ? (
          <Grid container className="fadeIn" spacing={2}>
            <Grid item xs={12} md={6} sx={{ mb: 3 }}>
              <TaskSearchByDate
                text="Ingrese el rango de fecha"
                rangeDatesValues={rangeDatesHandle}
              />
            </Grid>

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

export default PlanList;
