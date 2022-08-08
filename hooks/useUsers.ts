import useSWR, { SWRConfiguration } from 'swr';
import { IUser } from '../interfaces';
import axios from 'axios';
import Cookies from 'js-cookie';

import { API_ROUTER } from "../config";

const fetcher = (url) =>
axios
  .get(url, { headers: { Authorization: Cookies.get('token')  } })
  .then((res) => res.data);


export const useUsers = ({ role }) => {
  
      const { data, error } = useSWR<IUser[]>(
        [`${API_ROUTER.userGetUsersByRole}/${role}`],
        fetcher
      );


    return {
        okUsers: data?.length > 0 ? true : false,
        users: data || [],
        isLoadingUsers: !error && !data,
        isError: error
    }

}

export const useRoot = () => {
  
  const { data, error } = useSWR(
    [`${API_ROUTER.USER.userValidateToken}`],
    fetcher
  );


    let isAdmin = false;
    let isGuide = false;

    if(data?.user?.role === "SUPERADMIN" || data?.user?.role === "ADMIN"){
      isAdmin = true;
    }

    if(data?.user?.role === "TOURGUIDE" || data?.user?.role === "REFERER" ){
      isGuide = true;
    }

return {
    user: data?.user || [],
    isAdmin,
    isGuide,
    isLoadingUser: !error && !data,
    isError: error
}

  
  

}