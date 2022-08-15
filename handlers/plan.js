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

export const planSearchByPack = async ({ role }) => {
  const response = await axiosApi.get(
    `${API_ROUTER.USER.userGetUsersByRole}/${role}`
  );
  const { data, status } = response;

  return {
    okUsers: data?.length > 0 ? true : false,
    users: data || [],
    status,
  };
};

export const planSearchAll = async () => {
  const response = await axiosApi.get(`${API_ROUTER.PLAN.getPlanInstance}`);
  const { data, status } = response;

  return {
    ok: data?.count > 0 ? true : false,
    plans: data.data || [],
    status,
  };
};

export const planUpdates = async () => {
  const response = await axiosApi.get(API_ROUTER.PLAN.planUpdates);
  const { data, status } = response;

  return {
    ok1: data?.count > 0 ? true : false,
    data: data || [],
    status,
  };
};

export const plansById = async (planId) => {
  const response = await axiosApi.get(
    `${API_ROUTER.PLAN.getPlanInstance}/${planId}`
  );
  const { data, status } = response;

  return {
    ok: status === 200 ? true : false,
    data: data || [],
    status,
  };
};

export const getPlansByPack = async (packId) => {
  const response = await axiosApi.get(
    `${API_ROUTER.PLAN.getPlanPack}/${packId}`
  );
  const { data, status } = response;

  return {
    ok: status === 200 ? true : false,
    data: data || [],
    status,
  };
};

export const getImagesPlan = async (planId) => {
  const response = await axiosApi.get(`${API_ROUTER.PLAN.getImages}/${planId}`);
  const { data, status } = response;

  return {
    ok: status === 200 ? true : false,
    data: data || [],
    status,
  };
};

export const getTourguides = async () => {
  const response = await axiosApi.get(API_ROUTER.PLAN.getTourguide);
  const { data, status } = response;

  return {
    ok: status === 200 ? true : false,
    data: data || [],
    status,
  };
};

export const getPlansByDate = async (params) => {
  const response = await axiosApi.get(
    `${API_ROUTER.PLAN.getPlansByDate}/${moment(params[0]).format(
      "YYYY-MM-DD"
    )}/${moment(params[1]).format("YYYY-MM-DD")}`
  );
  const { data, status } = response;

  return {
    ok: status === 200 ? true : false,
    data: data || [],
    status,
  };
};

export const getPlansByGuia = async (guiaId) => {
  const response = await axiosApi.get(
    `${API_ROUTER.PLAN.getPlansByGuia}/${guiaId}`
  );
  const { data, status } = response;

  return {
    ok: status === 200 ? true : false,
    plans: data || [],
    status,
  };
};

export const closePlan = async (planId) => {
  const response = await axiosApi.put(API_ROUTER.PLAN.closePlan, { planId });
  const { data, status } = response;

  return {
    ok: status === 200 ? true : false,
    data: data || [],
    status,
  };
};

/*

export const userSearchDomain = async (id) => {
  const response = await axiosApi.get(
    `${API_ROUTER.USER.userGetUsersForDomain}/${id}`
  );
  const { data, status } = response;

  return {
    okUsers: data?.length > 0 ? true : false,
    users: data || [],
    status,
  };
};

export const userDomainByTag = async (id) => {
  const response = await axiosApi.get(
    `${API_ROUTER.USER.userGetUsersByTag}/${id}`
  );
  const { data, status } = response;

  return {
    okUsers: data?.length > 0 ? true : false,
    users: data || [],
    status,
  };
};

export const userTotalByActive = async (active) => {
  const response = await axiosApi.post(API_ROUTER.USER.userGetUsersByStatus, {
    active,
  });
  const { data, status } = response;

  return {
    okUsers: data?.length > 0 ? true : false,
    users: data || [],
    status,
  };
};

*/
