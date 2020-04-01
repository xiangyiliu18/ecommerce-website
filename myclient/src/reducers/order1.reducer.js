
import * as Moment from "moment";
import { GET_ORDER, UPDATE_ORDER } from "../actions/order.action";


export const Order1Reducer = (state = null, action) => {
  switch (action.type) {
    case GET_ORDER:
      if (action.payload.success) {
        let tmp = Object.assign({}, action.payload.order);
         tmp.date = Moment(tmp.date).format("DD-MM-YYYY");
         return tmp;
      }
      if(state === null)
        return {};
      return state;
    default:
      return state;
  }
};
