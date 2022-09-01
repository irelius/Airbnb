const LOAD_SPOTS = "/spots/load"

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
        dispatch(loadSpots(allSpots))
    }
}


const spotReducer = (state = initialSpot, action) => {
    const newState = { ...state }
    switch(action.type) {
        case LOAD_SPOTS:
            const allSpots = {};
            action.spots.forEach((el, index) => {
                allSpots[index] = el;
            })
            console.log(allSpots, "booba")
            return allSpots;
        default:
            return newState;
    }
}

export default spotReducer
