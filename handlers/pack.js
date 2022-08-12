import axiosApi from "../axios/axiosApi";
import moment from "moment";

import { API_ROUTER } from "../config";

export const getPacks = async () => {
  const response = await axiosApi.get(API_ROUTER.PACK.getPackInstance);
  const { data, status } = response;

  return {
    ok: status === 200 ? true : false,
    packs: data || [],
    status,
  };
};

export const packById = async (id) => {
  console.log("aqui", id);
  const response = await axiosApi.get(
    `${API_ROUTER.PACK.getPackInstance}/${id}`
  );
  const { data, status } = response;

  return {
    ok: status === 200 ? true : false,
    pack: data || [],
    status,
  };
};
