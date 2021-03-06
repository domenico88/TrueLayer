import * as types from "../constants/actions"


export const initialState = { is_recording: sessionStorage.getItem('Recording') === 'true' || false, todo_list: {} }


export function todolist_reducer(state = initialState, action) {

    switch (action.type) {
        case types.ADD_TODO:

            save_action_in_storage(action);

            return {
                ...state,

                todo_list: {
                    ...state.todo_list,
                    [action.todo.id]: { id: action.todo.id, name: action.todo.name, description: action.todo.description, date: action.todo.creationDate }
                }
            }

        case types.REMOVE_TODO:

            save_action_in_storage(action);

            delete state.todo_list[action.id]
            return {
                ...state,
                todo_list: state.todo_list
            }
        case types.IS_RECORDING:

            return {
                ...state,
                is_recording: action.is_recording
            }
        case types.IS_PLAYING:
            return {
                ...state,
                is_playing: action.is_playing
            }
        case types.UPDATE_TODO:

            save_action_in_storage(action);

            return {
                ...state,
                todo_list: { ...state.todo_list, ...action.payload }
            }

        case types.CLEAR_TODOS:
            return {
                ...state,
                todo_list: {}
            }


    }
    return state;
}


function save_action_in_storage(action) {
    let is_recording=sessionStorage.getItem("Recording");
    if (is_recording==="true") {
        let action_list = JSON.parse(sessionStorage.getItem('action_list')) || [];
        let new_action_list = [...action_list, action]
        sessionStorage.setItem('action_list', JSON.stringify(new_action_list))
    }
}
