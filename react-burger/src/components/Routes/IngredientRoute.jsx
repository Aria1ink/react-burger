import React from "react";
import { useLocation } from "react-router-dom";
import ConstructorPage from "../../pages/constructor/constructor";
import IngredientPage from "../../pages/ingredients/ingredients";

export default function IngredientRoute() {
  const location = useLocation();
  if (location.state && location.state.from === "/") {
    return (
      <ConstructorPage />
    )
  }
  return (
    <IngredientPage />
  );
};