import axios from "axios";
import { getUserInfo } from "./localServices";
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
export async function RefreshToken() {
  return await axios
    .post(authApiUrl + "/api/Auth/RefreshToken", {
      UserName: sessionStorage.user,
      RefreshToken: sessionStorage.refresh_Token,
    })
    .then(function (response) {
      console.log(response.data);
      if (response.status === 200) {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("access_token", response.data.access_Token);
        sessionStorage.setItem("refresh_token", response.data.refreshToken);
      }
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
        sessionStorage.setItem("refresh_token", response.data.refreshToken);
        sessionStorage.setItem("expires_in", response.data.expiresIn);
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
