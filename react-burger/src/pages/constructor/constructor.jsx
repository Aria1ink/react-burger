import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/Constructor/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/Constructor/BurgerConstructor/BurgerConstructor";
import { loadIngredientsStatus, getIngredientsFromStore, getItemById } from "../../utils/tools";
import { setSelectedIngredient } from "../../services/actions/ingredient";
import Preloader from "../../components/Preloader/Preloader";

export default function ConstructorPage () {
  const status = useSelector(loadIngredientsStatus);
  const ingredients = useSelector(getIngredientsFromStore);
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
    <DndProvider backend={HTML5Backend}>
      <BurgerIngredients />
      <BurgerConstructor />
    </DndProvider>
  );
};