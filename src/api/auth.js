/** @format */

import apiClientNotCached from "./clientNotCached";
import apiClient from "./client";
import storage from "../secure/storage";
import { urlInUse } from "../server/server";
const { default: axios } = require("axios");

const login = async (email, password) =>
  await axios.post(`${urlInUse}auth/login`, { email, password });
const signUp = async (data) =>
  axios.post(urlInUse + "auth/sign-up", { ...data });
const passordResetCode = async (data) =>
  axios.post(urlInUse + "auth/password-reset-code", { ...data });
const verify = async (data) =>
  axios.post(urlInUse + "auth/verification-code", { ...data });
const verifyTrip = async (data) =>
  axios.post(urlInUse + "trip/trip-otp", { ...data });
const sendEndTripOTP = async (data) =>
  axios.post(urlInUse + "trip/end-trip-otp", { ...data });
const changePassword = async (email, password) =>
  await axios.post(`${urlInUse}auth/change-password`, { email, password });

const logOut = async () => {
  const token = await storage.getToken();
  return await apiClient.post(
    "/auth/log-out-mobile",
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

// const updateProfile = (data) => apiClient.patch("/auth", { ...data });

const getUserProfile = async (userId) => {
  let data = {};
  let err = false;
  try {
    const result = await apiClientNotCached.get(`/auth/${userId}`);
    data = result?.data?.error ? [] : result.data;
  } catch (error) {
    if (error !== "") {
      err = true;
    }
  }
  return { error: err, data };
};

const updateProfile = async (formData) => {
  const token = await storage.getToken();
  let data = {};
  let err = false;
  try {
    const result = await apiClient.patch("/auth", formData, {
      headers: {
        Authorization: `${token}`,
      },
    });
    data = result?.data?.error ? [] : result.data;
  } catch (error) {
    if (error !== "") {
      err = true;
    }
  }
  return { error: err, data };
};
const updateProfileMedia = async (formData) => {
  const token = await storage.getToken();
  let data = {};
  let err = false;
  try {
    const result = await apiClientNotCached.post(
      "/auth/update-media",
      formData,
      {
        headers: {
          Authorization: token,
          "content-type": "multipart/form-data",
        },
      }
    );
    data = result?.data?.error ? [] : result.data;
  } catch (error) {
    if (error !== "") {
      err = true;
    }
  }
  return { error: err, data };
};

export default {
  login,
  signUp,
  updateProfile,
  updateProfileMedia,
  verify,
  verifyTrip,
  sendEndTripOTP,
  passordResetCode,
  changePassword,
  getUserProfile,
  logOut,
};
