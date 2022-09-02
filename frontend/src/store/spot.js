import { csrfFetch } from "./csrf"

const LOAD_SPOTS = "/spots/load"
const ADD_SPOT = "/spots/add"

const initialSpot  = {
    spot: null
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
        console.log(allSpots, "testbooba")
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
    console.log("addSpot thunk is enter")
    const response = await csrfFetch("/api/spots/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newSpot)
    })
    console.log("after reponse await")

    if(response.ok) {
        const spot = await response.json();
        dispatch(addSpot(spot))
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
        default:
            return newState;
    }
}

export default spotReducer
