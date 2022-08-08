import axiosApi from "../axios/axiosApi";

import { API_ROUTER } from "../config";

export const appByPlan = async (id) => {
  console.log(`${API_ROUTER.APP.getAppPlan}/${id}`);

  const response = await axiosApi.get(`${API_ROUTER.APP.getAppPlan}/${id}`);
  const { data, status } = response;

  return {
    ok: data?.length > 0 ? true : false,
    apps: data || [],
    status,
  };
};

export const getAppById = async (id) => {
  const response = await axiosApi.get(`${API_ROUTER.APP.getAppById}/${id}`);
  const { data, status } = response;

  return {
    ok: status === 200 ? true : false,
    apps: data || [],
    status,
  };
};
