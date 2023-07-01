import React, { useEffect } from 'react';
import IngredientDetails from "../../components/Constructor/IngredientDetails/IngredientDetails";
import Preloader from '../../components/Preloader/Preloader';
import { setIngredient } from '../../services/slices/ingredient';
import { getItemById } from '../../utils/tools/dataTools';
import { getCurrentIngredientFromStore, getIngredientsFromStore} from '../../utils/tools/storeTools';
import { useAppDispatch, useAppNavigate, useAppParams, useAppSelector } from '../../utils/tools/hooks';

export default function IngredientPage () {
  const { id } = useAppParams();
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector(getIngredientsFromStore);
  const currentIngredient = useAppSelector(getCurrentIngredientFromStore);
  const navigate = useAppNavigate();

  useEffect( () => {
    if (ingredients && id && ingredients.length > 0) {
      const ingredient = getItemById(id, ingredients);
      if (ingredient) {
        dispatch(setIngredient(ingredient));
      } else {
        navigate("/");
      }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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