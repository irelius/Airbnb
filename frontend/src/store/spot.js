import { csrfFetch } from "./csrf"

const LOAD_SPOTS = "/spots/load"
const ADD_SPOT = "/spots/add"
const EDIT_SPOT = "/spots/edit"
const DELETE_SPOT = "/spots/delete"

const initialSpot  = {
    spot: []
}

export const loadSpots = (allSpots) => {
    return {
        type: LOAD_SPOTS,
        payload: allSpots
    }
}

export const loadSpotsThunk = () => async dispatch => {
    const response = await fetch('/api/spots/')
    if(response.ok) {
        const allSpots = await response.json();
        dispatch(loadSpots(allSpots))
    }
}

export const addSpot = (newSpot) => {
    return {
        type: ADD_SPOT,
        payload: newSpot
    }
}

export const addSpotThunk = (newSpot) => async dispatch => {
    const response = await csrfFetch("/api/spots/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newSpot)
    })

    if(response.ok) {
        const spot = await response.json();
        dispatch(addSpot(spot))
    }
}

export const editSpot = (spot) => {
    return {
        type: EDIT_SPOT,
        payload: spot
    }
}

export const editSpotThunk = (spotId, spotDetails) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(spotDetails)
    })

    if(response.ok) {
        const spot = await response.json();
        dispatch(editSpot(spot))
    }
}

export const deleteSpot = (spot) => {
    return {
        type: DELETE_SPOT,
        payload: spot
    }
}

export const deleteSpotThunk = (deleteSpot) => async dispatch => {
    const response = await csrfFetch("/api/spots/", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(deleteSpot)
    })

    let test = await response.json();
    console.log(test);

    if(response.ok) {
        const spot = await response.json();
        dispatch(deleteSpot(spot))
    }
}


const spotReducer = (state = initialSpot, action) => {
    const newState = { ...state }
    switch(action.type) {
        case LOAD_SPOTS:
            const allSpots = {};
            const spotsArray = action.payload.Spots
            spotsArray.forEach(el => {
                allSpots[el.id] = el
            })
            return allSpots;
        case ADD_SPOT:
            newState[action.payload.id] = action.payload
            return newState;
        case EDIT_SPOT:
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_SPOT:
            delete newState[action.payload]
            return newState;
        default:
            return newState;
    }
}

export default spotReducer
