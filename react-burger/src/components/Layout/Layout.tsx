import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from 'react-router-dom';
import AppHeader from "../AppHeader/AppHeader";
import { loadIngredients } from "../../utils/tools/storeTools";
import { login } from "../../services/slices/auth";
import style from "./Layout.module.css";
import { getUserProfile, checkRequestToken } from "../../utils/tools/userTools";
import { AppDispatch } from "../../services/store";

export default function Layout() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadIngredients());
    checkRequestToken(getUserProfile, dispatch)
      .then( (result) => {
        if (result) {
          dispatch(login());
        }
      })
      .catch( (err) => {
        console.log(err);
      })
  }, []);

  return (
    <>
      <AppHeader />
      <main className={style.AppMain + " pb-10"}>
        <Outlet />
      </main>
      <footer></footer>
    </>
  )
}