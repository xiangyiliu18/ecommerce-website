import axios from "axios";
import qs from "qs";
import { BASE_URL } from "../components/GlobalParams";
import { GET_ORDERS } from "./order.action";
export const GET_USERS = 'GET_USERS';
export const GET_USER = 'GET_USER';
export const ACTIVE_USER = 'ACTIVE_USER';
export const UPDATE_ROLE ='UPDATE_ROLE';

export async function allUsers() {
  let result = null;
  try {
    const tmp = await axios.get(`${BASE_URL}/users`, {withCredentials: true});
    result = tmp.data;
  }catch(err){
    result = {success: false, server: true, message: err.message}
  }
  return {
    type: GET_USERS,
    payload: result
  }
}
//
// let result = axios.get(`${BASE_URL}/orders`, { withCredentials: true }).then((res)=> {
//   return res.data
// }).catch((err)=> {
//   return {success: false, message: err.message};
// });
// return {
//   type: GET_ORDERS,
//   payload: result
// }
// }

export async function activeUser(employeeID, active, success, fail) {
 // console.log(`Active Users: ${employeeID}, ${active}`);
  let activeResult = null;
  try {
    activeResult =  await axios.post(`${BASE_URL}/users/active/${employeeID}`,  qs.stringify({ active: Boolean(active) }),
      {withCredentials: true});
      success && success(activeResult.data)
  }catch(err){
     activeResult = {success: false, message: err.message};
     fail && fail(activeResult)
  }
  return {
    type: ACTIVE_USER,
    payload: {employeeID, active}
  }
}

export async function updateRole(id, roles, success, fail) {
  let result = null;
  try {
    result =  await axios.post(`${BASE_URL}/users/update_roles/`+id,  qs.stringify({ roles: JSON.stringify(roles)}),
    {withCredentials: true});
    success && success(result.data)
  }catch(err){
    result = {success: false, server: true, message: err.message};
    fail && fail(result)
  }
  return {
    type: UPDATE_ROLE,
    payload: {id, roles}
  }
}

export async function getUser(id, success, fail) {
  let result = null;
  try {
    result =  await axios.get(`${BASE_URL}/users/detail/`+id,
      {withCredentials: true});
    result = result.data;
  }catch(err){
    result = {success: false, server: true, message: err.message};
  }
  return {
    type: GET_USER,
    payload: result
  }
}


