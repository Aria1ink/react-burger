import React, { useEffect, useState } from 'react';
import { useParams, Link} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import Preloader from '../../components/Preloader/Preloader';
import { setSelectedIngredient } from "../../services/actions/ingredient";
import { getItemById, getCurrentIngredientFromStore, getIngredientsFromStore} from '../../utils/tools';
import style from './ingredients.module.css';

export default function IngredientPage () {
  const { id } = useParams();
  const dispatch = useDispatch();
  const ingredients = useSelector(getIngredientsFromStore);
  const currentIngredient = useSelector(getCurrentIngredientFromStore);
  const [ status, setStatus ] = useState(true);

  useEffect( () => {
    if (ingredients.length > 0) {
      const ingredient = getItemById(id, ingredients);
      if (ingredient) {
        dispatch(setSelectedIngredient(ingredient));
      } else {
        setStatus(false);
      }
  };
  }, [ingredients]);

  if (currentIngredient) {
    return (
      <IngredientDetails />
    );
  }

  if (!status) {
    return (
      <div className={style.notFound} >
        <p className="text text_type_main-large"> Ингредиент не найден </p>
        <Link to={"/"}>
          Перейти на главную страницу
        </Link>
      </div>
    );
  }

  return (
    <Preloader />
  )

}