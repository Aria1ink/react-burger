export const getItemById = (id, data) => {
  for (var i=0; i < data.length; i++)  {
    if (data[i]._id === id) {
      return data[i];
    };
  };
  return false;
};
export const getIngredientByName = (name, data) => {
  for (var i=0; i < data.length; i++)  {
    if (data[i].name === name) {
      return data[i];
    };
  };
};
export const sortByDate = (data) => {
  return(
    data.sort( (a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
  );
};
export const parseIngredients = (order, ingredients) => {
  const uniqueId = Array.from(new Set(order));
  const result = [];
  let summ = 0;
  uniqueId.forEach((idUnique) => {
    let counter = 0;
    order.forEach( (id) => {
      if (idUnique === id) {
        ++counter;
      }
    });
    const element = getItemById(idUnique, ingredients);
    summ = summ + element.price * counter;
    if (element.type === 'bun') {
      result.unshift({element: element, count: counter});
    } else {
      result.push({element: element, count: counter});
    }
  })
  if (result.length > 0) {
    return [result, summ];
  } else {
    return false;
  }
};