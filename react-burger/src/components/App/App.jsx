import React, { useState, useEffect } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import './App.css';
import {getIngredientsApi} from '../../utils/api'

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
  }, []);

  if (!ingredients[0]) return <div>Loading...</div>;

  return (
    <>
      <AppHeader />
      <main className='AppMain'>
        <BurgerIngredients ingredients={ingredients} cart={{cart: cart, setCart: setCart}} />
        <BurgerConstructor ingredients={ingredients} cart={{cart: cart, setCart: setCart}} />
      </main>
      <footer></footer>
    </>
  );
};