import { useState, useEffect, useContext } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Upload } from "antd";
import download from "downloadjs";

import { PeopleOutline, ArrowBackIos, Delete, Lock } from "@mui/icons-material";
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
import { getRoots, resetPassword } from "../../handlers/root";

import { AdminLayout } from "../../components/layouts/AdminLayout";

import { API_ROUTER } from "../../config";
import {
  ToastSuccessServer,
  ToastErrorServer,
} from "../../components/ui/toast";

const roleFormat = (value) => {
  if (value === "ADMIN")
    return (
      <Typography sx={{ color: "red", fontWeight: "bold" }}>ADMIN</Typography>
    );
  if (value === "SUPERADMIN")
    return (
      <Typography sx={{ color: "green", fontWeight: "bold" }}>
        SUPERADMIN
      </Typography>
    );
  if (value === "TOURGUIDE")
    return (
      <Typography sx={{ color: "purple", fontWeight: "bold" }}>
        GUIA{" "}
      </Typography>
    );
  if (value === "REFERER")
    return (
      <Typography sx={{ color: "blue", fontWeight: "bold" }}>
        REFERIDO
      </Typography>
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

  const initialData = async () => {
    try {
      setLoading(true);
      const { data, ok } = await getRoots();
      if (ok) {
        setDatas(
          data.map((item) => ({
            id: item._id,
            firstname: item.firstname,
            lastname: item.lastname,
            phone: item.phone,
            email: item.email,
            role: item.role,
            avatar: item.avatar,
            login: item.login,
          }))
        );

        return data;
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
          ? ToastSuccessServer(` #${data.code}`)
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

  const changePassword = (row) => {
    const { id, login } = row;
    Swal.fire({
      title: `Nuevo Password para ${login}`,
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Continuar",
      showLoaderOnConfirm: true,
      preConfirm: (login1) => {
        return resetPassword(id, login1);
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Password actualizado`,
        });
      }
    });
  };

  const columns = [
    {
      field: "archived",
      headerName: "",
      width: 160,
      renderCell: ({ row }) => {
        return (
          <>
            <Button
              onClick={(e) => onDelete(e, { ...row, isDelete: true })}
              sx={{ p: 2 }}
            >
              <Delete />
            </Button>{" "}
            &nbsp;
            <Button onClick={(e) => changePassword(row)} sx={{ p: 2 }}>
              <Lock />
            </Button>
          </>
        );
      },
    },
    {
      field: "login",
      headerName: "Login",
      width: 120,
      renderCell: ({ row }) => {
        return (
          <NextLink href={`/root/${row.id}`} passHref>
            <Link underline="always">
              <Typography>{row.login}</Typography>
            </Link>
          </NextLink>
        );
      },
    },
    {
      field: "firstname",
      headerName: "Nombres",
      width: 250,
      renderCell: ({ row }) => {
        return (
          <NextLink href={`/root/${row.id}`} passHref>
            <Link underline="always">
              <Typography>
                {row.firstname} {row.lastname}
              </Typography>
            </Link>
          </NextLink>
        );
      },
    },
    {
      field: "role",
      headerName: "Role",
      width: 250,
      renderCell: ({ row }) => {
        return (
          <NextLink href={`/root/${row.id}`} passHref>
            <Link underline="always">
              <Typography>{roleFormat(row.role)}</Typography>
            </Link>
          </NextLink>
        );
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
        await initialData();
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

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
          Usuarios del sistema
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
              <h2></h2>
            )}
          </Grid>
        ) : (
          <Grid item xs={12} sx={{ height: 50, width: "100%" }}>
            <CircularProgress />
          </Grid>
        )}
      </Box>
    </AdminLayout>
  );
};

export default PlanList;
