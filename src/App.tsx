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

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <CssBaseline/>
        <Routes>
          <Route path="/" element={<ProtectedRoute><DashboardPage/></ProtectedRoute>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/sign-in" element={<SignInPage/>}/>
          <Route path="/recover-password" element={<RecoverPasswordPage/>}/>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
