/** @format */

import { createContext } from "react";
import { User } from "../interfaces";

export type GlobalContent = {
  user: User | null;
  setUser: (c: User | null) => void;
};
const AuthContext = createContext<GlobalContent>({
  user: null, // set a default value
  setUser: () => {},
});
export default AuthContext;
