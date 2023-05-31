import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from 'react-router-dom';
import AppHeader from "../AppHeader/AppHeader";
import { loadIngredients } from "../../services/actions/ingredients";
import { loginUser } from "../../services/actions/auth";
import style from "./Layout.module.css";
import { getUserProfileWithCheck } from "../../utils/tools/userTools";

export default function Layout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadIngredients());
    getUserProfileWithCheck(dispatch)
      .then( (result) => {
        if (result) {
          dispatch(loginUser());
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