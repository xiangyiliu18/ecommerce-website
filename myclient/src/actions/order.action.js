import axios from "axios";
import qs from "qs";
import { BASE_URL } from "../components/GlobalParams";
import StorageUtils from "../components/Storage/StorageUtils";
export const GET_ORDERS = 'GET_ORDERS';
export const GET_ORDER = 'GET_ORDER';
export const UPDATE_ORDER = 'UPDATE_ORDER';

export function getAllOrders(){
 //
 // let result = axios.get(`${BASE_URL}/orders`, { withCredentials: true }).then((res)=> {
 //      return res.data
 //    }).catch((err)=> {
 //      return {success: false, message: err.message};
 //    });
 //  return {
 //    type: GET_ORDERS,
 //    payload: result
 //  }
  let result =axios.get(`${BASE_URL}/orders`, { withCredentials: true }).then((res)=> {
    return res.data
  }).catch((err)=> {
    return {success: false, message: err.message};
  });
  return {
    type: GET_ORDERS,
    payload: result
  }
}


export function getOrder(id){
  // let result = null;
  //   try {
  //     const tmp = await axios.get(`${BASE_URL}/orders/detail/` +id, {withCredentials: true});
  //     result = tmp.data;
  // //    console.log(result);
  //   }catch(err){
  //     result =  {success: false, message: err.message};
  //   }
  //   return {
  //     type: GET_ORDER,
  //     payload: result
  //   }
  let result =  axios.get(`${BASE_URL}/orders/detail/` +id, {withCredentials: true}).then((res)=> {
    return res.data
  }).catch((err)=> {
    return {success: false, message: err.message};
  });
  return {
    type: GET_ORDER,
    payload: result
  }
}

export async function updateOrder(id, status, comment,  success, fail){
  // Order ID, order status,
  const username = StorageUtils.getToken().username;
  const email = "cherylforopen@gmail.com";
  let result = null;
  try {
        result = await axios.post(`${BASE_URL}/orders/update/` +id, qs.stringify({
       status, username, comment, email}), {withCredentials: true});
        result = result.data;
       success && success(result)
  }catch(err){
      result = {success: false, message: err.message};
      fail && fail(result)
  }
  return {
    type: UPDATE_ORDER,
    payload: result
  }
}
