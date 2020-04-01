import axios from "axios";
import { BASE_URL } from "../components/GlobalParams";
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCT = 'GET_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCTS = 'DELETE_PRODUCTS';
export const GET_PRODUCTS10="GET_PRODUCTS10";

export  async function getAllProducts() {
//   let activeResult = null;
//   try {
//     activeResult = await axios.get(`${BASE_URL}/products`, {withCredentials: true});
//    //console.log(activeResult);
//     activeResult = activeResult.data;
//   }catch(err){
//     activeResult =  {success: false, server: true, message: err.message}
//   }
//   return {
//     type: GET_PRODUCTS,
//     payload: activeResult
//   }
// }

let result = axios.get(`${BASE_URL}/products`, {withCredentials: true}).then((res)=> {
      return res.data
}).catch((err)=> {
      return {success: false, message: err.message};
});
return {
  type: GET_PRODUCTS,
  payload: result
}
}

export  async function getTop10Products(id) {
//   let activeResult = null;
//   try {
//     activeResult = await axios.get(`${BASE_URL}/products/top10/`, {withCredentials: true});
//     activeResult = activeResult.data;
//   }catch(err){
//     activeResult =  {success: false, server: true, message: err.message}
//   }
//   return {
//     type: GET_PRODUCTS10,
//     payload: activeResult
//   }
// }

  let result =  axios.get(`${BASE_URL}/products/top10/`, {withCredentials: true}).then((res)=> {
    // console.log(res);
    return {data: res.data, code: res.code}
  }).catch((err)=> {
    return {success: false, message: err.message};
  });
  return {
    type: GET_PRODUCTS10,
    payload: result
  }
}


export  function getProduct(id) {
//   let activeResult = null;
//   try {
//     activeResult = await axios.get(`${BASE_URL}/products/detail/`+id, {withCredentials: true});
//     activeResult = activeResult.data;
//   }catch(err){
//     activeResult =  {success: false, server: true, message: err.message}
//   }
//   return {
//     type: GET_PRODUCT,
//     payload: activeResult
//   }
// }

  let result = axios.get(`${BASE_URL}/products/detail/`+id, {withCredentials: true}).then((res)=> {
    return res.data
  }).catch((err)=> {
    return {success: false, message: err.message};
  });
  return {
    type: GET_PRODUCT,
    payload: result
  }
}

export async function editProduct(newProduct, success, fail){
 // let activeResult = null;
 console.log(newProduct);
//   try {
// //     activeResult = await axios.post(`${BASE_URL}/products/update/`+ newProduct.id, newProduct,
// //       {
// //         withCredentials: true});
// //     activeResult = activeResult.data;
// //     success && success(activeResult)
// //   }catch(err){
// //     activeResult =  {success: false, server: true, message: err.message};
// //     fail && fail(activeResult)
// //   }
// //   return {
// //     type: EDIT_PRODUCT,
// //     payload: activeResult
// //   }
// // }
  let result = axios.post(`${BASE_URL}/products/update/`+ newProduct.id, newProduct, { withCredentials: true}).then((res)=> {
    success && success(res.data);
        return res.data;
  }).catch((err)=> {
    const tmp = {success: false, message: err.message};
    fail && fail(tmp);
    return tmp
  });
  return {
    type: EDIT_PRODUCT,
    payload: result
  }
}

export async function addProduct(newProduct, success, fail){
//   let activeResult = null;
//   try {
//     activeResult = await axios.post(`${BASE_URL}/products/add/`, newProduct,
//       {
//         withCredentials: true});
//     activeResult = activeResult.data;
//     success && success(activeResult)
//   }catch(err){
//     activeResult =  {success: false, server: true, message: err.message};
//     fail && fail(activeResult)
//   }
//   return {
//     type: ADD_PRODUCT,
//     payload: activeResult
//   }
// }
  let result = axios.post(`${BASE_URL}/products/add/`, newProduct,
      {
        withCredentials: true}).then((res)=> {
    success && success(res.data);
          return res.data
  }).catch((err)=> {
      const tmp = { success: false, message: err.message };
      fail && fail(tmp);
      return tmp;
    }
  );
  return {
    type: GET_PRODUCTS,
    payload: result
  }
}
export async function deleteProduct(id, success, fail){
  let activeResult = null;
  try {
    activeResult = await axios.delete(`${BASE_URL}/products/delete/`+id, {withCredentials: true});
    activeResult = activeResult.data;
    success && success(activeResult)
  }catch(err){
    activeResult = {success: false, message: err.message};
    fail && fail(activeResult)
  }
  return {
    type: DELETE_PRODUCTS,
    payload: id
  }
}
