export const getIngredientById = (id, data) => {
  for (var i=0; i < data.length; i++)  {
    if (data[i]._id === id) {
      return data[i];
    };
  };
};
export const getCurrentIngredientFromStore = store => store.ingredient;
export const getCartFromStore = store => store.cart;
export const getMenuStatusFromStore = store => store.menu;
export const getIngredientsFromStore = store => store.ingredients.ingredients;
export const loadIngredientsStatus = store => store.ingredients.status;
export const getOrderNumberFromStore = store => store.order;