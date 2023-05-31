import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import IngredientDetails from "../../components/Constructor/IngredientDetails/IngredientDetails";
import Preloader from '../../components/Preloader/Preloader';
import { setSelectedIngredient } from "../../services/actions/ingredient";
import { getItemById } from '../../utils/tools/dataTools';
import { getCurrentIngredientFromStore, getIngredientsFromStore} from '../../utils/tools/storeTools';

export default function IngredientPage () {
  const { id } = useParams();
  const dispatch = useDispatch();
  const ingredients = useSelector(getIngredientsFromStore);
  const currentIngredient = useSelector(getCurrentIngredientFromStore);
  const navigate = useNavigate();

  useEffect( () => {
    if (ingredients.length > 0) {
      const ingredient = getItemById(id, ingredients);
      if (ingredient) {
        dispatch(setSelectedIngredient(ingredient));
      } else {
        navigate("/");
      }
  };
  }, [ingredients]);

  if (currentIngredient) {
    return (
      <IngredientDetails />
    );
  }

  return (
    <Preloader />
  )

}