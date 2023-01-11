/* eslint-disable react/forbid-prop-types */
import PropTypes from "prop-types";
import { createContext, useMemo, useState } from "react";

export const userContext = createContext();

function UserProvider({ children }) {
  const [userName, setUserName] = useState("");

  const value = useMemo(() => ({ userName, setUserName }));

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
}

UserProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export default UserProvider;
