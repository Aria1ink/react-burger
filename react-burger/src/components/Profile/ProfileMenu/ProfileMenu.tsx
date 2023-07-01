import React from "react";
import { signOut } from "../../../utils/tools/userTools";
import style from "./ProfileMenu.module.css";
import { useAppDispatch, useAppLocation, useAppNavigate } from "../../../utils/tools/hooks";

export default function ProfileMenu () {
  const location = useAppLocation();
  const navigate = useAppNavigate();
  const dispatch = useAppDispatch();

  const onProfile = () => {
    navigate("/profile");
  };
  const onOrders = () => {
    navigate("/profile/orders");
  };
  const onExit = () => {
    signOut(dispatch);
  };
  return(
    <ul className={style.ProfileMenuContainer}>
      <li>
        <button 
          className={(location.pathname !== "/profile" ? "text_color_inactive" : style.ProfileMenuActive) + " text text_type_main-medium " + style.ProfileMenuButton}
          onClick={onProfile}
          type="button"
        >
          Профиль
        </button>
      </li>
      <li>
        <button 
          className={(location.pathname !== "/profile/orders" ? "text_color_inactive" : style.ProfileMenuActive) + " text text_type_main-medium " + style.ProfileMenuButton}
          onClick={onOrders}
          type="button"
        >
          История заказов
        </button>
      </li>
      <li>
        <button 
          type="button"
          className={"text_color_inactive text text_type_main-medium " + style.ProfileMenuButton}
          onClick={onExit}
        >
          Выход
        </button>
      </li>
    </ul>

  );
};