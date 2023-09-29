"use client";

import { io } from "socket.io-client";

import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3000");

const Message = () => {
  const [messgae, setMessage] = useState([]);

  useEffect(() => {
    const messageHandler = (recivedMessgae) => {
      setMessage((message) => [...message, recivedMessgae]);
    };
    socket.on("messageQueue", messageHandler);

    return () => socket.off("messageQueue", messageHandler);
  }, []);

  return (
    <>
      {messgae.map((message, idx) => {
        return (
          <div
            className={`${idx % 2 === 0 ? "bg-gray-100" : "bg-neutral-300"}`}
            key={idx}
          >
            {message}
          </div>
        );
      })}
    </>
  );
};

export default Message;
