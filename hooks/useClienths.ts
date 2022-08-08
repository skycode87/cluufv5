import useSWR, { SWRConfiguration } from 'swr';
import { IUser } from '../interfaces';
import axios from 'axios';
import Cookies from 'js-cookie';
import axiosApi from '../axios/axiosApi';

import { API_ROUTER } from "../config";

const fetcher = (url) =>
axios
  .get(url, { headers: { Authorization: Cookies.get('token')  } })
  .then((res) => res.data);


export const useClienths = ({ value }) => {
  
      const { data, error } = useSWR<IUser[]>(
        [`${API_ROUTER.USER.userGetEmailByHubspot}/${value}`],
        fetcher
      );

    return {
        okClienths: data?.length > 0 ? true : false,
        clienths: data || [],
        isLoadingClienths: !error && !data,
        isErrorClienths: error
    }

}


export const getClienths = async({ value }) => {
  
  console.log(`${API_ROUTER.USER.userGetEmailByHubspot}/${value}`);

  const { data, status } = await axiosApi({
      url: `${API_ROUTER.USER.userGetEmailByHubspot}/${value}`,
  });

  if(status === 200){
      return  { data, status }
  }

  return [];

}


