import React, {createContext, useContext, useMemo, useState} from "react";
import {createTheme, ThemeProvider} from "@mui/material";
import {lightTheme} from "../themes/lightTheme";
import {darkTheme} from "../themes/darkTheme";

interface IThemeContext {
  toggleThemeMode: () => void;
  mode: "dark" | "light";
}

export const ThemeContext = createContext<IThemeContext>({
  toggleThemeMode: () => {},
  mode: "light"

})

export const ThemeContextProvider = ({children}: any) => {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const themeMode = useMemo(
    () => ({
      toggleThemeMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode,
    }),[mode]);

  const theme = useMemo(
    () => createTheme({
      palette: {
        mode,
        ...(mode === "light" ? lightTheme : darkTheme),
      }
    }),[mode]);

  return (
    <ThemeContext.Provider value={themeMode}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useThemeMode = () => useContext(ThemeContext);
