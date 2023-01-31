import React, { useState, useEffect } from "react";
import { IngredientsContext, CartContext } from "../../services/context";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import style from "./App.module.css";
import {getIngredientsApi} from "../../utils/api";

export default function App () {
  const [ingredients, setIngredients] = useState([]);
  const ingredientsState = {
    ingredients: ingredients,
    setIngredients: setIngredients
  };
  const [cart, setCart] = useState({ 
    bun: {},
    others: []}
  );
  const cartState = {
    cart: cart,
    setCart: setCart
  };

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
            <BurgerConstructor />
          </CartContext.Provider>
        </IngredientsContext.Provider>
      </main>
      <footer></footer>
    </>
  );
};