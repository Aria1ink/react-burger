import React, { useContext } from "react";
import PropTypes from 'prop-types';
import Ingredient from "../Ingredient/Ingredient";
import { IngredientsContext } from "../../services/context";
import style from "./Chapter.module.css";

export default function Chapter (props) {
  const ingredientsState = useContext(IngredientsContext);
  const ingredients = ingredientsState.ingredients;

  return (
    <>
      <h2 className="text text_type_main-medium" id={props.type} >
        {props.name}
      </h2>
      <ul className={style.Chapter + " pt-6 pb-10 pl-4 pr-4"}>
        {
          ingredients.map( (ingredient) =>
          {
            if (ingredient.type === props.type)
              return (<Ingredient 
                      {...props}
                      key={ingredient._id} 
                      id={ingredient._id} 
                      ingredient={ingredient} 
                    />)
            return ""
          }
          )
        }
      </ul>
    </>
  );
};

Chapter.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string
}; 