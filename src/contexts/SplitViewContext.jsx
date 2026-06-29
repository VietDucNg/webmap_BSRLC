import { createContext } from "react";

const SplitViewContext = createContext({
  isSplitMode: false,
  setIsSplitMode: () => {},
  dividerPosition: 0.5,
  setDividerPosition: () => {},
});

export default SplitViewContext;
