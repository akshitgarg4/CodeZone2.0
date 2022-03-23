import { combineReducers } from "redux";
import auth from "./auth";
import todos from './TodoReducer';
import visibilityFilter from './FilterReducer';

export default combineReducers({
    auth,
    todos,
    visibilityFilter
});
