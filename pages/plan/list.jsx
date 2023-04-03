import { useState, useEffect } from "react";
import NextLink from "next/link";

import {
  PeopleOutline,
  CalendarMonth,
  TimeToLeaveOutlined,
} from "@mui/icons-material";
import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, Link, CircularProgress, Typography, Box } from "@mui/material";

import {
  planUpdates,
  planSearchAll,
  getPlansByDate,
  getPlansByGuia,
} from "../../handlers/plan";

import { AdminLayout } from "../../components/layouts/AdminLayout";
import TaskSearchByDate from "../../components/forms/taskSearchByDate";

import { statusIconFormat } from "../../utils/formats";

const PlanList = () => {
  const [datas, setDatas] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [arrys, setArrys] = useState([]);

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
            availability: plan?.availability,
            openApps: plan?.openApps,
            fecha: plan?.fecha,
            hora: plan?.hora,
            id: plan?._id,
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
      const { ok1 } = await planUpdates();
      if (ok1) {
        console.log("ok1");
        const { plans, ok } = await planSearchAll();
        if (ok) {
          console.log("ok2", plans);

          let itemsArray = [];
          plans.forEach((item) => {
            itemsArray.push({
              departureDate: item.departureDate,
              departureTime: item.departureTime,
              maxLimit: item.maxLimit,
              name: item.name,
              packId: item.packId,
              price: item.price,
              serial: item.serial,
              status: item.status,
              totalApps: item?.totalApps,
              packName: item.packId?.name,
              guideName: item?.guideId?.firstname,
              availability: item?.availability,
              openApps: item?.openApps,
              fecha: item?.fecha,
              hora: item?.hora,
              id: item?._id,
            });
          });

          setDatas(itemsArray);

          return plans;
        }
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      field: "estatus",
      headerName: "",
      width: 50,
      renderCell: ({ row }) => {
        return <Typography>{statusIconFormat(row.status)}</Typography>;
      },
    },
    {
      field: "maxLimit",
      headerName: "Cupos",
      width: 80,
      renderCell: ({ row }) => {
        return (
          <Typography>
            <b>{parseFloat(row.maxLimit) - parseFloat(row.availability)}</b>
            <small>/{row.maxLimit}</small>
          </Typography>
        );
      },
    },
    {
      field: "packName",
      headerName: "Paquete",
      width: 300,
      renderCell: ({ row }) => {
        return (
          <NextLink href={`/appsByPlan/${row.id}`} passHref>
            <Link underline="always">
              <Typography>
                <b>{row.packName}</b>
                <br />
                <small>
                  <CalendarMonth sx={{ fontSize: 12 }} /> {row.fecha} {"   "}{" "}
                  &nbsp; &nbsp;
                  <b>
                    {" "}
                    <TimeToLeaveOutlined sx={{ fontSize: 12 }} /> {row.hora}{" "}
                  </b>
                </small>
              </Typography>
            </Link>
          </NextLink>
        );
      },
    },
    {
      field: "openApps",
      headerName: "Asistencía",
      width: 100,
      renderCell: ({ row }) => {
        return (
          <Typography>
            <b>{row.openApps}</b>
          </Typography>
        );
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
    /*
    if (localStorage.getItem("reload")) {
    } else {
      localStorage.setItem("reload", true);
      setTimeout(() => {
        location.reload();
      }, [1000]);
    }
    */

    // console.log("planlist");
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
            availability: plan?.availability,
            openApps: plan?.openApps,
            id: plan?._id,
          }))
        );
      setLoading(false);
    }
  };

  const handleChange = (e) => {};

  useEffect(() => {
    console.log("datas", datas);
  }, [datas]);

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

            {datas && datas.length > 0 ? (
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
                Recargue de nuevo la pagina, para visualizar registros.
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
