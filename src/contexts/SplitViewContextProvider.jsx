import { useMemo, useState } from "react";
import SplitViewContext from "./SplitViewContext";

export function SplitViewContextProvider({ children }) {
  const [isSplitMode, setIsSplitMode] = useState(false);
  const [dividerPosition, setDividerPosition] = useState(0.5);
  const splitViewValue = useMemo(
    () => ({ isSplitMode, setIsSplitMode }),
    [isSplitMode],
  );
  const dividerPositionValue = useMemo(
    () => ({
      dividerPosition,
      setDividerPosition,
    }),
    [dividerPosition],
  );

  return (
    <SplitViewContext value={{ splitViewValue, dividerPositionValue }}>
      {children}
    </SplitViewContext>
  );
}
