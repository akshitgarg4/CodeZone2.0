import {ADD_TODO_SUCCESS, REMOVE_TODO_SUCCESS, TOGGLE_TODO} from "../actions/actionTypes";

const INITIAL_DATA = [];

const TodoReducer = (state = INITIAL_DATA, action) => {
  switch(action.type){
  
    case ADD_TODO_SUCCESS:
      return [
        ...state,
        {
          id: action.data._id,
          text: action.data.task,
          completed: action.data.complete,
          message: action.message,
        },
      ];
    case TOGGLE_TODO:
      return state.map((todo) =>
          todo.id === action.id ? {...todo, completed: !todo.completed} : todo
      );
    case REMOVE_TODO_SUCCESS:
      const removedTaskID = action.data;
      return state.filter((todo) => todo.id !== removedTaskID);
    default:
      return state;
  }
};

export default TodoReducer;
