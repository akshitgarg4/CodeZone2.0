import {ADD_TODO_FAIL, ADD_TODO_SUCCESS, REMOVE_TODO, SET_VISIBILITY_FILTER, TOGGLE_TODO,} from "./actionTypes";

function getFormBody(params){
	let FormBody = [];
	for(let property in params){
		let encodedKey = encodeURIComponent(property);
		let encodedValue = encodeURIComponent(params[property]);
		FormBody.push(encodedKey + "=" + encodedValue);
	}
	return FormBody.join("&");
}

export function addTodo(text){
	
	return (dispatch) => {
		const url = "/toDo/add";
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Bearer ${localStorage.getItem("CodeZone2_Token")}`,
			},
			body: getFormBody({text}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				if(data.success){
					dispatch(() => {
						return {
							type: ADD_TODO_SUCCESS,
							data: data.data,
							message: data.message,
						}
					});
					
				} else{
					dispatch(() => {
						return {
							type: ADD_TODO_FAIL,
							message: data.message,
						}
					});
					
				}
			})
	}
	
}

export const deleteTodo = (id) => ({
	type: REMOVE_TODO,
	id: id,
});

export const toggleTodo = (id) => ({
	type: TOGGLE_TODO,
	id: id,
});

export const setVisibilityFilter = (filter) => ({
  type: SET_VISIBILITY_FILTER,
  filter,
});
