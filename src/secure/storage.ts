/** @format */

import jwt_decode from "jwt-decode";
import { User } from "../interfaces";
import { remove } from "./cache";
import AsyncStorage from "@react-native-async-storage/async-storage";


const key = "ripplesAuthToken";
async function storeAuthToken(ripplesAuthToken: string) {
  try {
    await AsyncStorage.setItem(key, ripplesAuthToken);
  } catch (error) {
    console.warn("Error storing ripplesAuthToken", error);
  }
}
async function storeUser(user: User) {
  try {
    await AsyncStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.warn("Error storing user", error);
  }
}

async function getToken() {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.warn("Error getting ripplesAuthToken");
  }
}
async function getUser(): Promise<User> {
  const user = await AsyncStorage.getItem("user");

  return new Promise<User>((resolve, reject) => {
    if (user) {
      resolve(JSON.parse(user));
    } else {
      reject(null);
    }
  });
}

async function removeToken() {
  try {
    await AsyncStorage.removeItem(key);
    await AsyncStorage.removeItem("user");
  } catch (error) {
    console.warn("Error removing ripplesAuthToken");
  }
}

export default {
  storeAuthToken,
  getToken,
  removeToken,
  getUser,
  storeUser,
};
