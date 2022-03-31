import {ADD_TODO_SUCCESS, REMOVE_TODO_SUCCESS, TOGGLE_TODO_SUCCESS} from "../actions/actionTypes";

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
  
    case REMOVE_TODO_SUCCESS:
      const removedTaskID = action.data;
      return state.filter((todo) => todo.id !== removedTaskID);
  
    case TOGGLE_TODO_SUCCESS:
      const toggledTaskID = action.data;
      return state.map((todo) =>
          todo.id === toggledTaskID ? {...todo, completed: !todo.completed} : todo
      );
    default:
      return state;
  }
};

export default TodoReducer;
