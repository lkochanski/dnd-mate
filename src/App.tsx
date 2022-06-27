import React from 'react';
import {Routes, Route} from "react-router-dom";
import './App.css';
import DashboardPage from "./pages/dashboardPage/DashboardPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import {AuthContextProvider} from "./context/AuthContext";
import SignInPage from "./pages/signInPage/SignInPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import {CssBaseline} from "@mui/material";
import './i18n';
import RecoverPasswordPage from "./pages/recoverPasswordPage/RecoverPasswordPage";
import {ThemeContextProvider} from "./context/ThemeContext";
import CharactersPage from "./pages/charactersPage/CharactersPage";
import InventoryPage from "./pages/inventoryPage/InventoryPage";
import JournalsPage from "./pages/journalsPage/JournalsPage";
import MonsterManualPage from "./pages/monsterManualPage/MonsterManualPage";
import MyFavoritesPage from "./pages/myFavoritesPage/MyFavoritesPage";
import NotesPage from "./pages/notesPage/NotesPage";
import SpellsPage from "./pages/spellsPage/SpellsPage";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <ThemeContextProvider>
          <CssBaseline/>
          <Routes>
            <Route path="/" element={<ProtectedRoute><DashboardPage/></ProtectedRoute>}/>
            <Route path="/characters" element={<ProtectedRoute><CharactersPage/></ProtectedRoute>}/>
            <Route path="/spells" element={<ProtectedRoute><SpellsPage/></ProtectedRoute>}/>
            <Route path="/inventory" element={<ProtectedRoute><InventoryPage/></ProtectedRoute>}/>
            <Route path="/journals" element={<ProtectedRoute><JournalsPage/></ProtectedRoute>}/>
            <Route path="/monster-manual" element={<ProtectedRoute><MonsterManualPage/></ProtectedRoute>}/>
            <Route path="/my-favorites" element={<ProtectedRoute><MyFavoritesPage/></ProtectedRoute>}/>
            <Route path="/notes" element={<ProtectedRoute><NotesPage/></ProtectedRoute>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/sign-in" element={<SignInPage/>}/>
            <Route path="/recover-password" element={<RecoverPasswordPage/>}/>
          </Routes>
        </ThemeContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
