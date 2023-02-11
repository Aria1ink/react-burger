import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import style from "./App.module.css";
import { loadIngredients } from "../../services/actions/ingredients";

export default function App () {
  const dispatch = useDispatch();
  const status = useSelector(store => store.ingredients.status);

  useEffect(() => {
    dispatch(loadIngredients());
  }, []);

  if (status === 'loading') return (<div>Загрузка...</div>);
  if (status === 'failed') return (<div>Ошибка подключения к базе данных.</div>);

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