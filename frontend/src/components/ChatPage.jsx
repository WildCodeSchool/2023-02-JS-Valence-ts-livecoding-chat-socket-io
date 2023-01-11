import React from "react";
import ChatBar from "../pages/ChatBar";
import ChatBody from "../pages/ChatBody";
import ChatFooter from "../pages/ChatFooter";

function ChatPage() {
  return (
    <div className="chat">
      <ChatBar />
      <div className="chat__main">
        <ChatBody />
        <ChatFooter />
      </div>
    </div>
  );
}

export default ChatPage;
