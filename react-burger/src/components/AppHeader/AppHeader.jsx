import React from "react";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import "./AppHeader.css";
export default function AppHeader () {
  const [current, setCurrent] = React.useState("constructor");

  return (
    <header className="AppHeader p-4 mb-10">
      <nav className="HeaderMenuContainer" >
        <a href="#" className="AppHeaderLink pt-4 pb-4 pr-5 pl-5" onClick={() => setCurrent("constructor")}>
          <BurgerIcon type={current === "constructor" ? "primary" : "secondary"} />
          <p className="text text_type_main-default pl-2">Конструктор</p>
        </a>
        <a href="#" className="AppHeaderLink pt-4 pb-4 pr-5 pl-5" onClick={() => setCurrent("orderList")}>
          <ListIcon type={current === "orderList" ? "primary" : "secondary"} />
          <p className="text text_type_main-default pl-2">Лента заказов</p>
        </a>
      </nav>
      <Logo />
      <a href="#" className="AppHeaderLink pt-4 pb-4 pr-5 pl-5" onClick={() => setCurrent("profile")}>
        <ProfileIcon type={current === "profile" ? "primary" : "secondary"} />
        <p className="text text_type_main-default pl-2">Личный кабинет</p>
      </a>
    </header>
  );
};