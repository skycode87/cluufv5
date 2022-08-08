import axios from "axios";
import axiosApi from "../axios/axiosApi";

import { API_ROUTER } from "../config";

export const signin = async ({ email, password }) => {
  try {
    const response = await axios.post(API_ROUTER.signin, { email, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
      return null;
    } else {
      console.log(error);
      return null;
    }

    return null;
  }
};

export const userSearchByText = async ({ text }) => {
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

export const userSearchByRole = async ({ role }) => {
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

export const userById = async (id) => {
  const response = await axiosApi.get(`${API_ROUTER.USER.userClient}/${id}`);
  const { data, status } = response;

  return {
    okUsers: data?.length > 0 ? true : false,
    users: data || [],
    status,
  };
};

export const validateToken = async () => {
  const response = await axiosApi.get(API_ROUTER.USER.userValidateToken);
  const { data, status } = response;

  return {
    ok: status === 200 ? true : false,
    data,
    status,
  };
};
