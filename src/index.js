import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Login from "./login";
import Twofa from "./twofa";
import Dashboard from "./dashboard";
import Profile from "./profile";
import Pending from "./pending";
import Completed from "./completed";
import ChangePassword from "./changePassword";
import ForgotPassword from "./forgotPassword";
import ForgotPasswordTwoFa from "./forgotPasswordTwoFa";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="twofa" element={<Twofa />} />
      <Route path="forgotPassword" element={<ForgotPassword />} />
      <Route path="forgotPasswordTwoFa" element={<ForgotPasswordTwoFa />} />
      <Route path="/" element={<App />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="pending" element={<Pending />} />
        <Route path="completed" element={<Completed />} />
        <Route path="change_password" element={<ChangePassword />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
