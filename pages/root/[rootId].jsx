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

import { getRootById } from "../../handlers/root";
import {
  ToastSuccessServer,
  ToastErrorServer,
} from "../../components/ui/toast";

import { AdminLayout } from "../../components/layouts/AdminLayout";

import { AuthContext } from "../../context/auth";
import RootForm from "../root/rootForm";
import { API_ROUTER } from "../../config";

//62e40d9822eb2100107d53aa

const RootPage = () => {
  const [datas, setDatas] = useState([]);
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [isLoadingSearch, setLoadingSearch] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const [root, setRoot] = useState(null);

  const { rootId } = router.query;

  const initialData = async (pId) => {
    const { data, ok } = await getRootById(pId);
    if (ok) setRoot(data);
    return data;
  };

  const onSubmit = async (form) => {
    try {
      setIsSaving(true);

      let method = "POST";
      if (form._id && form.isDelete) method = "DELETE";
      else if (form._id) method = "PUT";

      const { data, status } = await axiosApi({
        url: API_ROUTER.ROOT.rootInstance,
        method,
        data: form,
      });

      if (status === 200) {
        data._id
          ? ToastSuccessServer(`#${data.login}`)
          : ToastSuccessServer(`Error de actualización`);
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
    if (rootId) {
      initialData(rootId);
    }
  }, [rootId]);

  return (
    <AdminLayout
      title={"Usuarios"}
      subTitle={"Mantenimiento de usuarios"}
      icon={<PeopleOutline />}
    >
      {root?._id && rootId ? (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <RootForm root={root} onSubmit={onSubmit} isSaving={isSaving} />
            </Grid>
          </Grid>
        </>
      ) : (
        <CircularProgress />
      )}
    </AdminLayout>
  );
};

export default RootPage;
