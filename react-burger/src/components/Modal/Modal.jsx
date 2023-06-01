import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import ReactDOM from "react-dom";
import { useLocation } from "react-router-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./Modal.module.css"
import ModalOverlay from "../ModalOverlay/ModalOverlay";

export default function Modal (props) {
  const modalRoot = document.getElementById("react-modals");
  const location = useLocation();

  useEffect(()=>{ 
    const closeModalByEsc = (evt) => { 
      if (evt.key === "Escape") { 
        props.close(); 
      } 
    } 
    document.addEventListener("keydown", closeModalByEsc); 
    return () =>{ 
      document.removeEventListener("keydown", closeModalByEsc); 
    } 
  })

  return  ReactDOM.createPortal( (
    <ModalOverlay {...props}>
      <div className={style.Modal + " pl-10 pr-10 pt-10 pb-15"} >
        <div className={style.ModalTitle} >
          <h3 className={location.pathname.startsWith("/ingredients") ? "text text_type_main-large" : "text text_type_digits-default"} >
            {props.title}
          </h3>
          <CloseIcon 
            type="primary" 
            onClick={props.close}
          />
        </div>
        {props.children}
      </div>
    </ModalOverlay>
  ), modalRoot
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}; 