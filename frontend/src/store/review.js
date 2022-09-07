import { csrfFetch } from "./csrf"

const LOAD_REVIEWS = "/api/loadReviews"

const initialReviews = {
    reviews: []
}

export const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        payload: reviews
    }
}

export const loadReviewsThunk = (spotId) => async dispatch => {
    const response = await fetch (`/api/reviews/${spotId}`)
    if(response.ok) {
        const allReviews = await response.json();
        dispatch(loadReviews(allReviews))
    }
}


const reviewReducer = (state = initialReviews, action) => {
    const newState = {...state}
    switch (action.type) {
        case LOAD_REVIEWS:
            const allReviews = {};
            const reviewsArray = action.payload.Reviews
            reviewsArray.forEach(el => {
                allReviews[el.id] = el
            })
            return allReviews;
        default:
            return newState;

    }
}

export default reviewReducer
