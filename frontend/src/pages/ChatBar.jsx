import React from "react";

function ChatBar() {
  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>

      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {Array.from([1, 2, 3, 4], (e) => (
            <p>User {e}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatBar;
