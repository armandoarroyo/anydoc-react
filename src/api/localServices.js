import axios from "axios";
const authApiUrl =
  "https://pad2zt6ubf.execute-api.us-east-1.amazonaws.com/Prod";

export async function authHeader() {
  const user = localStorage.getItem("user");
  if (user && localStorage.token) {
    return {
      Authorization: "Bearer " + localStorage.token,
    };
  } else {
    return {};
  }
}
export async function changeInformation(phoneCode, phoneNumber) {
  const url = authApiUrl + "/api/General/ChangeInformation";
  const body = {
    PhoneCode: phoneCode,
    PhoneNumber: phoneNumber,
  };
  const headers = {
    Authorization: "Bearer " + localStorage.token,
  };
  return await axios
    .put(url, body, { headers })
    .then(function (response) {
      if (response.status === 200) {
        localStorage.setItem("countryCode", phoneCode);
        localStorage.setItem("phone", phoneNumber);
      }
      return response;
    })
    .catch(function (error) {
      return error;
    });
}

export async function userInformation() {
  const user = localStorage.getItem("user");
  if (user && localStorage.token) {
    return {
      names: localStorage.names,
      surNames: localStorage.surNames,
      email: localStorage.email,
      countryCode: localStorage.countryCode,
      phone: localStorage.phone,
      CompanyId: localStorage.CompanyId,
      company: localStorage.company,
      roleCompanyName: localStorage.roleCompanyName,
      //display wizard
    };
  } else {
    return {};
  }
}
