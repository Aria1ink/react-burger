import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import './App.css';
import {menu} from '../../variables/data';

export default function App () {

  return (
    <>
      <AppHeader />
      <main className='AppMain'>
        <BurgerIngredients ingredients={menu} />
        <BurgerConstructor ingredients={menu} />
      </main>
      <footer></footer>
    </>
  );
};