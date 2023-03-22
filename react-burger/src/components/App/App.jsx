import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppHeader from "../AppHeader/AppHeader";
import style from "./App.module.css";
import ConstructorPage from '../../pages/constructor/constructor';
import LoginPage from "../../pages/login/login";
import RegisterPage from "../../pages/register/register";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import ProfilePage from "../../pages/profile/profile";
import IngredientPage from "../../pages/ingredients/ingredients";
import PageNotFoundPage from "../../pages/page-not-found/page-not-found";

export default function App () {

  return (
    <>
      <AppHeader />
      <main className={style.AppMain + " pb-10"}>
      <Router>
        <Routes>
          <Route path="/" element={<ConstructorPage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/forgot-password" element={<ForgotPasswordPage />}/>
          <Route path="/reset-password" element={<ResetPasswordPage />}/>
        {/*
          <Route path="/profile" element={<ProfilePage />}/>
          <Route path="/ingredients/:id" element={<IngredientPage />}/>
        */}
          <Route path="*" element={<PageNotFoundPage />}/>
         </Routes>
      </Router>
      </main>
      <footer></footer>
    </>
  );
};