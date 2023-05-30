import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from 'react-router-dom';
import AppHeader from "../AppHeader/AppHeader";
import { loadIngredients } from "../../services/actions/ingredients";
import { getItemById, getIngredientsFromStore } from "../../utils/tools";
import { setSelectedIngredient } from "../../services/actions/ingredient";
import { loginUser } from "../../services/actions/auth";
import style from "./Layout.module.css";
import { getUserProfileWithCheck } from "../../utils/user";

export default function Layout() {
  const dispatch = useDispatch();
  const infredients = useSelector(getIngredientsFromStore);
  const { id } = useParams();

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

  useEffect(() => {
    if (id && infredients.length > 0) {
      dispatch(setSelectedIngredient(getItemById(id, infredients)));
    };
  }, [infredients]);

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