import axiosApi from "../axios/axiosApi";

import { API_ROUTER } from "../config";

export const taskSearchByText = async (params) => {
  const response = await axiosApi.post(
    `${API_ROUTER.TICKET.ticketGetUsersBySearch}`,
    params
  );
  const { data, status } = response;

  return {
    okTasks: data?.length > 0 ? true : false,
    tasks: data || [],
    status,
  };
};

export const taskLoadGrid = async ({ filter = {} }) => {
  const response = await axiosApi.get(
    API_ROUTER.TICKET.ticketGetTickets,
    filter
  );
  const { data, status } = response;

  return {
    okTasks: data?.length > 0 ? true : false,
    tasks: data || [],
    status,
  };
};

export const taskInstallationLoadGrid = async ({ filter = {} }) => {
  const response = await axiosApi.get(
    API_ROUTER.TICKET.ticketGetTicketsInstallation,
    filter
  );
  const { data, status } = response;

  return {
    okTasks: data?.length > 0 ? true : false,
    tasks: data || [],
    status,
  };
};

export const taskByUserLoadGrid = async ({ filter = {} }) => {
  const response = await axiosApi.post(
    API_ROUTER.TICKET.ticketGetTickets,
    filter
  );
  const { data, status } = response;

  return {
    okTasks: data?.length > 0 ? true : false,
    tasks: data || [],
    status,
  };
};

export const taskTotalByStatus = async (status1) => {
  const response = await axiosApi(
    `${API_ROUTER.TICKET.ticketGetTicketsByStatus}/${status1}`
  );
  const { data, status } = response;

  return {
    okMetrics: data?.length > 0 ? true : false,
    metrics: data || [],
    status,
  };
};

export const taskTotalByStatusByUser = async (status1) => {
  const response = await axiosApi.put(
    API_ROUTER.TICKET.ticketGetTicketsByStatus,
    { status: status1 }
  );
  const { data, status } = response;

  return {
    okMetrics: data?.length > 0 ? true : false,
    metrics: data || [],
    status,
  };
};

export const installationsTotalByStatusByUser = async (status1) => {
  const response = await axiosApi.put(
    API_ROUTER.TICKET.ticketInstallationGetTicketsByStatus,
    { status: status1 }
  );
  const { data, status } = response;

  return {
    okMetrics: data?.length > 0 ? true : false,
    metrics: data || [],
    status,
  };
};
