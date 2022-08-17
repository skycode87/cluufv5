import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axiosApi from "../../axios/axiosApi";

import { PeopleOutline } from "@mui/icons-material";

import { Grid, CircularProgress } from "@mui/material";

import { getPlansByPack } from "../../handlers/plan";
import {
  ToastSuccessServer,
  ToastErrorServer,
} from "../../components/ui/toast";

import { AdminLayout } from "../../components/layouts/AdminLayout";

import WebForm from "./webform";

import { API_ROUTER } from "../../config";

const AppList = () => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [plans, setPlans] = useState([]);
  const [pack, setPack] = useState([]);

  const { packId } = router.query;

  const initialData = async () => {
    const { data, ok } = await getPlansByPack(packId);
    if (ok) {
      setPlans({ ...plans, data });
      if (data.length > 0) {
        setPack(data[0]?.packId);
      }
    }

    return data;
  };

  const onSubmit = async (form) => {
    console.log(form);
    return true;
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (packId) {
      initialData();
    }
  }, [packId]);

  return (
    <AdminLayout
      title={"Usuarios"}
      subTitle={"Mantenimiento de usuarios"}
      icon={<PeopleOutline />}
    >
      {packId && plans?.length > 0 ? (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <WebForm
                plans={plans}
                onSubmit={onSubmit}
                isSaving={isSaving}
                packId={packId}
                pack={pack}
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

export default AppList;
