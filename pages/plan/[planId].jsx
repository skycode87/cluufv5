/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useMemo, useState, useContext } from "react";

import { CircularProgress, Avatar, Box, Grid } from "@mui/material";
import { useRouter } from "next/router";

import { axiosApi } from "../../axios";

import { useUsers } from "../../hooks";

import PlanForm from "./planForm";

import { Person, DriveFileRenameOutline } from "@mui/icons-material";

import { AdminLayout } from "../../components/layouts/AdminLayout";
import { API_ROUTER } from "../../config";
import {
  ToastSuccessServer,
  ToastErrorServer,
} from "../../components/ui/toast";

import { green } from "@mui/material/colors";
import { AuthContext } from "../../context/auth";

const PlanPage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();
  const { planId = "new" } = router.query;

  const [isSaving, setIsSaving] = useState(false);
  const [isReload, setIsReload] = useState(false);

  const [ui, setUi] = useState({});
  const [plan, setPlan] = useState({});

  const onSubmit = async (form) => {
    try {
      setIsSaving(true);

      let method = "POST";
      if (form._id && form.isDelete) method = "DELETE";
      else if (form._id) method = "PUT";

      const { data, status } = await axiosApi({
        url: API_ROUTER.USER.userClient,
        method,
        data: form,
      });

      if (status === 200) {
        data.serial
          ? ToastSuccessServer(`Client #${data.code}`)
          : ToastSuccessServer(`Sin asignación de codigo`);
      }

      router.replace(`/client/list`);
    } catch (err) {
      ToastErrorServer(err);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    !isLoggedIn && router.push(`/auth/login`);

    (async () => {
      try {
        setIsReload(true);
        if (planId && planId === "new") {
          setUi({ ...ui, title: "Nuevo plan" });
          setClient({ ...plan });
        } else if (planId) {
          const response = await axiosApi.get(
            `${API_ROUTER.PLAN.getPlanInstance}/${planId}`
          );
          const { data, status } = response;
          if (status === 200) {
            setUi({
              ...ui,
              title: data.company,
              subtitle: `Codigo # ${data.serial}`,
            });
            setPlan({ ...plan, ...data });
          } else {
            return null;
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsReload(false);
      }
    })();
  }, [planId, isLoggedIn]);

  //const { users, isLoadingUsers, okUsers } = useUsers({ role: "admin" });

  return (
    <AdminLayout
      title={ui.title}
      subTitle={ui?.subtitle || ""}
      icon={<DriveFileRenameOutline />}
    >
      {!isReload && ((plan?._id && planId) || planId === "new") ? (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <PlanForm
                //owners={users}
                plan={plan}
                onSubmit={onSubmit}
                isSaving={isSaving}
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <CircularProgress />
      )}
    </AdminLayout>
  );
};

export default PlanPage;
