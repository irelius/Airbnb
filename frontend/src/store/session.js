import { csrfFetch } from "./csrf"

const SET_USER = "/api/setUser"
const REMOVE_USER = "/api/removeUser"
const NEW_USER = "/api/newUser"
const CLEAR_USERS = "/api/"

const initialUser = {
    user: null
}

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
}

export const removeUser = () => {
    return {
        type: REMOVE_USER
    }
}

export const newUser = (user) => {
    return {
        type: NEW_USER,
        payload: user
    }
}

export const clearUsers = () => {
    return {
        type: CLEAR_USERS
    }
}

export const signupThunk = (user) => async (dispatch) => {

    const response = await csrfFetch("/api/users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })

    if (response.ok) {
        const user = await response.json();
        dispatch(newUser(user));
    }
}
export const loginThunk = (credential, password) => async (dispatch) => {
    const response = await csrfFetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            credential,
            password,
        }),
    });

    const userData = await response.json();
    dispatch(setUser(userData));

};


export const logoutThunk = () => async (dispatch) => {
    const response = await csrfFetch("/api/users/logout", {
        method: "DELETE",
    })
    dispatch(removeUser());
    return response;
}

export const restoreUserThunk = () => async (dispatch) => {
    const response = await csrfFetch("/api/users/restore")

    const {user} = await response.json();
    dispatch(setUser(user));
    return response
}

const sessionReducer = (state = initialUser, action) => {
    const newState = { ...state }
    switch (action.type) {
        case SET_USER:
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState.user = undefined;
            return newState;
        case NEW_USER:
            newState.user = action.payload;
            return newState;
        default:
            return newState;
    }
}

export default sessionReducer;
