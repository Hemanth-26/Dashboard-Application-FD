/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { GlobalContext, actions } from "./context";
import { PublicRoute } from "./routes";
import { PrivateRoute } from "./routes";
import PreLoginLayout from "./layout/PreLoginLayout";
import PostLoginLayout from "./layout/PostLoginLayout";
import Register from "./pages/Login/Register";
import Login from "./pages/Login/Login";
import VerifyOtp from "./pages/Login/VerifyOtp";
import ForgotPassword from "./pages/Login/ForgotPassword";
import VerifyOtpPassword from "./pages/Login/VerifyOtpPassword";
import ChangePassword from "./pages/Login/ChangePassword";
import Dashboard from "./pages/Dashbord/Dashboard";
import Todos from "./pages/Todos/Todos";
import GetTodos from "./pages/TodoLists/GetTodos";
import Profile from "./pages/Profile/Profile";
import { Loader } from "./components";

function App() {
  const {
    state: { showLoader },
    dispatch,
  } = useContext(GlobalContext);

  const storeHandler = (type, payload) => dispatch({ type, payload });
  let token = localStorage.getItem("authToken");

  const validateLogIn = () => {
    storeHandler(actions.LOG_IN, !!token);
  };

  useEffect(() => {
    validateLogIn();
  }, []);

  return (
    <>
      {showLoader && <Loader />}
      <div className="app-container d-flex flex-grow-1">
        <Routes>
          {/* <PublicRoute path="/" element={<Login />} /> */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            index
            exact
            path="/login"
            element={PublicRoute(Login, PreLoginLayout)}
          />
          <Route
            exact
            path="/register"
            element={PublicRoute(Register, PreLoginLayout)}
          />
          <Route
            exact
            path="verify-otp"
            element={PublicRoute(VerifyOtp, PreLoginLayout)}
          />
          <Route
            exact
            path="/forgot-password"
            element={PublicRoute(ForgotPassword, PreLoginLayout)}
          />
          <Route
            exact
            path="verify-otp-password"
            element={PublicRoute(VerifyOtpPassword, PreLoginLayout)}
          />
          <Route
            exact
            path="/change-password"
            element={PublicRoute(ChangePassword, PreLoginLayout)}
          />

          <Route
            exact
            path="/dashboard"
            element={PrivateRoute(Dashboard, PostLoginLayout)}
          />
          <Route
            exact
            path="/todos"
            element={PrivateRoute(Todos, PostLoginLayout)}
          />
          <Route
            exact
            path="/getTodos"
            element={PrivateRoute(GetTodos, PostLoginLayout)}
          />
          <Route
            exact
            path="/profile"
            element={PrivateRoute(Profile, PostLoginLayout)}
          />

          {/* <Route
          exact
          path="/nhub"
          element={PrivateRoute(Nhub, PostLoginLayout)}
        /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
