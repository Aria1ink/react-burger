import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import style from "./App.module.css";
import { loadIngredients } from "../../utils/tools";

export default function App () {
  const dispatch = useDispatch();
  const ingredients = useSelector(store => store.ingredients.ingredients);

  useEffect(() => {
    dispatch(loadIngredients());
  }, []);

  if (!ingredients[0]) return (<div>Загрузка...</div>);

  return (
    <>
      <AppHeader />
      <main className={style.AppMain + " pb-10"}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
      <footer></footer>
    </>
  );
};