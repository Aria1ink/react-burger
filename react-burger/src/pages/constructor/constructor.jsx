import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import { loadIngredients } from "../../services/actions/ingredients";
import { loadIngredientsStatus } from "../../utils/tools";

import styles from './constructor.module.css';

export default function ConstructorPage () {
  const dispatch = useDispatch();
  const status = useSelector(loadIngredientsStatus);

  useEffect(() => {
    dispatch(loadIngredients());
  }, []);

  if (status === 'loading') return (<div>Загрузка...</div>);
  if (status === 'failed') return (<div>Ошибка подключения к базе данных.</div>);

  return (
    <DndProvider backend={HTML5Backend}>
      <BurgerIngredients />
      <BurgerConstructor />
    </DndProvider>
  );
};