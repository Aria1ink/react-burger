export const getIngredientById = (id, data) => {
  for (var i=0; i < data.length; i++)  {
    if (data[i]._id === id) {
      return data[i];
    };
  };
};
export const getItemIndex = (cart, cartId) => {
  return cart.findIndex(item => item.cartId === cartId);
}