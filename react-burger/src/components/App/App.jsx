import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "../Layout/Layout";
import ConstructorPage from '../../pages/constructor/constructor';
import LoginPage from "../../pages/login/login";
import RegisterPage from "../../pages/register/register";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import ProfilePage from "../../pages/profile/profile";
import PageNotFoundPage from "../../pages/page-not-found/page-not-found";
import OnlyNoAuthRoute from "../Routes/OnlyNoAuthRoute";
import AuthRequiredRoute from "../Routes/AuthRequiredRoute";
import IngredientRoute from "../Routes/IngredientRoute";
import ProfileEditForm from "../Profile/ProfileEditForm/ProfileEditForm";
import OrdersPage from "../../pages/orders/orders";
import FeedPage from "../../pages/feed/feed";
import OrdersRoute from "../Routes/OrdersRoute";

export default function App () {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ConstructorPage />}/>
            <Route path="login" element={<OnlyNoAuthRoute element={<LoginPage />} />} />
            <Route path="register" element={<OnlyNoAuthRoute element={<RegisterPage />} />} />
            <Route path="forgot-password" element={<OnlyNoAuthRoute element={<ForgotPasswordPage />} />} />
            <Route path="reset-password" element={<OnlyNoAuthRoute element={<ResetPasswordPage />} />} />
            <Route path="profile" element={<AuthRequiredRoute element={<ProfilePage />} />}>
              <Route index element={<ProfileEditForm />}/>
              <Route path="orders" element={<AuthRequiredRoute element={<OrdersPage />} />} />
              <Route path="orders/:id" element={<OrdersRoute />}/>
            </Route>
            <Route path="ingredients/:id" element={<IngredientRoute />}/>
            <Route path="feed" element={<FeedPage />} />
            <Route path="feed/:id" element={<OrdersRoute />}/>
            <Route path="*" element={<PageNotFoundPage />}/>
          </Route>
        </Routes>
      </Router>
    </>
  );
};