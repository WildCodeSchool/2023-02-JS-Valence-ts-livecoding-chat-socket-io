/* eslint-disable react/no-array-index-key */
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ChatBody({ socket }) {
  const navigate = useNavigate();
  const [chatMessages, setChatMessages] = useState([]);

  const handleLeaveChat = () => {
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    socket.on("newMessage", (messages) => {
      setChatMessages([...chatMessages, messages]);
    });
  }, [chatMessages]);

  return (
    <>
      <header className="chat__mainHeader">
        <p>Workshop socket.io</p>
        <button
          type="button"
          className="leaveChat__btn"
          onClick={handleLeaveChat}
        >
          LEAVE CHAT
        </button>
      </header>

      {/* message envoyé par vous */}
      <div className="message__container">
        {chatMessages.map((message, index) =>
          message.socketID === socket.id ? (
            <div className="message__chats" key={index}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.message}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats">
              <p>{message.userName}</p>
              <div className="message__recipient">
                <p>{message.message}</p>
              </div>
            </div>
          )
        )}

        {/* message reçu par vous */}

        {/* Quand je tape un message */}
        <div className="message__status">
          <p>Someone is typing...</p>
        </div>
      </div>
    </>
  );
}

ChatBody.propTypes = {
  socket: PropTypes.shape({
    id: PropTypes.string,
    on: PropTypes.func,
  }).isRequired,
};

export default ChatBody;
