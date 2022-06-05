import React from 'react';
import {UserAuth} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";

const DashboardPage = () => {
  const {user, logout}: any = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/sign-in");
    } catch(e: any) {
      console.log(e.message)
    }
  }

  return (
    <div>
      <h3>DashboardPage</h3>
      <h4>User Email: {user && user.email}</h4>
      <button onClick={handleLogout}>LogOut</button>
    </div>
  );
};

export default DashboardPage;
