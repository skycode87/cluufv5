import { useState, useEffect, useContext } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import axiosApi from "../../axios/axiosApi";

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

import { getAppById } from "../../handlers/app";
import {
  ToastSuccessServer,
  ToastErrorServer,
} from "../../components/ui/toast";

import { AdminLayout } from "../../components/layouts/AdminLayout";

import { AuthContext } from "../../context/auth";
import AppForm from "../app/appForm";
import { API_ROUTER } from "../../config";

//62e40d9822eb2100107d53aa

const AppList = () => {
  const [datas, setDatas] = useState([]);
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [isLoadingSearch, setLoadingSearch] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const [apx, setApx] = useState(null);

  const { appId } = router.query;

  const initialData = async (pId) => {
    const { apps, ok } = await getAppById(pId);
    console.log({ apps, ok });
    if (ok) setApx(apps);
    return apps;
  };

  const onSubmit = async (form) => {
    console.log(form);

    try {
      setIsSaving(true);

      let method = "POST";
      if (form._id && form.isDelete) method = "DELETE";
      else if (form._id) method = "PUT";

      const { data, status } = await axiosApi({
        url: API_ROUTER.APP.getAppPlan,
        method,
        data: form,
      });

      if (status === 200) {
        data.serial
          ? ToastSuccessServer(`App #${data.code}`)
          : ToastSuccessServer(`Sin asignación de codigo`);
      }

      /// router.replace(`/client/list`);
    } catch (err) {
      ToastErrorServer(err);
    } finally {
      setIsSaving(false);
    }
  };

  const onDelete = (form) => {
    Swal.fire({
      title: "Deseas confirmar la eliminación?",
      text: `Codigo #${form.firstname}`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Si, deseo eliminarlo",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      onSubmit(form);
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (appId) {
      initialData(appId);
    }
  }, [appId]);

  return (
    <AdminLayout
      title={"Usuarios"}
      subTitle={"Mantenimiento de usuarios"}
      icon={<PeopleOutline />}
    >
      {apx?._id && appId ? (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <AppForm apx={apx} onSubmit={onSubmit} isSaving={isSaving} />
            </Grid>
          </Grid>
        </>
      ) : (
        <CircularProgress />
      )}
    </AdminLayout>
  );
};

export default AppList;
