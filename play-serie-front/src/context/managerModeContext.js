import React from "react";
import { useState } from "react";
import { createContext } from "react";

export const ManagerContext = createContext(
  {
    setManagerMode: () => {},
  }
);

export const ManagerModeProvider = (props) => {
  const [managerMode, setManagerMode] = useState(false);
  return (
    <ManagerContext.Provider value={{managerMode, setManagerMode}}>
      {props.children}
    </ManagerContext.Provider>
  );
};
