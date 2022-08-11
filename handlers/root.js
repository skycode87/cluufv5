import axiosApi from "../axios/axiosApi";
import moment from "moment";

import { API_ROUTER } from "../config";

export const plansSearchByText = async ({ text }) => {
  const response = await axiosApi.get(
    `${API_ROUTER.USER.userGetUsersBySearch}/${text}`
  );
  const { data, status } = response;

  return {
    okUsers: data?.length > 0 ? true : false,
    users: data || [],
    status,
  };
};

export const getRoots = async () => {
  const response = await axiosApi.get(API_ROUTER.ROOT.rootInstance);
  const { data, status } = response;
  console.log({ data, status });
  return {
    ok: status === 200 ? true : false,
    data: data.data || [],
    status,
  };
};

export const getRootById = async (id) => {
  const response = await axiosApi.get(`${API_ROUTER.ROOT.rootInstance}/${id}`);
  const { data, status } = response;

  return {
    ok: status === 200 ? true : false,
    data: data?.data || [],
    status,
  };
};
export const resetPassword = async (id, password) => {
  try {
    let method = "PUT";

    const { data, status } = await axiosApi({
      url: API_ROUTER.ROOT.rootPassword,
      method,
      data: { rootId: id, password1: password },
    });

    if (status === 200) {
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  } finally {
  }
};
