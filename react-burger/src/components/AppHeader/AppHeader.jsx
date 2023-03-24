import React from "react";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./AppHeader.module.css";

export default function AppHeader () {
  const [current, setCurrent] = React.useState("constructor");

  return (
    <header className={style.AppHeader + " p-4 mb-10"}>
      <nav className={style.HeaderMenuContainer} >
        <a href="/" className={style.AppHeaderLink + " pt-4 pb-4 pr-5 pl-5" }onClick={() => setCurrent("constructor")}>
          <BurgerIcon type={current === "constructor" ? "primary" : "secondary"} />
          <p className={current !== "constructor" ? "text text_type_main-default pl-2 text_color_inactive" : "text text_type_main-default pl-2"}>
            Конструктор
          </p>
        </a>
        <a href="/orderList" className={style.AppHeaderLink + " pt-4 pb-4 pr-5 pl-5"} onClick={() => setCurrent("orderList")}>
          <ListIcon type={current === "orderList" ? "primary" : "secondary"} />
          <p className={current !== "orderList" ? "text text_type_main-default pl-2 text_color_inactive" : "text text_type_main-default pl-2"}>
            Лента заказов
          </p>
        </a>
      </nav>
      <Logo />
      <a href="/profile" className={style.AppHeaderLink + " pt-4 pb-4 pr-5 pl-5"} onClick={() => setCurrent("profile")}>
        <ProfileIcon type={current === "profile" ? "primary" : "secondary"} />
        <p className={current !== "profile" ? "text text_type_main-default pl-2 text_color_inactive" : "text text_type_main-default pl-2"}>
          Личный кабинет
        </p>
      </a>
    </header>
  );
};