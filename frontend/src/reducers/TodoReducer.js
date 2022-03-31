import {ADD_TODO_FAIL, ADD_TODO_SUCCESS, REMOVE_TODO, TOGGLE_TODO} from "../actions/actionTypes";

const INITIAL_DATA = [];

const TodoReducer = (state = INITIAL_DATA, action) => {
  switch(action.type){
    case ADD_TODO_SUCCESS:
      return [
        ...state,
        {
          id: action.data.id,
          text: action.data.task,
          completed: action.data.complete,
          message: action.message,
        },
      ];
    case ADD_TODO_FAIL:
      return [
        ...state,
        {
          message: action.message
        },
      ];
    case TOGGLE_TODO:
      return state.map((todo) =>
          todo.id === action.id ? {...todo, completed: !todo.completed} : todo
      );
    case REMOVE_TODO:
      const numIndex = parseInt(action.id);
      return state.filter((todo) => todo.id !== numIndex);
    default:
      return state;
  }
};

export default TodoReducer;
