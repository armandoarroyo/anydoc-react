import axios from "axios";
import { RefreshToken } from "./auth";
const authApiUrl =
  "https://pad2zt6ubf.execute-api.us-east-1.amazonaws.com/Prod";

const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const access_token = await RefreshToken();

      return access_token;
    }
    return Promise.reject(error);
  }
);

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
  return await axiosApiInstance
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
  return await axiosApiInstance
    .get(url, { headers })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
}

export async function GetDocuments() {
  const url = authApiUrl + "/api/Document/GetDocuments";
  const headers = {
    Authorization: "Bearer " + sessionStorage.token,
  };
  return await axiosApiInstance
    .get(url, { headers })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}

export async function GetDocumentsCompleted() {
  const url = authApiUrl + "/api/Document/GetDocumentsCompleted";
  const headers = {
    Authorization: "Bearer " + sessionStorage.token,
  };
  return await axiosApiInstance
    .get(url, { headers })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
}

export async function GetDocumentDetail(id) {
  const url = authApiUrl + "/api/Document/GetDocumentDetail/" + id;
  const headers = {
    Authorization: "Bearer " + sessionStorage.token,
  };
  return await axiosApiInstance
    .get(url, { headers })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
}
export async function GetImageDetail(id) {
  const url = authApiUrl + "/api/Document/GetImageDetail/" + id;
  const headers = {
    Authorization: "Bearer " + sessionStorage.token,
  };
  return await axiosApiInstance
    .get(url, { headers })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
}

export async function GetDocumentsPending() {
  const url = authApiUrl + "/api/Document/GetDocumentsPending";
  const headers = {
    Authorization: "Bearer " + sessionStorage.token,
  };
  return await axiosApiInstance
    .get(url, { headers })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
}

export async function AvailableCredit() {
  const url = authApiUrl + "/api/Dashboard/AvailableCredit";
  const headers = {
    Authorization: "Bearer " + sessionStorage.token,
  };
  return await axiosApiInstance
    .get(url, { headers })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
}

export async function UploadDocument(fileName, fileType, fileTypeId) {
  const url = authApiUrl + "/api/Document/UploadDocument";
  const headers = {
    Authorization: "Bearer " + sessionStorage.token,
  };
  const body = {
    DocumentTypeId: fileTypeId,
    FileName: fileName,
    FilePath: fileType + "/" + fileName,
  };
  return await axiosApiInstance
    .post(url, body, { headers })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
}

export async function QtyProcessedDocuments() {
  const url = authApiUrl + "/api/Dashboard/QtyProcesedDocuments";
  const headers = {
    Authorization: "Bearer " + sessionStorage.token,
  };
  const body = {
    StartDate: "2022-01-01",
    EndDate: "2022-12-31",
  };
  return await axiosApiInstance
    .post(url, body, { headers })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
}

export async function getUserInfo() {
  return await axiosApiInstance
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
        getConfiguration();
      }
      return response;
    })
    .catch(function (error) {
      return error;
    });
}

export async function getConfiguration() {
  const url = authApiUrl + "/api/General/GetCognitoConfiguration";
  const headers = {
    Authorization: "Bearer " + sessionStorage.token,
  };
  return await axiosApiInstance
    .get(url, { headers })
    .then(function (response) {
      if (response.status === 200) {
        console.log(response);
        sessionStorage.setItem("bucketName", response.data.bucketName);
        sessionStorage.setItem("bucketRegion", response.data.bucketRegion);
        sessionStorage.setItem("identityPoolId", response.data.identityPoolId);
        sessionStorage.setItem("providerName", response.data.providerName);
        sessionStorage.setItem("poolId", response.data.poolId);
        sessionStorage.setItem("companyName", response.data.companyName);
      }
      return response;
    })
    .catch(function (error) {
      return error;
    });
}
