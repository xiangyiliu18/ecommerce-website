
import { GET_CATEGORIES } from "../actions/category.action";

const CategoryReducer = (state = null, action) => {
    switch (action.typ) {
      case GET_CATEGORIES:
        if(action.payload.success){
          console.log(action.payload);
          return action.payload.categories;
        }
        if(state === null){
          return [];
        }
        return state;
      default:
         return  state;

    }
};
export default CategoryReducer;
