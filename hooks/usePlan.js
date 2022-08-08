import useSWR, { SWRConfiguration } from "swr";
import axios from "axios";
import Cookies from "js-cookie";

import { API_ROUTER } from "../config";

const fetcher = (url) =>
  axios
    .get(url, { headers: { Authorization: Cookies.get("token") } })
    .then((res) => res.data);

export const usePlan = (planId) => {
  if (String(planId).length > 15) {
    const { data, error } = useSWR(
      [`${API_ROUTER.PLAN.getPlanInstance}/${planId}`],
      fetcher
    );

    return {
      ok: data?.length > 0 ? true : false,
      data: data || [],
      isLoadingData: !error && !data,
      isError: error,
    };
  }
  return [];
};
