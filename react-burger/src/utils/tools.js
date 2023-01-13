export const getUniqueIngredientTypes = (data) => {
  return [...new Set(data.map(item => item.type))];
};