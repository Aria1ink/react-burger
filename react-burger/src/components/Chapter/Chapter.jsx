import React from "react";
import Ingredient from '../Ingredient/Ingredient'
import './Chapter.css'

export default function Chapter (props) {
  const ingredients = props.ingredients;

  return (
    <>
      <h2 className="ChapterTitle" id={props.type} >
        {props.name}
      </h2>
      <ul className="Chapter pt-6 pb-10 pl-4 pr-4">
        {
          ingredients.map( (ingredient) =>
          {
            if (ingredient.type === props.type)
              return <Ingredient key={ingredient._id} id={ingredient._id} ingredient={ingredient} />
            return ''
          }
          )
        }
      </ul>
    </>
  );
};