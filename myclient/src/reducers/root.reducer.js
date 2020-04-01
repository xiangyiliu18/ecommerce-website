import {combineReducers} from "redux";
import { LoginReducer } from "./login.reducer";
import UserReducer from "./user.reducer";
import ProductReducer from "./product.reducer";
import CategoryReducer from "./category.reducer";
import { ProductReducer1 } from "./product1.reducer";
import { Order1Reducer } from "./order1.reducer";
import OrderReducer from "./order_reducer";
import { ProductReducer10 } from "./product10.reducer";

export const rootReducer = combineReducers({
  user: LoginReducer,
  users: UserReducer,
  orders: OrderReducer,
  order: Order1Reducer,
  products: ProductReducer,
  product1: ProductReducer1,
  top10: ProductReducer10,
  categories: CategoryReducer,
});
