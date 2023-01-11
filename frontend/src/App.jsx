import socketIO from "socket.io-client";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ChatPage from "./components/ChatPage";
import "./App.css";

const socket = socketIO.connect("http://localhost:3000");

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home socket={socket} />} />
      <Route path="/chat" element={<ChatPage socket={socket} />} />
    </Routes>
  );
}

export default App;
