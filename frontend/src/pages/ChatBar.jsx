import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

function ChatBar({ socket }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("newUserResponse", (user) => setUsers(user));
  }, [socket, users]);

  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>

      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {users.map((user) => (
            <p key={user.socketID}>
              {user.socketID === socket.id ? "You" : user.userName}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

ChatBar.propTypes = {
  socket: PropTypes.shape({
    on: PropTypes.func,
    id: PropTypes.string,
  }).isRequired,
};

export default ChatBar;
