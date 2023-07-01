import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/Constructor/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/Constructor/BurgerConstructor/BurgerConstructor";
import { loadIngredientsStatus, getIngredientsFromStore, getCurrentIngredientFromStore } from "../../utils/tools/storeTools";
import { getItemById } from "../../utils/tools/dataTools";
import { setIngredient, clearIngredient } from "../../services/slices/ingredient";
import IngredientDetails from "../../components/Constructor/IngredientDetails/IngredientDetails";
import Modal from "../../components/Modal/Modal";
import Preloader from "../../components/Preloader/Preloader";
import { useAppDispatch, useAppLocation, useAppNavigate, useAppParams, useAppSelector } from "../../utils/tools/hooks";

export default function ConstructorPage () {
  const status = useAppSelector(loadIngredientsStatus);
  const ingredients = useAppSelector(getIngredientsFromStore);
  const selectedIngredient = useAppSelector(getCurrentIngredientFromStore);
  const closeIngredientDetails = () => {
    dispatch(clearIngredient());
    navigate("/");
  };
  const dispatch = useAppDispatch();
  const { id } = useAppParams();
  const location = useAppLocation();
  const navigate = useAppNavigate();

  useEffect(() => {
    if (ingredients && location.pathname.startsWith("/ingredients") && id && ingredients.length > 0) {
      const tempIngredient = getItemById(id, ingredients);
      if (tempIngredient) {
        dispatch(setIngredient(tempIngredient));
      } else {
        navigate("/");
      }
    };
  }, [ingredients]);

  if (status === 'loading') return (<Preloader />);
  if (status === 'failed') return (<div>Ошибка подключения к базе данных.</div>);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
      { selectedIngredient &&
          (<Modal title="Детали ингредиента" close={closeIngredientDetails}>
            <IngredientDetails />
          </Modal>)
        }
    </>
  );
};