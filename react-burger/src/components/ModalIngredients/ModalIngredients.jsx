import React, { Children } from "react";
import Modal from "../Modal/Modal";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

export default function ModalIngredients (props) {

  const modalState = props.modal.modalState;
  const setModalState = props.modal.setModalState;
  const ingredient = modalState.data;

  return (
    <>
    <ModalOverlay {...props} display={modalState.type === 'ingredient' && modalState.display}>
      <Modal {...props} title='blablabla'>
        <img className='IngredientImage' src={ingredient.image} alt={ingredient.name} />
        <p className='IngredientTitle text text_type_main-default'>{ingredient.name}</p>
      </Modal>
    </ModalOverlay>
    </>
  );
};