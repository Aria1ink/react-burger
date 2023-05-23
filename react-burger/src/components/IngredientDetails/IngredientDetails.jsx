import React from "react";
import { useSelector } from "react-redux";
import style from "./IngredientDetails.module.css";
import FoodEnergy from  '../FoodEnergy/FoodEnergy';
import { getCurrentIngredientFromStore } from "../../utils/tools";


export default function IngredientDetails () {
  const ingredient = useSelector(getCurrentIngredientFromStore);

  return (
    <div className={style.IngredientDetailsContainer} >
      <img className={style.IngredientDetailsImage} src={ingredient.image} alt={ingredient.name} />
      <p className="text text_type_main-medium pt-4 pb-8">{ingredient.name}</p>
      <div className={style.FoodEnergyContainer} >
        <FoodEnergy title="Калории, ккал" value={ingredient.calories} />
        <FoodEnergy title="Белки, г" value={ingredient.proteins} />
        <FoodEnergy title="Жиры, г" value={ingredient.fat} />
        <FoodEnergy title="Углеводы, г" value={ingredient.carbohydrates} />
      </div>
    </div>
  );
};