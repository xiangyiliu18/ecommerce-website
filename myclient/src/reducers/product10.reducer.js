
import { GET_PRODUCTS10 } from "../actions/product.action";
import { isEqual } from "lodash";

export const ProductReducer10= (state = null, action) => {
  switch (action.type) {
    case GET_PRODUCTS10:
      if(action.payload.data && action.payload.data.success) {
        // console.log(action.payload.data.products);
        if (isEqual(state && state.sort(), action.payload.data.products && action.payload.data.products.sort())) {
          return state;
        } else {
          return {products: action.payload.data.products, count: action.payload.data.code};
        }
      }
      if(state === null){
        return [];
      }
      return state;
    default:
      return state;
  }
};
