import io, { Socket } from "socket.io-client";
import { create } from "zustand";

interface Store {
  connect: () => void;
  disconnect: () => void;
  socket: Socket | undefined;
}
const BASE_URL = `http://0.0.0.0:8000`;

const useSocket = create<Store>((set, get) => ({
  socket: undefined,
  connect: () => {
    const socket = io(BASE_URL, {
      reconnection: true,
      reconnectionDelay: 3000,
      reconnectionAttempts: 1000,
      autoConnect: true,
    });
    console.log(socket?.id);

    set({ socket });
  },
  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: undefined });
    }
  },
}));

export default useSocket;
