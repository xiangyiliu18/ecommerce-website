import { GET_ORDER, GET_ORDERS, UPDATE_ORDER } from "../actions/order.action";
import { isEqual } from "lodash";
import * as Moment from "moment";


const OrderReducer = (state = null, action) => {
  switch (action.type) {
    case GET_ORDERS:
     // console.log(action.payload);
      if(action.payload.success){
        if(isEqual(state && state.sort(), action.payload.orders && action.payload.orders.sort())){
          return state;
        }else{
          action.payload.orders.map( o => {o.date =  Moment(o.date).format("DD-MM-YYYY"); return o});
          return action.payload.orders;
        }
      }
      if(state === null){
        return [];
      }
      return state;
    default:
      return  state;

  }
};
export default OrderReducer;
