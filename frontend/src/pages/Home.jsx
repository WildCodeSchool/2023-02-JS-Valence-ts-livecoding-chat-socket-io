/* eslint-disable react/forbid-prop-types */
import PropTypes from "prop-types";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../hooks/userContext";

export default function Home({ socket }) {
  const navigate = useNavigate();
  const { userName, setUserName } = useContext(userContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("newUser", { userName, socketID: socket.id });
    socket.emit("join", { userName });
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

Home.propTypes = {
  socket: PropTypes.shape({
    emit: PropTypes.func,
    id: PropTypes.string,
  }).isRequired,
};
