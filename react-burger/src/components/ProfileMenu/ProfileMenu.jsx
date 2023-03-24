import React from "react";
import { Link } from "react-router-dom";

export default function ProfileMenu () {

  return(
    <ul>
      <li>
        <Link to="/profile">
          Профиль
        </Link>
      </li>
      <li>
        <Link to="/profile/orders">
          История заказов
        </Link>
      </li>
      <li>
        <button type="button">
          Выход
        </button>
      </li>
    </ul>

  );
};