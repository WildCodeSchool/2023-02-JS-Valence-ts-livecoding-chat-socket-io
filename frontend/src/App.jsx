import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ChatPage from "./components/ChatPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  );
}

export default App;
