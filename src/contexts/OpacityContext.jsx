import { createContext } from "react";

export const OpacityContext = createContext({
  opacity: 100,
  setOpacity: () => {},
});
