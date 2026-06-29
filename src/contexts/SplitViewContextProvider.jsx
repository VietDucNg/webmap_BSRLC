import { useMemo, useState } from "react";
import SplitViewContext from "./SplitViewContext";

export function SplitViewContextProvider({ children }) {
  const [isSplitMode, setIsSplitMode] = useState(false);
  const [dividerPosition, setDividerPosition] = useState(0.5);

  const value = useMemo(
    () => ({
      isSplitMode,
      setIsSplitMode,
      dividerPosition,
      setDividerPosition,
    }),
    [dividerPosition, isSplitMode],
  );

  return (
    <SplitViewContext.Provider value={value}>
      {children}
    </SplitViewContext.Provider>
  );
}
