import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import './App.css';

export default function App () {

  return (
    <>
      <AppHeader />
      <main className='AppMain'>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
      <footer></footer>
    </>
  );
};