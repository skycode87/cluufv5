import useSWR, { SWRConfiguration } from 'swr';
import { IUser } from '../interfaces';
import axios from 'axios';
import Cookies from 'js-cookie';

import { API_ROUTER } from "../config";

const fetcher = (url) =>
axios
  .get(url, { headers: { Authorization: Cookies.get('token')  } })
  .then((res) => res.data);


export const useToken = () => {
  
      const { data, error } = useSWR<any>(
        [`${API_ROUTER.USER.userValidateToken}`],
        fetcher
      );

      console.log(error);
  
    return {
        session: data.user 
    }
}