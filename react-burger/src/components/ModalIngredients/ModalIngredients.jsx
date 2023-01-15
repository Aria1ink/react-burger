import React, { Children } from "react";
import Modal from "../Modal/Modal";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import FoodEnergy from  '../FoodEnergy/FoodEnergy';
import style from './ModalIngredients.module.css';

export default function ModalIngredients (props) {

  const modalState = props.modal.modalState;
  const setModalState = props.modal.setModalState;
  const ingredient = modalState.data;

  return (
    <>
    <ModalOverlay {...props} display={modalState.type === "ingredient" && modalState.display}>
      <Modal {...props} title="Детали ингредиента">
        <img className={style.ModalIngredientsImage} src={ingredient.image} alt={ingredient.name} />
        <p className="text text_type_main-medium pt-4 pb-8">{ingredient.name}</p>
        <div className={style.FoodEnergyContainer} >
            <FoodEnergy title="Калории, ккал" value={ingredient.calories} />
            <FoodEnergy title="Белки, г" value={ingredient.proteins} />
            <FoodEnergy title="Жиры, г" value={ingredient.fat} />
            <FoodEnergy title="Углеводы, г" value={ingredient.carbohydrates} />
        </div>
      </Modal>
    </ModalOverlay>
    </>
  );
};