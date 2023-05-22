import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from 'react-router-dom';
import AppHeader from "../AppHeader/AppHeader";
import Preloader from "../../components/Preloader/Preloader";
import { loadIngredients } from "../../services/actions/ingredients";
import { loadIngredientsStatus, getIngredientById, getIngredientsFromStore } from "../../utils/tools";
import { setSelectedIngredient } from "../../services/actions/ingredient";
import style from "./Layout.module.css";
import { getUserProfile } from "../../utils/user";

export default function Layout() {
  const dispatch = useDispatch();
  const infredients = useSelector(getIngredientsFromStore);
  const { id } = useParams();

  useEffect(() => {
    dispatch(loadIngredients());
    // getUserProfile(dispatch);
    //signUp({email: 'gfgfjtjjfd66fsgе@ya.ru', password: 'bhjwgjeygrjywger', name: 'Pixel'}, dispatch);
  }, []);

  useEffect(() => {
    if (id !== null && infredients.length > 0) {
      dispatch(setSelectedIngredient(getIngredientById(id, infredients)));
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