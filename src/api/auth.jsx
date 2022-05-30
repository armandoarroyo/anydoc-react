import axios from "axios";

const authApiUrl =
  "https://pad2zt6ubf.execute-api.us-east-1.amazonaws.com/Prod";

export async function login(user, pass) {
  console.log("here " + user);
  return await axios
    .post(authApiUrl + "/api/Auth/Login", {
      UserName: user,
      Password: pass,
    })
    .then(function (response) {
      console.log(response.status);
      return response;
    })
    .catch(function (error) {
      return error;
    });
}

export async function sms(user) {
  return await axios
    .post(authApiUrl + "/api/Auth/SMS", {
      UserName: user,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}

export async function verifyCodeSMS(code, user, pass) {
  return await axios
    .post(authApiUrl + "/api/Auth/VerifyCodeSMS", {
      code: code,
      userName: user,
      password: pass,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}
