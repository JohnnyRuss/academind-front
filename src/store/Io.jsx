import { createContext, useState } from "react";
import { io } from "socket.io-client";

const initialState = {
  socket: null,
  connection: async () => {},
};

export const IoContext = createContext(initialState);

export const IoProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  async function establishIoConnection() {
    const socketIo = io("http://localhost:4000");
    setSocket(socketIo);
    return socketIo;
  }

  async function connection(activeUser) {
    try {
      const s = await establishIoConnection();
      s.emit("userConnection", activeUser);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <IoContext.Provider value={{ socket, connection }}>
      {children}
    </IoContext.Provider>
  );
};
