
import axios from 'axios';
import Cookies from 'js-cookie';

export const fetcherGetWithToken = (url) =>
axios
  .get(url, { headers: { Authorization: Cookies.get('token') } })
  .then((res) => res.data);


