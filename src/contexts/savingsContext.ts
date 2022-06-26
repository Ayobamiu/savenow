/** @format */

import { createContext } from "react";
import { NewSavings } from "../interfaces";

export type GlobalContent = {
  mySavingsPlans: NewSavings[] | [];
  setMySavingsPlans: (c: NewSavings[] | []) => void;
};
const SavingContext = createContext<GlobalContent>({
  mySavingsPlans: [], // set a default value
  setMySavingsPlans: () => {},
});
export default SavingContext;
