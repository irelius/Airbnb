import { csrfFetch } from "./csrf"

const SET_USER = "/api/setUser"
const REMOVE_USER = "/api/removeUser"
const NEW_USER = "/api/newUser"

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

export const loginThunk = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/users/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    if (response.ok) {
        const user = await response.json();
        dispatch(setUser(user));
    }
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

    const user = await response.json();
    dispatch(setUser(user.user));
    return response
}

const sessionReducer = (state = initialUser, action) => {
    const newState = { ...state }
    switch (action.type) {
        case SET_USER:
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState.user = null;
            return newState;
        case NEW_USER:
            newState.user = action.payload;
            return newState;
        default:
            return newState;
    }
}

export default sessionReducer;
