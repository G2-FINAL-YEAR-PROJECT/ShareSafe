import { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const HomeContext = createContext();

const HomeContextProvider = ({ children }) => {
  const { userData } = useAuth();
  const [msgLoading, setMsgLoading] = useState(true);
  const [messagesList, setMessagesList] = useState([]);

  // Establish socket connection
  const socket = io("https://share-safe-85lb.onrender.com");

  useEffect(() => {
    // Event listeners for various socket events
    socket.on("connect", () => {
      console.log("Connected to socket server");
      if (userData?.id) {
        socket.emit("activeUser", userData?.id); // Notify server about the active user
      }
    });

    socket.on(userData?.id, (data) => {
      console.log("Received message for:", [userData?.fullName, data]);
      // Handle the received message

      // Use the functional form of setMessagesList to correctly update the state
      setMessagesList((prevMessagesList) => [
        { ...data.message },
        ...prevMessagesList,
      ]);
    });

    // socket.on("activeUsersList", (activeUsers) => {
    //   console.log("Active_Users:", activeUsers);
    //   // Update active users list in your app
    // });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    return () => {
      socket.disconnect(); // Disconnect when component unmounts
    };
  }, []);

  return (
    <HomeContext.Provider
      value={{
        socket,
        messagesList,
        setMessagesList,
        msgLoading,
        setMsgLoading,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (!context)
    throw new Error(
      "useHomeContext must be used within the HomeContextProvider"
    );
  return context;
};

export { HomeContextProvider, useHomeContext };
