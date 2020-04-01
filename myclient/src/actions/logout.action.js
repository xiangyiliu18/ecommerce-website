import axios from "axios";
import { BASE_URL } from "../components/GlobalParams";
export const LOGOUT = 'LOGOUT';


export async  function logout(success, fail) {
     try{
       const result = await axios.post(`${BASE_URL}/logout`, {withCredentials: true});
         success && success(result.data);
       }catch(err){
            fail && fail({success: false, message: err.message})
       }
  return {
    type: LOGOUT
  }
}
