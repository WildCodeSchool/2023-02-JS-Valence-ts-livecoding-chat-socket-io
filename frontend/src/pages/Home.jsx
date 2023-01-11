import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../hooks/userContext";

export default function Home() {
  const navigate = useNavigate();
  const { userName, setUserName } = useContext(userContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/chat");
  };
  return (
    <form className="home__container">
      <h2 className="home__header">Sign in to the chat room</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        className="username__input"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button type="button" className="home__cta" onClick={handleSubmit}>
        SIGN IN
      </button>
    </form>
  );
}
