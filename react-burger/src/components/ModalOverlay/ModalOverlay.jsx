import React from "react";
import PropTypes from 'prop-types';
import ReactDOM from "react-dom";
import styles from "./ModalOverlay.module.css"
export default function ModalOverlay (props) {
  const modalRoot = document.getElementById("react-modals");
  const closeModal =  props.modal.closeModal;
  const overlayClose = (evt) => {
    if (typeof(evt.target.className) == "string" && evt.target.className.includes("ModalOverlay")) {
      closeModal();
    }}

  return ReactDOM.createPortal( (
      <div className={styles.ModalOverlay} style={{display: props.display}} onClick={overlayClose} >
        {props.children}
      </div>
    ),
    modalRoot
  );
};

ModalOverlay.propTypes = {
  modal: PropTypes.object,
  children: PropTypes.node,
  display: PropTypes.any
}; 