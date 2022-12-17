import USER_SERVICE from "../services/userServ";

const checkLogin = (item, values) => {
  return item.findIndex(
    (data) => data.email === values.email && data.password === values.password
  );
};

const checkAdminInfo = async (values) => {
  return USER_SERVICE.getAllAdminInfo()
    .then((res) => {
      let findIdx = checkLogin(res, values);
      if (findIdx > -1) {
        return { ...res[findIdx], role: "admin" };
      }
      return {};
    })
    .catch((error) => {
      console.log(error);
    });
};

const checkUserInfo = async (values) => {
  return USER_SERVICE.getAllUserInfo()
    .then((res) => {
      let findIdx = checkLogin(res, values);
      if (findIdx > -1) {
        return { ...res[findIdx], role: "user" };
      }
      return {};
    })
    .catch((error) => {
      console.log(error);
    });
};

const checkMasterInfo = async (values) => {
  return USER_SERVICE.getAllMasterInfo()
    .then((res) => {
      let findIdx = checkLogin(res, values);
      if (findIdx > -1) {
        return { ...res[findIdx], role: "master" };
      }
      return {};
    })
    .catch((error) => {
      console.log(error);
    });
};

const checkAllInfo = async (values) => {
  let userData;
  userData = await checkAdminInfo(values);
  if (!Object.keys(userData).length) {
    userData = await checkUserInfo(values);
  }
  if (!Object.keys(userData).length) {
    userData = await checkMasterInfo(values);
  }

  return userData;
};

export { checkLogin, checkAllInfo };
