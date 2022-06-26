/** @format */

const socketClient = require("socket.io-client");
const { urlInUse } = require("./server");

const socket = socketClient(urlInUse);

export default socket;
