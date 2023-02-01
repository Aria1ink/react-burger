import React from "react";
import PropTypes from 'prop-types';
import style from "./ModalOverlay.module.css";

export default function ModalOverlay (props) {
  const overlayClose = (evt) => {
    if (typeof(evt.target.className) == "string" && evt.target.className.includes("ModalOverlay")) {
      props.close();
    }}

  return (
    <div className={style.ModalOverlay} onClick={overlayClose} >
      {props.children}
    </div>
  );
};

ModalOverlay.propTypes = {
  close: PropTypes.func,
  children: PropTypes.node
}; 