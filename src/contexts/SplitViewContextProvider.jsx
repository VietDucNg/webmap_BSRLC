import { useMemo, useState } from "react";
import SplitViewContext from "./SplitViewContext";

export function SplitViewContextProvider({ children }) {
  const [isSplitMode, setIsSplitMode] = useState(false);
  const splitViewValue = useMemo(
    () => ({ isSplitMode, setIsSplitMode }),
    [isSplitMode],
  );

  return <SplitViewContext value={splitViewValue}>{children}</SplitViewContext>;
}
