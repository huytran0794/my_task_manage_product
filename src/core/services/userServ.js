import { AXIOS_INSTANCE_GENERATOR, BASE_USER_URL } from "./configURL";

const USER_SERVICE = {
  getAdminInfo: async () => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).get(`/admin`);
    return data;
  },
  getUserInfo: async () => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).get(`/users`);
    return data;
  },
  addUserInfo: async (newData) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).post(
      `/users`,
      newData
    );
    return data;
  },

  deleteUser: async (userId) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).delete(
      `/users/${userId}`
    );
    return data;
  },
  updateUser: async (userId, newData) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).put(
      `/users/${userId}`,
      newData
    );
    return data;
  },

  getSingleUserInfo: async (id) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).get(
      `/users/${id}`
    );
    return data;
  },

  // check when login
  getAllAdminInfo: async () => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).get(`/admin`);
    return data;
  },
  getAllUserInfo: async () => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).get(`/users`);
    return data;
  },
  getAllMasterInfo: async () => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).get(`/master`);
    return data;
  },
};

export default USER_SERVICE;
