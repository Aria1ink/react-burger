export const getIngredientById = (id, data) => {
  for (let ingredient of data)  {
    if (ingredient._id === id) {
      return ingredient;
    };
  };
};