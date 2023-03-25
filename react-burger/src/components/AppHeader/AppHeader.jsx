import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./AppHeader.module.css";

export default function AppHeader () {
  const [current, setCurrent] = React.useState("constructor");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.replace('/','');
    if (path){
      setCurrent(path);
    };
  }, []
  )

  return (
    <header className={style.AppHeader + " p-4 mb-10"}>
      <nav className={style.HeaderMenuContainer} >
        <Link 
          to="/" 
          className={style.AppHeaderLink + " pt-4 pb-4 pr-5 pl-5" } 
          onClick={(e) => setCurrent("constructor")}>
          <BurgerIcon type={current === "constructor" ? "primary" : "secondary"} />
          <p className={current !== "constructor" ? "text text_type_main-default pl-2 text_color_inactive" : "text text_type_main-default pl-2"}>
            Конструктор
          </p>
        </Link>
        <Link to="/orderList" className={style.AppHeaderLink + " pt-4 pb-4 pr-5 pl-5"} onClick={() => setCurrent("orderList")}>
          <ListIcon type={current === "orderList" ? "primary" : "secondary"} />
          <p className={current !== "orderList" ? "text text_type_main-default pl-2 text_color_inactive" : "text text_type_main-default pl-2"}>
            Лента заказов
          </p>
        </Link>
      </nav>
      <Logo />
      <Link to="/profile" className={style.AppHeaderLink + " pt-4 pb-4 pr-5 pl-5"} onClick={() => setCurrent("profile")}>
        <ProfileIcon type={current === "profile" ? "primary" : "secondary"} />
        <p className={current !== "profile" ? "text text_type_main-default pl-2 text_color_inactive" : "text text_type_main-default pl-2"}>
          Личный кабинет
        </p>
      </Link>
    </header>
  );
};