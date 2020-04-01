
import * as Moment from "moment";
import { EDIT_PRODUCT, GET_PRODUCT } from "../actions/product.action";
import { UPDATE_ORDER } from "../actions/order.action";
export const ProductReducer1 = (state = null, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      if (action.payload.success) {
        const newProduct = Object.assign({}, action.payload.product);
        newProduct.create_timestamp = Moment.utc(newProduct.create_timestamp).format("DD-MM-YYYY");
        newProduct.update_timestamp = Moment.utc(newProduct.update_timestamp).format("DD-MM-YYYY");
        let cat = '';
        console.log(action.payload);
        action.payload.categories.map((e) => {
          cat = cat + e.name + "|"
        });
        newProduct.categories = cat.slice(0, cat.length - 1);
        return newProduct;
      } else {
        return state;
      }
    default:
      return state;
  }
};
