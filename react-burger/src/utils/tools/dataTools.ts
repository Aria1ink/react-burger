import { Ingredient } from "../../services/types/ingredients";
import { Order, OrderIngredients, Orders } from "../../services/types/store";

export const getItemById = <T extends Order | Ingredient>(id: string, data: T[]): T | false => {
  for (var i=0; i < data?.length; i++)  {
    if (data[i]._id === id) {
      return data[i];
    };
  };
  return false;
};
export const getIngredientByName = (name: string, data: Ingredient[]) => {
  for (var i=0; i < data.length; i++)  {
    if (data[i].name === name) {
      return data[i];
    };
  };
  return false;
};
export const sortByDate = (arr: Orders): Orders => {
  const data = [...arr];
  return(
    data.sort( (a, b) => {
      return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf(); // проверить сортировку
    })
  );
};
export const parseIngredients = (order: string[], ingredients: Ingredient[]): [OrderIngredients, number] | false => {
  const uniqueId = Array.from(new Set(order));
  const result: OrderIngredients = [];
  let summ = 0;
  uniqueId.forEach((idUnique) => {
    let counter = 0;
    order.forEach( (id) => {
      if (idUnique === id) {
        ++counter;
      }
    });
    const element = getItemById<Ingredient>(idUnique, ingredients);
    if (element) {
      summ = summ + element.price * counter;
      if (element?.type === 'bun') {
        result.unshift({element: element, count: counter});
      } else {
        result.push({element: element, count: counter});
      }
    }
  })
  if (result.length > 0) {
    return [result, summ];
  } else {
    return false;
  }
};