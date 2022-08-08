import { useState, useEffect, useContext } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

import axios from "axios";

import useSWR from "swr";
import { PeopleOutline } from "@mui/icons-material";
import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";
import {
  Grid,
  Link,
  Button,
  Chip,
  CircularProgress,
  Box,
  Avatar,
} from "@mui/material";

import CardNumber from "../../components/ui/cardNumber";

import LockResetIcon from "@mui/icons-material/LockReset";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

import {
  userSearchByRole,
  userDomainByTag,
  userTotalByActive,
} from "../../handlers/user";
import { AdminLayout } from "../../components/layouts/AdminLayout";
import ClientSearchByText from "../../components/forms/clientSearchByText";
import { Typography } from "antd";
import { showToast, toastWarning } from "../../components/ui";

import ClientUpdateDomain from "../../components/forms/clientUpdateDomain";
import ClientUpdateTag from "../../components/forms/clientUpdateTag";
import { AuthContext } from "../../context/auth";

import { API_ROUTER } from "../../config";

const mantenimientoFormat = (valors) => {
  switch (valors) {
    case true:
      return <Chip size="small" label="Si" color="success" />;
      break;

    case false:
      return <Chip size="small" label="No" color="error" />;
      break;

    default:
      break;
  }
};

const softwareFormat = (valors) => {
  switch (valors.active) {
    case true:
      return (
        <Chip
          variant="outlined"
          size="small"
          label={valors.software}
          color="success"
        />
      );
      break;

    case false:
      return (
        <Chip
          variant="outlined"
          size="small"
          label={valors.software}
          color="error"
        />
      );
      break;

    default:
      break;
  }
};

