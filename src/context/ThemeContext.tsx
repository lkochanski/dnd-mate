import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import {createTheme, PaletteMode, ThemeProvider} from "@mui/material";
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

  const getLocalStorageTheme = () => {
    const localStorageTheme = localStorage.getItem("theme-setting")

    if (localStorageTheme) {
      return JSON.parse(localStorageTheme);
    } else {
      return "light";
    }
  }

  const [mode, setMode] = useState<PaletteMode>(getLocalStorageTheme());

  useEffect(() => {
    const localStorageTheme = localStorage.getItem("theme-setting");

    if (localStorageTheme) {
      const parsedLocalStorageTheme = JSON.parse(localStorageTheme);
      console.log("localStorageTheme");
      console.log(typeof localStorageTheme);
      console.log(typeof parsedLocalStorageTheme);

      setMode(parsedLocalStorageTheme);
    } else {
      setMode("light");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme-setting', JSON.stringify(mode));
  },[mode]);


  const themeMode = useMemo(
    () => ({
      toggleThemeMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
        localStorage.setItem('theme-setting', JSON.stringify(mode === "light" ? "dark" : "light"));
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
