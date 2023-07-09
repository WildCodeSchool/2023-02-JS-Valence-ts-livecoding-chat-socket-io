/* eslint-disable react/forbid-prop-types */
import PropTypes from "prop-types";
import React, { useEffect, useState, useRef } from "react";
import ChatBar from "../pages/ChatBar";
import ChatBody from "../pages/ChatBody";
import ChatFooter from "../pages/ChatFooter";

function ChatPage({ socket }) {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef(null);

  useEffect(() => {
    socket.on("welcome", (message) => {
      setMessages((old) => [...old, message]);
    });

    socket.on("messageResponse", (message) => {
      setMessages((old) => [...old, message]);
    });
  }, [socket]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody
          messages={messages}
          socket={socket}
          typingStatus={typingStatus}
          lastMessageRef={lastMessageRef}
        />
        <ChatFooter socket={socket} setTypingStatus={setTypingStatus} />
      </div>
    </div>
  );
}

ChatPage.propTypes = {
  socket: PropTypes.object.isRequired,
};

export default ChatPage;
