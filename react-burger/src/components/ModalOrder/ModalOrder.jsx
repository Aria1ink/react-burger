import React from "react";
import PropTypes from 'prop-types';
import Modal from "../Modal/Modal";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import style from "./ModalOrder.module.css"
import imgDone from "../../image/done.svg"

export default function ModalOrder (props) {
  const modalState = props.modal.modalState;

  return (
    <>
    <ModalOverlay {...props} display={modalState.type === "order" && modalState.display}>
      <Modal {...props} title="">
        <div className={style.ModalOrder}>
          <p className={style.ModalOrderNumber + " text text_type_digits-large pt-4"}> { modalState.data.number } </p>
          <p className="text text_type_main-small pt-8">идентификатор заказа</p>
          <img  className={style.ModalOrderImage + " pt-15 pb-15"} src={imgDone} alt="Галочка" />
          <p className="text text_type_main-default">Ваш заказ начали готовить</p>
          <p className=" =text text_type_main-default text_color_inactive pt-2 pb-15">Дождитесь готовности на орбитальной станции</p>
        </div>
      </Modal>
    </ModalOverlay>
    </>
  );
};

ModalOrder.propTypes = {
  modal: PropTypes.object
}; 