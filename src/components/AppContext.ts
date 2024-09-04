import { createContext } from "react";
interface AppContextInterface {
  role: string;
  setAppRole: (role: string) => void;
}
const AppContext = createContext<AppContextInterface>(undefined);

export default AppContext;
