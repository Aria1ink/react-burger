import React, { SyntheticEvent } from "react";
import style from "./ModalOverlay.module.css";

type Props = {
  children: React.ReactNode;
  close: () => void;
};

export default function ModalOverlay (props: Props) {
  const overlayClose = (evt: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (typeof((evt.target as Element).className) == "string" && (evt.target as Element).className.includes("ModalOverlay")) {
      props.close();
    }}

  return (
    <div className={style.ModalOverlay} onClick={overlayClose} >
      {props.children}
    </div>
  );
};