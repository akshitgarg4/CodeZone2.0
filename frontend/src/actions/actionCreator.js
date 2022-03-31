import {
	ADD_TODO_FAIL,
	ADD_TODO_SUCCESS,
	REMOVE_TODO_FAIL,
	REMOVE_TODO_SUCCESS,
	SET_VISIBILITY_FILTER,
	TOGGLE_TODO_FAIL,
	TOGGLE_TODO_SUCCESS,
} from "./actionTypes";

function getFormBody(params){
	let FormBody = [];
	for(let property in params){
		let encodedKey = encodeURIComponent(property);
		let encodedValue = encodeURIComponent(params[property]);
		FormBody.push(encodedKey + "=" + encodedValue);
	}
	return FormBody.join("&");
}

function toDoRequestComplete(data, message, type){
	return {
		message: message,
		type: type,
		data: data,
	};
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
				if(data.success){
					dispatch(toDoRequestComplete(data.data, data.message, ADD_TODO_SUCCESS));
					
					
				} else{
					dispatch(toDoRequestComplete(data.data, data.message, ADD_TODO_FAIL));
					
				}
			})
	}
	
}

export function deleteTodo(id){
	
	return (dispatch) => {
		const url = `/toDo/delete/${id}`;
		fetch(url, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("CodeZone2_Token")}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if(data.success){
					dispatch(toDoRequestComplete(data.data, data.message, REMOVE_TODO_SUCCESS));
					
					
				} else{
					dispatch(toDoRequestComplete(data.data, data.message, REMOVE_TODO_FAIL));
					
				}
			})
	}
	
}


export function toggleTodo(id){
	
	return (dispatch) => {
		const url = `/toDo/complete/${id}`;
		fetch(url, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("CodeZone2_Token")}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if(data.success){
					dispatch(toDoRequestComplete(data.data, data.message, TOGGLE_TODO_SUCCESS));
				} else{
					dispatch(toDoRequestComplete(data.data, data.message, TOGGLE_TODO_FAIL));
					
				}
			})
	}
	
}

export const setVisibilityFilter = (filter) => ({
	type: SET_VISIBILITY_FILTER,
	filter,
});
