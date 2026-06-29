import { useState } from "react";
import { YearBContext } from "./YearBContext";

export default function YearBContextProvider({ children }) {
  const [yearB, setYearB] = useState(2022);

  return <YearBContext value={{ yearB, setYearB }}>{children}</YearBContext>;
}
