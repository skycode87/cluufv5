import axios from "axios";
import Cookies from "js-cookie";
import { API_ROUTER } from "../config";

export const loginSlackAdmin = async (slackToken) => {
  try {
    const { data } = await axios.post(API_ROUTER.signinSlack, {
      token: slackToken,
    });
    const { token, user } = data;
    Cookies.set("token", token);
    location.href = "/installation/clients";
    //assignRole(user);
    return true;
  } catch (error) {
    return false;
  }
};
