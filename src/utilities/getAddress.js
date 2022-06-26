/** @format */

import axios from "axios";

export const getCountries = async () => {
  const response = await axios
    .get("https://api.countrystatecity.in/v1/countries", {
      headers: {
        "X-CSCAPI-KEY":
          "QzBObGZZM2x0bkpqb0ViNGZjSEJsazdMZGU1YTVhdmVYbzVlN3c1TQ==",
      },
    })
    .catch((error) => {});
  return response?.data || [];
};

export const getStates = async (iso2) => {
  const r = await axios
    .get(`https://api.countrystatecity.in/v1/countries/${iso2}/states`, {
      headers: {
        "X-CSCAPI-KEY":
          "QzBObGZZM2x0bkpqb0ViNGZjSEJsazdMZGU1YTVhdmVYbzVlN3c1TQ==",
      },
    })
    .catch((error) => {});
  return r ? r.data : [];
};
export const getCitiess = async (countryIso, stateIso) => {
  const r = await axios
    .get(
      `https://api.countrystatecity.in/v1/countries/${countryIso}/states/${stateIso}/cities`,
      {
        headers: {
          "X-CSCAPI-KEY":
            "QzBObGZZM2x0bkpqb0ViNGZjSEJsazdMZGU1YTVhdmVYbzVlN3c1TQ==",
        },
      }
    )
    .catch((error) => {});
  return r ? r.data : [];
};
