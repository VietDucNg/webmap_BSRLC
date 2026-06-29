import { useState } from "react";
import { YearAContext } from "./YearAContext";

export function YearAContextProvider({ children }) {
  const [yearA, setYearA] = useState(2000);
  return <YearAContext value={{ yearA, setYearA }}>{children}</YearAContext>;
}
