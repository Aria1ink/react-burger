export const getIngredientById = (id, data) => {
  for (var i=0; i < data.length; i++)  {
    if (data[i]._id === id) {
      return data[i];
    };
  };
};