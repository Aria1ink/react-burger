import React, { ReactNode } from "react";
import IngredientElement from "../IngredientElement/IngredientElement";
import style from "./Chapter.module.css";
import { getIngredientsFromStore } from "../../../utils/tools/storeTools";
import { useAppSelector } from "../../../utils/tools/hooks";

type Props = {
  type: string;
  name: string;
  children?: ReactNode;
};

export default function Chapter (props: Props) {
  const ingredients = useAppSelector(getIngredientsFromStore);

  return (
    <>
      <h2 className="text text_type_main-medium" id={props.type} >
        {props.name}
      </h2>
      <ul className={style.Chapter + " pt-6 pb-10 pl-4 pr-4"}>
        {
          ingredients && ingredients.map( (ingredient) =>
          {
            if (ingredient.type === props.type)
              return (<IngredientElement 
                      {...props}
                      key={ingredient._id} 
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