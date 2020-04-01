import { ACTIVE_USER, GET_USERS, UPDATE_ROLE } from "../actions/user.action";
import {isEqual} from 'lodash';
import * as Moment from "moment";

const UserReducer = (state = null, action) => {
  switch (action.type) {
    case GET_USERS:
      if(action.payload.success){
        if(isEqual(state && state.sort(), action.payload.users && action.payload.users.sort() )){
           return state;
        }else{
           action.payload.users.map( o => {o.updateAt =  Moment(o.updateAt).format("DD-MM-YYYY, h:mm:ss"); return o});
        //   console.log(action.payload.users);
           return action.payload.users;
        }
      }
      if(state === null){
          return [];
      }
      return state;
    case ACTIVE_USER:
         if(state && state.length > 0){
           const newState =  Object.assign([], state);
           const index =  newState.findIndex( (ele) => { return ele.id === action.payload.employeeID});
           if(newState[index].active ===1 )
             newState[index].active = 0;
           else
             newState[index].active = 1;
             return newState
         }else {
           return state;
         }
    case UPDATE_ROLE:
     // console.log(state);
      if(state && state.length > 0) {
        const newState = Object.assign([], state);
        const index =  newState.findIndex( (ele) => { return ele.id === action.payload.id});
        let tmp = [];
        const len = action.payload.roles.length;
        let count = 0;
        let roles = action.payload.roles;
      //  console.log(newState[index].roles);
        for(let i = 0; i < len; i++){
          if(isEqual(roles[i],"order")) {
            tmp[count] = { id: 3, type: 'order' };
            count += 1;
          } else if(isEqual(roles[i],"product")) {
            tmp[count] = {id: 2, type: 'product'};
            count += 1;
          } else if(isEqual(roles[i],"marketing")) {
            tmp[count] = {id: 4, type: 'marketing'};
            count += 1;
          }
        }
        //  console.log(roles);
        // console.log(tmp);
        newState[index].roles = tmp;
        return newState
      }else{
        return state;
      }
    default:
       return state;
  }
};

export default UserReducer;
