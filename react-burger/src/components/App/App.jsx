import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "../Layout/Layout";
import ConstructorPage from '../../pages/constructor/constructor';
import LoginPage from "../../pages/login/login";
import RegisterPage from "../../pages/register/register";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import ProfilePage from "../../pages/profile/profile";
import IngredientPage from "../../pages/ingredients/ingredients";
import PageNotFoundPage from "../../pages/page-not-found/page-not-found";
import OnlyNoAuthRoute from "../Routes/OnlyNoAuthRoute";
import AuthRequiredRoute from "../Routes/AuthRequiredRoute";
import IngredientRoute from "../Routes/IngredientRoute";

export default function App () {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ConstructorPage />}/>
            <Route path="login" element={<OnlyNoAuthRoute element={<LoginPage />} />} />
            <Route path="register"  element={<OnlyNoAuthRoute element={<RegisterPage />} />} />
            <Route path="forgot-password"  element={<OnlyNoAuthRoute element={<ForgotPasswordPage />} />} />
            <Route path="reset-password"  element={<OnlyNoAuthRoute element={<ResetPasswordPage />} />} />
            <Route path="profile"  element={<AuthRequiredRoute element={<ProfilePage />} />} />
            <Route path="ingredients/:id" element={<IngredientRoute />}/>
            <Route path="*" element={<PageNotFoundPage />}/>
          </Route>
        </Routes>
      </Router>
    </>
  );
};