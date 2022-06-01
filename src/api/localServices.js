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
