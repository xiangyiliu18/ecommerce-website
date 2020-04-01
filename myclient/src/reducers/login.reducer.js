import {LOGIN} from "../actions/login.action";

export function LoginReducer(state = {}, action) {
    switch (action.type) {
      case LOGIN:
        if(action.payload && action.payload.success){
          return action.payload.user
        }else
            return state;
        default:
            return state;
    }
}

