import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../hooks/userContext";

function ChatFooter({ socket, setTypingStatus }) {
  let timeOut;

  const [message, setMessage] = useState("");
  const { userName } = useContext(userContext);

  useEffect(() => {
    socket.on("isTyping", (data) => setTypingStatus(data));
  }, [socket]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && userName) {
      socket.emit("message", {
        text: message,
        name: userName,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
      setMessage("");
    }
  };

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      clearTimeout(timeOut);
      handleSendMessage(e);
    } else {
      socket.emit("typing", { userName, typing: true });
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        socket.emit("typing", { typing: false });
      }, 3000);
    }
  };

  return (
    <div className="chat__footer">
      <div className="form">
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => handleKeypress(e)}
        />
        <button type="button" className="sendBtn" onClick={handleSendMessage}>
          SEND
        </button>
      </div>
    </div>
  );
}

ChatFooter.propTypes = {
  socket: PropTypes.shape({
    emit: PropTypes.func,
    on: PropTypes.func,
    id: PropTypes.string,
  }).isRequired,
  setTypingStatus: PropTypes.func.isRequired,
};

export default ChatFooter;
