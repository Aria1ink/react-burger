import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import { loadIngredients } from "../../services/actions/ingredients";
import { loadIngredientsStatus } from "../../utils/tools";
import Preloader from "../../components/Preloader/Preloader";
import {signUp} from "../../services/actions/auth";

import styles from './constructor.module.css';

export default function ConstructorPage () {
  const dispatch = useDispatch();
  const status = useSelector(loadIngredientsStatus);

  useEffect(() => {
    dispatch(loadIngredients());
    //signUp({email: 'gfgfjtjjfd66fsgе@ya.ru', password: 'bhjwgjeygrjywger', name: 'Pixel'}, dispatch);
  }, []);

  if (status === 'loading') return (<Preloader />);
  if (status === 'failed') return (<div>Ошибка подключения к базе данных.</div>);

  return (
    <DndProvider backend={HTML5Backend}>
      <BurgerIngredients />
      <BurgerConstructor />
    </DndProvider>
  );
};