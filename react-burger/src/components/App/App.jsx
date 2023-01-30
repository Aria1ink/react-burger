import React, { useState, useEffect } from "react";
import { IngredientsContext, CartContext } from "../../variables/context";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import style from "./App.module.css";
import {getIngredientsApi} from "../../utils/api";

export default function App () {
  const ingredientsState = useState([]);
  const cartState = useState([]);
  const [ingredients, setIngredients] = ingredientsState;

  useEffect(() => {
    getIngredientsApi()
      .then(
        (data) => {
          setIngredients(data.data);
        }
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!ingredients[0]) return (<div>Загрузка...</div>);

  return (
    <>
      <AppHeader />
      <main className={style.AppMain + " pb-10"}>
        <IngredientsContext.Provider value={ingredientsState}>
          <CartContext.Provider value={cartState}>
            <BurgerIngredients />
          </CartContext.Provider>
        </IngredientsContext.Provider>
        <IngredientsContext.Provider value={ingredientsState}>
          <CartContext.Provider value={cartState}>
            <BurgerConstructor />
          </CartContext.Provider>
        </IngredientsContext.Provider>
      </main>
      <footer></footer>
    </>
  );
};