const ClientsList = () => {
  const [clients, setClients] = useState([]);
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingSearch, setLoadingSearch] = useState(false);
  const [isSearch, setSearch] = useState(false);

  const initialData = async () => {
    const { users, okUsers } = await userSearchByRole({ role: "client" });
    if (okUsers) {
      setClients(
        users.map((user) => ({
          id: user._id,
          email: user.email,
          name: user.name,
          company: user.company,
          role: user.role,
          software: user.software,
          active: user.active,
          expired: user.expired,
          code: user.code,
          tickets: user.tickets || "---",
          domain: user.domain,
          tag: user.tag,
        }))
      );
      return users;
    }
  };

  const searchDomain = () => {
    clients.forEach((item, i) => {
      setTimeout(function () {
        // userSearchDomain(item.id)
      }, i * 4000);
    });
  };

  const validateUserDomainByTag = async (id) => {
    setLoadingSearch(true);
    setTimeout(() => {
      setLoadingSearch(false);
    }, 4000);

    const data = await userDomainByTag(id);

    if (data.users.domain === undefined) {
      toastWarning({ title: " No hubo actualización" });
    } else {
      showToast({ title: data.users.domain });
      initialData();
    }
  };

  const columns = [
    {
      field: "active",
      headerName: "Mantenimiento",
      width: 120,
      renderCell: ({ row }) => {
        return mantenimientoFormat(row.active);
      },
    },
    {
      field: "code",
      headerName: "Codigo",
      width: 80,
      renderCell: ({ row }) => {
        return (
          <NextLink href={`/client/${row.id}`} passHref>
            <Link underline="always">
              <Typography>{row.code} </Typography>
            </Link>
          </NextLink>
        );
      },
    },

    {
      field: "company",
      headerName: "Compañia",
      width: 300,
      renderCell: ({ row }) => {
        return (
          <NextLink href={`/client/${row.id}`} passHref>
            <Link underline="always">
              <Typography>{row.company} </Typography>
            </Link>
          </NextLink>
        );
      },
    },
    {
      field: "software",
      headerName: "Software",
      width: 150,
      renderCell: ({ row }) => {
        return softwareFormat(row);
      },
    },
    {
      field: "expired",
      headerName: "Fecha de expiración",
      width: 300,
      renderCell: ({ row }) => {
        return moment(row.expired).format("LL");
      },
    },

    {
      field: "domain",
      headerName: "Dominio",
      width: 300,
      renderCell: ({ row }) => {
        return (
          <>
            <Button
              disabled={isLoadingSearch}
              onClick={() => validateUserDomainByTag(row.id)}
            >
              <ManageSearchIcon />
            </Button>
            <ClientUpdateDomain client={row} clientId={row.id} />
          </>
        );
      },
    },

    {
      field: "tag",
      headerName: "Tag",
      width: 200,
      renderCell: ({ row }) => {
        return <ClientUpdateTag client={row} clientId={row.id} />;
      },
    },

    {
      field: "tickets",
      headerName: "Tickets",
      width: 80,
      renderCell: ({ row }) => {
        return <Typography>{row.tickets}</Typography>;
      },
    },
    {
      field: "Ticket",
      headerName: "Acciones",
      width: 300,
      renderCell: ({ row }) => {
        return (
          <>
            &nbsp;
            <NextLink passHref href={`/task/client-${row.id}`}>
              <Link>
                <Button>
                  <SupportAgentIcon />
                </Button>
              </Link>
            </NextLink>
            &nbsp;
            <NextLink passHref href={`/password/${row.id}`}>
              <Link>
                <Button>
                  <LockResetIcon />
                </Button>
              </Link>
            </NextLink>
          </>
        );
      },
    },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // !isLoggedIn && router.push(`/auth/login`);
    initialData();
  }, []);

  const address = API_ROUTER.USER.userGetUsersByStatus;
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(address, fetcher);

  const openDetails = async (param) => {
    setLoading(true);
    try {
      const data1 = await userTotalByActive(param);
      const { users, okUsers } = data1;

      if (okUsers) {
        setClients(
          users.map((user) => ({
            id: user._id,
            email: user.email,
            name: user.name,
            company: user.company,
            role: user.role,
            software: user.software,
            active: user.active,
            expired: user.expired,
            code: user.code,
            tickets: user.tickets || "---",
            domain: user.domain,
            tag: user.tag,
          }))
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout
      title={"Usuarios"}
      subTitle={"Mantenimiento de usuarios"}
      icon={<PeopleOutline />}
    >
      <Box className="card">
        <Grid container className="fadeIn">
          <Grid item xs={6} md={2}>
            <Link onClick={() => openDetails(true)}>
              <CardNumber
                title={data?.yes || 0}
                subtitle="Con mantenimiento"
                clase="successGradient pointer"
              />
            </Link>
          </Grid>

          <Grid item xs={6} md={2}>
            <Link onClick={() => openDetails(false)}>
              <CardNumber
                title={data?.no || 0}
                subtitle="Sin Mantenimento"
                clase="errorGradient pointer"
              />
            </Link>
          </Grid>

          <Grid item xs={6} md={2}>
            <Link onClick={() => initialData()}>
              <CardNumber
                title={data?.yes + data?.no || 0}
                subtitle="Todos"
                clase="infoGradient pointer"
              />
            </Link>
          </Grid>

          <Grid item xs={6} md={2}>
            <Link onClick={() => setSearch(!isSearch)}>
              <CardNumber
                title={!isSearch ? "+" : "-"}
                subtitle="Filtros"
                clase="defaultGradient pointer"
              />
            </Link>
          </Grid>
        </Grid>

        <Grid container className="fadeIn">
          {isSearch && (
            <Grid
              item
              xs={12}
              md={12}
              sx={{
                p: 3,
                width: "100%",
                background: "#DFE2E3",
                borderRadius: 3,
                mb: 2,
              }}
            >
              <ClientSearchByText
                setClients={setClients}
                setLoading={setLoading}
                initialData={initialData}
              />
            </Grid>
          )}

          {clients.length > 0 ? (
            <Grid item xs={12} sx={{ height: 1000, width: "100%" }}>
              {!isLoading ? (
                <DataGrid
                  rows={clients}
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
              <CircularProgress />
            </Grid>
          )}
        </Grid>
      </Box>
    </AdminLayout>
  );
};

export default ClientsList;
