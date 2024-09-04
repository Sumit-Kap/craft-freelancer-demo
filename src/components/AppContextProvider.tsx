import { FC, useState } from "react";
import AppContext from "./AppContext";

const AppContextProvider: FC<React.PropsWithChildren> = ({ children }) => {
  const [role, setRole] = useState("");
  const setAppRole = (appRole: string) => {
    setRole(appRole);
  };
  console.log("role testing", role);
  return (
    <AppContext.Provider value={{ role, setAppRole }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
