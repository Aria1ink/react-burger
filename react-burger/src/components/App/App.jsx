import React, { useState, useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import style from "./App.module.css";
import {getIngredientsApi} from "../../utils/api"

export default function App () {
  const [ingredients, setIngredients] = useState([]);
  const [cart, setCart]= useState([]);

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
        <BurgerIngredients 
          ingredients={ingredients} 
          cart={{cart: cart, setCart: setCart}} 
        />
        <BurgerConstructor 
          ingredients={ingredients} 
          cart={{cart: cart, setCart: setCart}} 
        />
      </main>
      <footer></footer>
    </>
  );
};