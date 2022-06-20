import React, { useContext, useState } from "react";

const AppContext = React.createContext();
export const AppProvider = ({ children }) => {
  const [actor, setActor] = useState({});
  return (
    <AppContext.Provider
      value={{
        actor,
        setActor,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => useContext(AppContext);
