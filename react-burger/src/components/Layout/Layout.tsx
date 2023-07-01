import React, { useEffect } from "react";
import { Outlet } from 'react-router-dom';
import AppHeader from "../AppHeader/AppHeader";
import { loadIngredients } from "../../utils/tools/storeTools";
import { login } from "../../services/slices/auth";
import style from "./Layout.module.css";
import { getUserProfile, checkRequestToken } from "../../utils/tools/userTools";
import { useAppDispatch } from "../../utils/tools/hooks";

export default function Layout() {
  const dispatch = useAppDispatch();

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
      // Запуск только при монтировании элемента
      // eslint-disable-next-line react-hooks/exhaustive-deps
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