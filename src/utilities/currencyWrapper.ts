/** @format */

import { Platform } from "react-native";

export function currencyWrapper(number?: number | undefined) {
  // if (Platform.OS === "ios") {
  //   return new Intl.NumberFormat("en-US", {
  //     style: "currency",
  //     currency: "NGN",
  //   }).format(number || 0);
  // } else {
  if (number) {
    return (
      "\u20A6" + number.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    );
  } else {
    return "\u20A6" + "0";
  }
  // }
}
