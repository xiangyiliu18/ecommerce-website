import axios from "axios";
import qs from "qs";
import { BASE_URL } from "../components/GlobalParams";
export const LOGIN = 'LOGIN';

// Response success: false, server: false, data: null, message: ''
export async function login(username, password, success, fail) {
        let result = null;
        try {
            const tmp = await axios.post(`${BASE_URL}/login`, qs.stringify({ username, password }), { withCredentials: true });
            result = tmp.data;
            success && success(result);
        }catch(err){
            result = {success: false, message: err.message, server: true};
            fail && fail(result)
        }
        return {
            type: LOGIN,
            payload: result
        }
}
