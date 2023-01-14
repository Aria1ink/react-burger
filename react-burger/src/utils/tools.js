export const getIngredientById = (id, data) => {
  for (var i=0; i < data.length; i++)  {
    if (data[i]._id === id) {
      console.log(data[i]);
      return data[i];
    };
  };
};