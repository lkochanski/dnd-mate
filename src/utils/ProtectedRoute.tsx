import React from 'react';
import {Navigate} from "react-router-dom";
import {UserAuth} from "../context/AuthContext";

const ProtectedRoute = ({children}: any) => {
  const { user }:any = UserAuth();

  if (!user) {
    return <Navigate to={'/sign-in'} />
  }

  return children
};

export default ProtectedRoute;
