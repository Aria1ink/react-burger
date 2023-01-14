import React, { Children } from "react";
import Modal from "../Modal/Modal";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

export default function ModalOrder (props) {

  const modalState = props.modal.modalState;
  const setModalState = props.modal.setModalState;
  const ingredient = modalState.data;

  return (
    <>
    <ModalOverlay {...props} display={modalState.type === 'order' && modalState.display}>
      <Modal {...props} title='blablabla'>

      </Modal>
    </ModalOverlay>
    </>
  );
};