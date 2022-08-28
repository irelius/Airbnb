import { csrfFetch } from "./csrf"

const SET_USER = "/api/setUser"
const REMOVE_USER = "/api/removeUser"
const NEW_USER = "/api/newUser"

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

export const loginThunk = (user) => async (dispatch) => {
    const { credential, password } = user
    const response = await csrfFetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({
            credential,
            password
        })
    })
    if (response.ok) {
        const user = await response.json();
        dispatch(setUser(user));
        return response
    }
}

export const restoreSessionThunk = () => async (dispatch) => {
    const response = await csrfFetch("/api/users/restore")
    if (response.ok) {
        const user = await response.json();
        dispatch(setUser(user));
        return response
    }
}

export const signupThunk = (user) => async (dispatch) => {
    const { firstName, lastName, userName, email, password } = user
    const response = await csrfFetch("/api/users/signup", {
        method: "POST",
        body: JSON.stringify({
            firstName,
            lastName,
            userName,
            email,
            password
        })
    })

    if(response.ok) {
        const user = await response.json();
        dispatch(newUser(user));
        return response
    }
}


const initialUser = {
    user: null
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
            return state;
    }
}

export default sessionReducer;
