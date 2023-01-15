import React from "react";
import PropTypes from 'prop-types';
import style from "./IngredientDetails.module.css";
import FoodEnergy from  '../FoodEnergy/FoodEnergy';

export default function IngredientDetails (props) {
  const ingredient = props.ingredient;

  return (
    <>
      <img className={style.IngredientDetailsImage} src={ingredient.image} alt={ingredient.name} />
      <p className="text text_type_main-medium pt-4 pb-8">{ingredient.name}</p>
      <div className={style.FoodEnergyContainer} >
        <FoodEnergy title="Калории, ккал" value={ingredient.calories} />
        <FoodEnergy title="Белки, г" value={ingredient.proteins} />
        <FoodEnergy title="Жиры, г" value={ingredient.fat} />
        <FoodEnergy title="Углеводы, г" value={ingredient.carbohydrates} />
      </div>
    </>
  );
};

IngredientDetails.propTypes = {
  ingredient: PropTypes.object
}; 