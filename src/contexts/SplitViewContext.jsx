import { createContext } from "react";

const SplitViewContext = createContext({
  isSplitMode: false,
  setIsSplitMode: () => {},
});

export default SplitViewContext;
