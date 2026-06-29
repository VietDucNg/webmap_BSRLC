import { useMemo, useState } from "react";
import { OpacityContext } from "./OpacityContext";

export function OpacityContextProvider({ children }) {
  const [opacity, setOpacity] = useState(100);

  const value = useMemo(() => ({ opacity, setOpacity }), [opacity]);

  return (
    <OpacityContext.Provider value={value}>{children}</OpacityContext.Provider>
  );
}
