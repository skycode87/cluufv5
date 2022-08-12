/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState, useContext } from "react";

import { CircularProgress, Avatar, Box, Grid } from "@mui/material";
import { useRouter } from "next/router";

import { axiosApi } from "../../axios";

import PlanForm from "./planPackForm";
import { packById } from "../../handlers/pack";
import { getTourguides } from "../../handlers/plan";

import { Person, DriveFileRenameOutline } from "@mui/icons-material";

import { AdminLayout } from "../../components/layouts/AdminLayout";
import { API_ROUTER } from "../../config";
import {
  ToastSuccessServer,
  ToastErrorServer,
} from "../../components/ui/toast";

import { green } from "@mui/material/colors";
import { AuthContext } from "../../context/auth";

const PackPlanPage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();
  const { id } = router.query;

  const [isSaving, setIsSaving] = useState(false);
  const [isReload, setIsReload] = useState(false);

  const [ui, setUi] = useState({});
  const [pack, setPack] = useState(null);
  const [guides, setGuides] = useState(null);

  const onSubmit = async (form) => {
    try {
      console.log(form);

      setIsSaving(true);

      let method = "POST";
      const { data, status } = await axiosApi({
        url: API_ROUTER.PLAN.getPlanInstance,
        method,
        data: form,
      });

      if (status === 200) {
        data.serial
          ? ToastSuccessServer(`Plan #${data.serial}`)
          : ToastSuccessServer(`Sin asignación de codigo`);
      }

      //  router.replace(`/client/list`);
    } catch (err) {
      ToastErrorServer(err);
    } finally {
      setIsSaving(false);
    }
  };

  const initialData = async () => {
    //setLoading(true);
    console.log("hey", id);
    try {
      const { pack, ok } = await packById(id);
      if (ok) {
        setPack(pack);
      }
    } catch (err) {
    } finally {
      /// setLoading(false);
    }
  };

  const loadGuides = async () => {
    const { data, ok } = await getTourguides();
    setGuides(data);
  };

  useEffect(() => {
    if (id) {
      initialData();
      loadGuides();
    }
  }, [id]);

  //const { users, isLoadingUsers, okUsers } = useUsers({ role: "admin" });

  return (
    <AdminLayout
      title={ui.title}
      subTitle={ui?.subtitle || ""}
      icon={<DriveFileRenameOutline />}
    >
      {!isReload && pack?._id ? (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <PlanForm
                //owners={users}
                pack={pack}
                guides={guides}
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

export default PackPlanPage;
