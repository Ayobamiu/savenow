/** @format */

const { default: axios } = require("axios");
import storage from "../secure/storage";
import { urlInUse } from "../server/server";

const register = async (expoPushToken) => {
  const token = await storage.getToken();
  if (token) {
    const re = await axios.post(
      urlInUse + "auth/expoPushToken",
      { expoPushToken },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
};

export default { register };
