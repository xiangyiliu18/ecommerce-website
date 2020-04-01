import axios from "axios";
import qs from "qs";
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const EDIT_CATEGORY = 'EDIT_CATEGORY';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const DELETE_CATEGORY = 'ADD_CATEGORY';
const BASE_URL = 'http://localhost:8080';
export  async function getAllCategories() {
  let activeResult = null;
  try {
    activeResult = await axios.get(`${BASE_URL}/products/categories`, {withCredentials: true});
    activeResult = activeResult.data;
  }catch(err){
    activeResult =  {success: false, server: true, message: err.message}
  }
  return {
    type: GET_CATEGORIES,
    payload: activeResult
  }
}
export async function updateCategory(id){
  let activeResult = null;
  try {
    activeResult = await axios.get(`${BASE_URL}/products/categories/update`+id, {withCredentials: true});
    activeResult = activeResult.data;
  }catch(err){
    activeResult =  {success: false, server: true, message: err.message}
  }
  return {
    type: EDIT_CATEGORY,
    payload: activeResult
  }
}

export async function addCategory(category){
  let activeResult = null;
  try {
    activeResult = await axios.get(`${BASE_URL}/products/categories/add`, {withCredentials: true});
    activeResult = activeResult.data;
  }catch(err){
    activeResult =  {success: false, server: true, message: err.message}
  }
  return {
    type: ADD_CATEGORY,
    payload: activeResult
  }
}

export async function deleteCategory(id){
  let activeResult = null;
  try {
    activeResult = await axios.get(`${BASE_URL}/products/categories/delete` + id, {withCredentials: true});
    activeResult = activeResult.data;
  }catch(err){
    activeResult =  {success: false, server: true, message: err.message}
  }
  return {
    type: DELETE_CATEGORY,
    payload: activeResult
  }
}

