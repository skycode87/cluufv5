
import axios from 'axios';
import Cookies from 'js-cookie';

const axiosApi = axios.create({
    headers: { Authorization:  Cookies.get('token')  } 
});

export default axiosApi;

