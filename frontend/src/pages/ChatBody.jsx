/* eslint-disable react/forbid-prop-types */
import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";

function ChatBody({ messages, socket, lastMessageRef, typingStatus }) {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

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

      {/* This shows messages sent from you */}
      <div className="message__container">
        {messages.map((message) =>
          message.socketID === socket.id ? (
            <div key={message.id} className="message__chats">
              <p className="sender__name">
                {message.welcome ? message.welcome : "You"}
              </p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div key={message.id} className="message__chats">
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        <div className="message__status">
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} />
      </div>
    </>
  );
}

ChatBody.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      name: PropTypes.string,
      id: PropTypes.string,
      socketID: PropTypes.string,
    })
  ).isRequired,
  socket: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  lastMessageRef: PropTypes.object.isRequired,
  typingStatus: PropTypes.string.isRequired,
};

export default ChatBody;
