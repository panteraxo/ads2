import React, { createContext, useState, useContext } from "react";

export const Context = createContext({});

export const useUser = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useUser debe ser usado dentro de UserProvider");
  }
  return context;
};

export default function UserProvider({ children }) {
  const [jwt, setJWT] = useState(() => window.sessionStorage.getItem("jwt"));
  const [id, setId] = useState(() => window.sessionStorage.getItem("id"));
  const [rol, setRol] = useState(() => window.sessionStorage.getItem("rol"));
  const [username, setUsername] = useState(() =>
    window.sessionStorage.getItem("username")
  );

  return (
    <Context.Provider
      value={{
        jwt,
        setJWT,
        id,
        setId,
        rol,
        setRol,
        username,
        setUsername,
      }}
    >
      {children}
    </Context.Provider>
  );
}
