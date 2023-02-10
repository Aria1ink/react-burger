import { getIngredientsApi, setOrderApi } from './api';
import { useDispatch, useSelector } from "react-redux";
import { 
  setIngredientsStatusLoaded,
  setIngredientsStatusLoading,
  setIngredientsStatusFail
} from '../services/actions/ingredients';

export const getIngredientById = (id, data) => {
  for (var i=0; i < data.length; i++)  {
    if (data[i]._id === id) {
      return data[i];
    };
  };
};

export const loadIngredients = () => {
  return (dispatch) => {
    dispatch(setIngredientsStatusLoading());
    getIngredientsApi()
    .then(
      (data) => {
        dispatch(setIngredientsStatusLoaded(data.data));
      }
    )
    .catch((err) => {
      dispatch(setIngredientsStatusFail());
      console.log(err);
    });
  }
};