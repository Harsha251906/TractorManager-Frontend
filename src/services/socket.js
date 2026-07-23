import { io } from "socket.io-client";

const socket = io("https://tractormanager-backend.onrender.com", {

    transports: ["websocket"],

    autoConnect: true

});

// Join logged-in user's room

export const connectUser = (userId) => {

    if (!userId) return;

    socket.emit("join", userId);

};

// Disconnect socket

export const disconnectSocket = () => {

    socket.disconnect();

};

// Export socket instance

export default socket;