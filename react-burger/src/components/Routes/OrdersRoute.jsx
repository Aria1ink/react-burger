import React from "react";
import { useLocation } from "react-router-dom";
import OrdersPage from "../../pages/orders/orders";
import IngredientPage from "../../pages/ingredients/ingredients";

export default function OrdersRoute() {
  const location = useLocation();
  console.log(location)
  if (location.state && location.state.from === "/profile/orders") {
    return (
      <OrdersPage />
    )
  }
  return (
    <IngredientPage />
  );
};