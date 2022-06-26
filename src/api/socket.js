/** @format */

import SocketIOClient from "socket.io-client";
import { urlInUse } from "../server/server";

const socket = SocketIOClient(urlInUse, {
  transports: ["websocket"],
});

export default socket;
