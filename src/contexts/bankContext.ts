/** @format */

import { createContext } from "react";
import { BankRecord } from "../interfaces";

export type GlobalContent = {
  myBanks: BankRecord[] | [];
  setMyBanks: (c: BankRecord[] | []) => void;
};
const BankContext = createContext<GlobalContent>({
  myBanks: [], // set a default value
  setMyBanks: () => {},
});
export default BankContext;
