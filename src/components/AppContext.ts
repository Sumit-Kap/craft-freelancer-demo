import { createContext } from "react";
interface AppContextInterface {
  role: string;
  setAppRole: (role: string) => void;
}
const AppContext = createContext<AppContextInterface>({
  role: "",
  setAppRole: () => {},
});

export default AppContext;
