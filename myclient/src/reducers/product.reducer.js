import { DELETE_PRODUCTS, GET_PRODUCTS } from "../actions/product.action";
import { isEqual } from "lodash";
const ProductReducer = (state = null, action) => {
   switch (action.type) {
     case GET_PRODUCTS:
    // console.log(action.payload);  //{success: false, server: true, message: "Network Error"}
       if(action.payload.success) {
         if (isEqual(state && state.sort(), action.payload.products && action.payload.products.sort())) {
           return state;
         } else {
           return action.payload.products;
         }
       }
       if(state === null){
         return [];
       }
       return state;
     case DELETE_PRODUCTS:
       if(state && state.length > 0){
         let newS = Object.assign([], state);
        const index =  newS.findIndex((ele) => { return ele.id === action.payload.id});
         newS =state.splice(index, 1);
         return newS
       }
         return state;
     default:
       return state;
   }
};


export default ProductReducer;
