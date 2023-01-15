import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./Modal.module.css"

export default function Modal (props) {
  const closeModal =  props.modal.closeModal;
  const closeModalByEsc = (evt) => { 
    if (evt.key === "Escape") { 
      closeModal(); 
    } 
  } 
 
  useEffect(()=>{ 
    document.addEventListener("keydown", closeModalByEsc); 
    return () =>{ 
      document.addEventListener("keydown", closeModalByEsc); 
    } 
  })

  return (
    <div className={style.Modal + " pl-10 pr-10 pt-10 pb-15"}>
      <div className={style.ModalTitle} >
        <h3 className="text text_type_main-large" >{props.title}</h3>
        <CloseIcon 
          type="primary" 
          onClick={closeModal}
        />
      </div>
      {props.children}
    </div>
  );
};

Modal.propTypes = {
  modal: PropTypes.object,
  title: PropTypes.string
}; 