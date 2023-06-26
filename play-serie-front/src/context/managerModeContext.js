import { useState, createContext, useContext } from "react";

const ManagerContext = createContext(null);

export function ManagerModeProvider({ children }) {
  const [managerMode, setManagerMode] = useState(false);
  const value = { managerMode, setManagerMode };

  return (<ManagerContext.Provider value={value}>{children}</ManagerContext.Provider>);
};

export function useManagerMode() {
  return useContext(ManagerContext);
}
