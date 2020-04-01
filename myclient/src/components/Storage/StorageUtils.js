import jwt from 'jsonwebtoken';
import axios from "axios";
import { BASE_URL } from "../GlobalParams";

const TOKEN = 'id_token';
export default {
  getToken(){
    const token = localStorage.getItem(TOKEN);
    let user = null;
    try {
       user = jwt.verify(token, 'mengyanyang');
    } catch(err) {
      axios.post(`${BASE_URL}/logout`, {withCredentials: true}).then(()=> {
          console.log("Log Out Successfully!");
      }).catch((err)=> {
        console.log(err);
      });
      localStorage.removeItem(TOKEN)
    }
    return user;
  },
  setToken(user){
    const token = jwt.sign(user, 'mengyanyang',  { expiresIn: '24h' });
    localStorage.setItem(TOKEN, token);
  },

  logout() {
    localStorage.clear();
  },
   removeToken(){
     localStorage.removeItem(TOKEN);
   }
}
