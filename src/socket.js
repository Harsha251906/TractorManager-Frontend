import { io } from "socket.io-client";

const socket = io("https://tractormanager-backend.onrender.com", {
    autoConnect: false,
    transports: ["websocket"]
});

export default socket;