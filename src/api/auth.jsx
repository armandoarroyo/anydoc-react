import axios from "axios";
import { authHeader } from "./localServices";

const authApiUrl =
  "https://pad2zt6ubf.execute-api.us-east-1.amazonaws.com/Prod";

export async function login(user, pass) {
  return await axios
    .post(authApiUrl + "/api/Auth/Login", {
      UserName: user,
      Password: pass,
    })
    .then(function (response) {
      if (response.status === 200) {
        localStorage.setItem("user", user);
        localStorage.setItem("pass", pass);
        sms();
      }
      return response;
    })
    .catch(function (error) {
      return error;
    });
}

export async function sms() {
  return await axios
    .post(authApiUrl + "/api/Auth/SMS", {
      UserName: localStorage.user,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}

export async function verifyCodeSMS(code) {
  return await axios
    .post(authApiUrl + "/api/Auth/VerifyCodeSMS", {
      code: code,
      userName: localStorage.user,
      password: localStorage.pass,
    })
    .then(function (response) {
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("access_token", response.data.access_Token);
      }
      return response;
    })
    .catch(function (error) {
      return error;
    });
}

export async function getUserInfo() {
  return await axios
    .get(authApiUrl + "/api/General/UserInfo", {
      headers: {
        Authorization: "Bearer " + localStorage.token,
      },
    })
    .then(function (response) {
      if (response.status === 200) {
        localStorage.setItem("names", response.data.names);
        localStorage.setItem("surNames", response.data.surNames);
        localStorage.setItem("UserName", response.data.userName);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("countryCode", response.data.countryCode);
        localStorage.setItem("phone", response.data.phone);
        localStorage.setItem("companyId", response.data.companyId);
        localStorage.setItem("company", response.data.company);
        localStorage.setItem("roleCompanyName", response.data.roleCompanyName);
        localStorage.setItem("displayWizard", response.data.displayWizard);
      }
      return response;
    })
    .catch(function (error) {
      return error;
    });
}

export async function logout() {
  localStorage.clear();
}
