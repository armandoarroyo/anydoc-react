import { CollectionsOutlined } from "@mui/icons-material";
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
        sessionStorage.setItem("welcomeMessage", response.data.welcomeMessage);
      }
      return response;
    })
    .catch(function (error) {
      return error;
    });
}

export async function forgotPassword(userName) {
  return await axios
    .post(authApiUrl + "/api/Auth/ForgotPassword", {
      UserName: userName,
    })
    .then(function (response) {
      if (response.status === 200) {
        sessionStorage.setItem("UserName", userName);
      }

      return response;
    })
    .catch(function (error) {
      return error.response;
    });
}

export async function resetPasswordWithCode(newPassword, code) {
  const body = {
    UserName: sessionStorage.UserName,
    NewPassword: newPassword,
    ConfirmationCode: code,
  };
  return await axios
    .post(authApiUrl + "/api/Auth/ResetPasswordWithConfirmationCode", body, {})
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
}

export async function changePassword(oldPassword, password, confirmPassword) {
  const token = sessionStorage.token;
  const access_token = sessionStorage.access_token;
  const body = {
    OldPassword: oldPassword,
    Password: password,
    ConfirmPassword: confirmPassword,
    Token: access_token,
  };
  return await axios
    .post(authApiUrl + "/api/Auth/ChangePassword", body, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then(function (response) {
      if (response.status === 200) {
        sessionStorage.setItem("pass", password);
      }
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
}

export async function logout() {
  sessionStorage.clear();
}
