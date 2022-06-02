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
        sessionStorage.setItem("user", user);
        sessionStorage.setItem("pass", pass);
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
      UserName: sessionStorage.user,
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
      userName: sessionStorage.user,
      password: sessionStorage.pass,
    })
    .then(function (response) {
      if (response.status === 200) {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("access_token", response.data.access_Token);
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
        Authorization: "Bearer " + sessionStorage.token,
      },
    })
    .then(function (response) {
      if (response.status === 200) {
        sessionStorage.setItem("names", response.data.names);
        sessionStorage.setItem("surNames", response.data.surNames);
        sessionStorage.setItem("UserName", response.data.userName);
        sessionStorage.setItem("email", response.data.email);
        sessionStorage.setItem("countryCode", response.data.countryCode);
        sessionStorage.setItem("phone", response.data.phone);
        sessionStorage.setItem("companyId", response.data.companyId);
        sessionStorage.setItem("company", response.data.company);
        sessionStorage.setItem(
          "roleCompanyName",
          response.data.roleCompanyName
        );
        sessionStorage.setItem("displayWizard", response.data.displayWizard);
      }
      return response;
    })
    .catch(function (error) {
      return error;
    });
}

export async function logout() {
  sessionStorage.clear();
}
