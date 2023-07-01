import React from "react";
import ConstructorPage from "../../pages/constructor/constructor";
import IngredientPage from "../../pages/ingredients/ingredients";
import { useAppLocation } from "../../utils/tools/hooks";

export default function IngredientRoute() {
  const location = useAppLocation();
  if (location.state && location.state.from === "/") {
    return (
      <ConstructorPage />
    )
  }
  return (
    <IngredientPage />
  );
};