import axios from "axios";
const authApiUrl =
  "https://pad2zt6ubf.execute-api.us-east-1.amazonaws.com/Prod";

export async function authHeader() {
  const user = sessionStorage.getItem("user");
  if (user && sessionStorage.token) {
    return {
      Authorization: "Bearer " + sessionStorage.token,
    };
  } else {
    return {};
  }
}

export async function userInformation() {
  const user = sessionStorage.getItem("user");
  if (user && sessionStorage.token) {
    return {
      names: sessionStorage.names,
      surNames: sessionStorage.surNames,
      email: sessionStorage.email,
      countryCode: sessionStorage.countryCode,
      phone: sessionStorage.phone,
      CompanyId: sessionStorage.CompanyId,
      company: sessionStorage.company,
      roleCompanyName: sessionStorage.roleCompanyName,
      welcomeMessage: sessionStorage.welcomeMessage,
      //display wizard
    };
  } else {
    return {};
  }
}

export async function changeInformation(
  names,
  surName,
  phoneCode,
  phoneNumber
) {
  const url = authApiUrl + "/api/General/ChangeInformation";
  const body = {
    names: names,
    surName: surName,
    PhoneCode: phoneCode,
    PhoneNumber: phoneNumber,
  };
  const headers = {
    Authorization: "Bearer " + sessionStorage.token,
  };
  return await axios
    .put(url, body, { headers })
    .then(function (response) {
      if (response.status === 200) {
        sessionStorage.setItem("countryCode", phoneCode);
        sessionStorage.setItem("phone", phoneNumber);
        sessionStorage.setItem("names", names);
        sessionStorage.setItem("surName", surName);
      }
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
}

export async function AllowedUploadExtensionFile() {
  const url = authApiUrl + "/api/General/AllowedUploadExtensionFile";
  const headers = {
    Authorization: "Bearer " + sessionStorage.token,
  };
  return await axios
    .get(url, { headers })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}

export async function GetDocuments() {
  const url = authApiUrl + "api/Document/GetDocuments";
  const headers = {
    Authorization: "Bearer " + sessionStorage.token,
  };
  return await axios
    .get(url, { headers })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}

export async function GetDocumentsCompleted() {
  const url = authApiUrl + "api/Document/GetDocumentsCompleted";
  const headers = {
    Authorization: "Bearer " + sessionStorage.token,
  };
  return await axios
    .get(url, { headers })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}

export async function GetDocumentsPending() {
  const url = authApiUrl + "api/Document/GetDocumentsPending";
  const headers = {
    Authorization: "Bearer " + sessionStorage.token,
  };
  return await axios
    .get(url, { headers })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}
