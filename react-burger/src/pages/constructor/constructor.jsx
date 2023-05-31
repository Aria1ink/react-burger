import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/Constructor/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/Constructor/BurgerConstructor/BurgerConstructor";
import { loadIngredientsStatus, getIngredientsFromStore, getCurrentIngredientFromStore } from "../../utils/tools/storeTools";
import { getItemById } from "../../utils/tools/dataTools";
import { setSelectedIngredient, delSelectedIngredient } from "../../services/actions/ingredient";
import IngredientDetails from "../../components/Constructor/IngredientDetails/IngredientDetails";
import Modal from "../../components/Modal/Modal";
import Preloader from "../../components/Preloader/Preloader";

export default function ConstructorPage () {
  const status = useSelector(loadIngredientsStatus);
  const ingredients = useSelector(getIngredientsFromStore);
  const selectedIngredient = useSelector(getCurrentIngredientFromStore);
  const closeIngredientDetails = () => {
    dispatch(delSelectedIngredient());
    navigate("/");
  };
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.startsWith("/ingredients") && id && ingredients.length > 0) {
      const tempIngredient = getItemById(id, ingredients);
      if (tempIngredient) {
        dispatch(setSelectedIngredient(tempIngredient));
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