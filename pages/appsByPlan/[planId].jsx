import { useState, useEffect, useContext } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Upload } from "antd";
import download from "downloadjs";

import { PeopleOutline, ArrowBackIos, Delete } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";

import {
  Grid,
  Link,
  Button,
  CircularProgress,
  Box,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

import axiosApi from "../../axios/axiosApi";
import { appByPlan } from "../../handlers/app";
import { plansById, getImagesPlan, getTourguides } from "../../handlers/plan";

import { AdminLayout } from "../../components/layouts/AdminLayout";

import { API_ROUTER } from "../../config";
import {
  ToastSuccessServer,
  ToastErrorServer,
} from "../../components/ui/toast";

import { useRoot } from "../../hooks";

const statusFormat = (value) => {
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

const insituFormat = (value) => {
  if (value === true)
    return (
      <Typography sx={{ color: "green", fontWeight: "bold" }}>SI</Typography>
    );
  if (value === false)
    return (
      <Typography sx={{ color: "red", fontWeight: "bold" }}>NO</Typography>
    );
};

const statusFormatOnlyText = (value) => {
  if (value === "open") return "Abierta";
  if (value === "close") return "Cerrada";
  if (value === "inwait") return "En espera";
  if (value === "cancel") return "Anulada";
};

const insituFormatOnlyText = (value) => {
  if (value === true) return "SI";
  if (value === false) return "NO";
};

const PlanList = () => {
  const [datas, setDatas] = useState([]);
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const [plan, setPlan] = useState(null);
  const [imagex, setImagex] = useState(null);
  const [guides, setGuides] = useState(null);

  const { planId } = router.query;

  const data = false;

  const initialData = async (planId) => {
    try {
      setLoading(true);
      const { apps, ok } = await appByPlan(planId);
      if (ok) {
        setDatas(
          apps.map((item) => ({
            id: item._id,
            active: item.active,
            insitu: item.insitu,
            status: item.status,
            code: item.code,
            referer: item.refererRootId?.firstname,
            serial: item.serial,
            status: item.status,
            firstname: item.userId?.firstname,
            lastname: item.userId?.lastname,
            phone: item.userId?.phone,
            email: item.userId?.email,
            document: item.userId?.document,
            documentType: item.userId?.documentType,
            paymentMode: item.paymentMode,
            isPayment: item.isPayment,
            _id: item._id,
            amount: item.amount,
            observation: item.observation,
            userId: item.userId._id,
            planName: `${item.packId.name}  ${item.planId.departureDate}  ${item.planId.departureTime}`,
          }))
        );

        return apps;
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const loadPlan = async (planId) => {
    const { data, ok } = await plansById(planId);
    if (ok) {
      setPlan(data);
      return data;
    }
  };

  const loadImages = async (planId) => {
    const { data, ok } = await getImagesPlan(planId);
    setImagex(data);
  };

  const loadGuides = async (planId) => {
    const { data, ok } = await getTourguides();
    setGuides(data);
  };

  const handleChange = async (e, row) => {
    try {
      let method = "PUT";
      const { name, value } = e.target;

      if (row.isDelete) {
        method = "DELETE";
      }

      const { data, status } = await axiosApi({
        url: API_ROUTER.APP.getAppPlan,
        method,
        data: { ...row, [name]: value },
      });

      if (status === 200) {
        data.serial
          ? ToastSuccessServer(`App #${data.code}`)
          : ToastSuccessServer(`Sin asignación de codigo`);
      }

      if (row.isDelete) {
        loadPlan(planId);
      }
    } catch (err) {
      ToastErrorServer(err);
    } finally {
    }
  };

  const handleChangeGuide = async (e) => {
    try {
      let method = "PUT";
      const { name, value } = e.target;

      const { data, status } = await axiosApi({
        url: API_ROUTER.PLAN.getTourguide,
        method,
        data: { guideId: value, planId: planId },
      });

      if (status === 200) {
        data.serial
          ? ToastSuccessServer(`Cambio realizado!`)
          : ToastSuccessServer(`Sin asignación de codigo`);
      }
    } catch (err) {
      ToastErrorServer(err);
    } finally {
    }
  };

  const onDelete = (e, row) => {
    Swal.fire({
      title: "Deseas confirmar la eliminación?",
      text: `${row.firstname} ${row.lastname}`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Si, deseo eliminarlo",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        handleChange(e, row);
      } else if (result.isDenied) {
      }
    });
  };

  const downloadCSV = () => {
    let txt = `Codigo, Pack, Nombre, Apellido, Tipo, Documento, Teléfono, Email, Estado, Referido, Asistencía, Método Pago, Monto, Observación`;
    datas.forEach((x) => {
      txt = `${txt}\n${x.code}, ${x.planName}  ,${x.firstname}, ${
        x.lastname
      }, ${x.documentType}, ${x.document}, ${x.phone}, ${
        x.email
      }, ${statusFormatOnlyText(x.status)}, ${
        x.referer
      }, ${insituFormatOnlyText(x.insitu)}, ${x.paymentMode}, ${x.amount}, ${
        x.observation
      }`;
    });

    download(txt, "data.csv", "text/plain");
  };

  const downloadSingleCSV = () => {
    let txt = `Codigo, Pack, Nombre, Apellido, Tipo, Documento, Teléfono, Estado Observación`;
    datas.forEach((x) => {
      txt = `${txt}\n${x.code}, ${x.planName}  ,${x.firstname}, ${
        x.lastname
      }, ${x.documentType}, ${x.document}, ${x.phone}, ${statusFormatOnlyText(
        x.status
      )}, ${x.observation}`;
    });

    download(txt, "data.csv", "text/plain");
  };

  const columns = [
    {
      field: "archived",
      headerName: "",
      width: 70,
      renderCell: ({ row }) => {
        return (
          <Button onClick={(e) => onDelete(e, { ...row, isDelete: true })}>
            <Delete />
          </Button>
        );
      },
    },
    {
      field: "user",
      headerName: "Usuario",
      width: 200,
      renderCell: ({ row }) => {
        return (
          <NextLink href={`/app/${row.id}`} passHref>
            <Link underline="always">
              <Typography>
                {row.firstname} {row.lastname}{" "}
              </Typography>
            </Link>
          </NextLink>
        );
      },
    },
    {
      field: "insitu",
      headerName: "Asistencia",
      width: 120,
      renderCell: ({ row }) => {
        return (
          <Select
            labelId="demo-simple-select-label"
            id="insitu"
            label="insitu"
            onChange={(e) => handleChange(e, row)}
            defaultValue={row.insitu}
            name="insitu"
          >
            <MenuItem value="true">{insituFormat(true)}</MenuItem>
            <MenuItem value="false">{insituFormat(false)}</MenuItem>
          </Select>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      renderCell: ({ row }) => {
        return (
          <NextLink href={`/app/${row.id}`} passHref>
            <Link underline="always">
              <Typography>{row.email}</Typography>
            </Link>
          </NextLink>
        );
      },
    },
    {
      field: "status",
      headerName: "Estatus",
      width: 100,
      renderCell: ({ row }) => {
        return statusFormat(row.status);
      },
    },
    {
      field: "referer",
      headerName: "Referido",
      width: 220,
      renderCell: ({ row }) => {
        return row.referer;
      },
    },
  ];

  const onChange = (info) => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      console.log(info.file);
    } else if (info.file.status === "error") {
      console.log("error");
    }
  };

  const props = {
    name: "picture",
    multiple: true,
    action: `${API_ROUTER.PLAN.addBucket}/131113131/${planId}`, ///$/
    headers: {},
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    (async () => {
      try {
        if (planId) {
          await loadPlan(planId);
          await initialData(planId);
          await loadImages(planId);
          await loadGuides();
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [planId]);

  const { user, isAdmin } = useRoot();

  return (
    <AdminLayout
      title={"Usuarios"}
      subTitle={"Mantenimiento de usuarios"}
      icon={<PeopleOutline />}
    >
      {plan?._id && (
        <Box className="card" sx={{ mb: 2, fontSize: 12 }}>
          <Grid container className="fadeIn" spacing={1}>
            <Grid item xs={6} md={1}>
              <NextLink passHref href={`/plan/list`}>
                <Link>
                  <Button
                    color="secondary"
                    className="circular-btn"
                    startIcon={<ArrowBackIos />}
                    sx={{ width: "50px", height: "50px" }}
                    type="button"
                  ></Button>
                </Link>
              </NextLink>
            </Grid>
            {datas && (
              <Grid item xs={6} md={1}>
                <b>Apps</b>
                <Typography variant="h5" display="block" gutterBottom>
                  {" "}
                  {datas?.length}
                </Typography>
              </Grid>
            )}

            {datas && (
              <Grid item xs={6} md={1}>
                <b>Abiertas</b>
                <Typography variant="h5" display="block" gutterBottom>
                  {datas?.filter((item) => item.status === "open").length}
                </Typography>
              </Grid>
            )}

            {datas && (
              <Grid item xs={6} md={1}>
                <b>Asistencia</b>
                <Typography variant="h5" display="block" gutterBottom>
                  {datas?.filter((item) => item.insitu === true).length}
                </Typography>
              </Grid>
            )}

            {datas && imagex?.length > 0 && (
              <Grid item xs={6} md={1}>
                <b>Fotos</b>
                <Typography variant="h5" display="block" gutterBottom>
                  {imagex?.length}
                </Typography>
              </Grid>
            )}

            <Grid item xs={12} md={2}>
              <b>Nombre</b>
              <Typography variant="overline" display="block" gutterBottom>
                {plan?.packId.name}
              </Typography>
            </Grid>

            <Grid item xs={12} md={2}>
              <b>Fecha y horario</b>
              <Typography variant="overline" display="block" gutterBottom>
                {plan?.departureDate} / {plan?.departureTime}
              </Typography>
            </Grid>

            <Grid itemxs={12} md={1}>
              <b>Estatus</b>
              <Typography variant="overline" display="block" gutterBottom>
                {plan?.status}
              </Typography>
            </Grid>

            {plan && guides && (
              <Grid item xs={12} md={2}>
                <b>Tour Guide</b>
                <Select
                  id="tourguide"
                  label="tourguide"
                  name="tourguide"
                  defaultValue={plan?.guideId}
                  sx={{ p: 1, fontSize: 12, height: "25px" }}
                  onChange={handleChangeGuide}
                  fullWidth
                >
                  {guides?.map((item) => (
                    <MenuItem value={item._id}>
                      {item.firstname} / {item.login}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            )}

            <Grid item xs={12} md={2}>
              <Upload {...props} onChange={onChange}>
                <Button variant="outlined" color="success" fullWidth>
                  Subir una imagen
                </Button>
              </Upload>
              &nbsp;
            </Grid>

            {isAdmin && (
              <Grid item xs={6} md={2}>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={downloadCSV}
                  fullWidth
                >
                  Excel Admin
                </Button>
              </Grid>
            )}

            <Grid item xs={6} md={2}>
              <Button
                fullWidth
                variant="outlined"
                color="success"
                onClick={downloadSingleCSV}
              >
                Descargar Excel
              </Button>
            </Grid>

            <Grid item xs={6} md={2}>
              <Button variant="outlined" color="success" fullWidth>
                Cerrar este Evento
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}

      <Box className="card">
        <Typography variant="overline" display="block">
          Aplicaciones
        </Typography>
        {!isLoading ? (
          <Grid container className="fadeIn">
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
              <h2>No se encontraron Apps registradas</h2>
            )}
          </Grid>
        ) : (
          <Grid item xs={12} sx={{ height: 50, width: "100%" }}>
            <CircularProgress />
          </Grid>
        )}
      </Box>

      {imagex && imagex?.length > 0 && (
        <>
          <Box className="card" sx={{ mt: 5 }}>
            <Typography variant="overline" display="block">
              Fotografías
            </Typography>
            <Grid container className="fadeIn" spacing={2}>
              {imagex[0]?.length > 15 && (
                <Grid item xs={12} md={6}>
                  <img style={{ maxWidth: "100%" }} src={imagex[0].image} />
                </Grid>
              )}

              {imagex[1]?.length > 15 && (
                <Grid item xs={12} md={6}>
                  <img style={{ maxWidth: "100%" }} src={imagex[1].image} />
                </Grid>
              )}

              {imagex[2]?.length > 15 && (
                <Grid item xs={12} md={6}>
                  <img style={{ maxWidth: "100%" }} src={imagex[2].image} />
                </Grid>
              )}

              {imagex[3]?.length > 15 && (
                <Grid item xs={12} md={6}>
                  <img style={{ maxWidth: "100%" }} src={imagex[3].image} />
                </Grid>
              )}

              {imagex[4]?.length > 15 && (
                <Grid item xs={12} md={6}>
                  <img style={{ maxWidth: "100%" }} src={imagex[4].image} />
                </Grid>
              )}
            </Grid>
          </Box>
        </>
      )}
    </AdminLayout>
  );
};

export default PlanList;
