import React from "react";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import Ingredient from "../Ingredient/Ingredient";
import style from "./Chapter.module.css";
import { getIngredientsFromStore } from "../../utils/tools";

export default function Chapter (props) {
  const ingredients = useSelector(getIngredientsFromStore);

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
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}; 