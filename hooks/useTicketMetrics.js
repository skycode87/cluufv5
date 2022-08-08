import useSWR, { SWRConfiguration } from "swr";

import { API_ROUTER } from "../config";

const fetchTerm = (url, term) =>
  axios({ ...getRequest, url, params: { term } }).then((res) => res.data);

export const useTicketMetrics = (term) => {
  const { data, error } = useSWR(
    [API_ROUTER.TICKET.ticketGetReport, term],
    fetchTerm
  );

  console.log(data, error);

  return {
    metrics: data || [],
  };
};
