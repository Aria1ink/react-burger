import React, { useState, useEffect } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import './App.css';
import {getIngredientsApi} from '../../utils/api'
import ModalIngredients from '../ModalIngredients/ModalIngredients';
import ModalOrder from '../ModalOrder/ModalOrder';

export default function App () {
  const [ingredients, setIngredients] = useState([]);
  const [cart, setCart]= useState([]);
  const [modalState, setModalState] = useState({
    display: 'none',
    type: '',
    title: '',
    data: {}
  });
  const closeModal = () => {
    setModalState({
      display: 'none',
      children: '',
      title: '',
      data: {}
    });
  }

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
        <BurgerIngredients 
          ingredients={ingredients} 
          cart={{cart: cart, setCart: setCart}} 
          modal={{modalState: modalState, setModalState: setModalState, closeModal: closeModal}} 
        />
        <BurgerConstructor 
          ingredients={ingredients} 
          cart={{cart: cart, setCart: setCart}} 
          modal={{modalState: modalState, setModalState: setModalState, closeModal: closeModal}} 
        />
        <ModalIngredients 
          modal={{modalState: modalState, setModalState: setModalState, closeModal: closeModal}} 
        />
        <ModalOrder 
          modal={{modalState: modalState, setModalState: setModalState, closeModal: closeModal}}
        />
      </main>
      <footer></footer>
    </>
  );
};