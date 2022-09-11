import { csrfFetch } from "./csrf"

const LOAD_REVIEWS = "/api/loadReviews"
const ADD_REVIEW = "/api/addReview"
const EDIT_REVIEW = "/api/editReview"
const DELETE_REVIEW = "/api/deleteReview"

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
    const response = await csrfFetch(`/api/reviews/${spotId}`)

    const allReviews = await response.json();
    dispatch(loadReviews(allReviews))
    return response;
}


export const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        payload: review
    }
}

// export const addReviewThunk = (review) => async dispatch => {
//     const response = await csrfFetch(`/api/reviews/${review.spotId}`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(review)
//     })

//     if(response.ok) {
//         const review = await response.json();
//         dispatch(addReview(review))
//     }
// }

export const addReviewThunk = (review) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${review.spotId.spotId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(review)
    })

    if(response.ok) {
        const review = await response.json();
        dispatch(addReview(review))
    }
}

// export const editReview = (review) => {
//     return {
//         type: EDIT_REVIEW,
//         payload: review
//     }
// }

// export const editReviewThunk = (spotId, editReview) => async dispatch => {
//     const response = await csrfFetch(`/api/reviews/${spotId}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(editReview)
//     })
//     console.log(await response.json())

//     if(response.ok) {
//         const review = await response.json();
//         dispatch(editReview(review))
//     }
// }



export const deleteReview = (review) => {
    return {
        type: DELETE_REVIEW,
        payload: review
    }
}

export const deleteReviewThunk = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    })

    console.log(await response.json())

    if(response.ok) {
        console.log("Review successfully deleted.")
    }
}

const reviewReducer = (state = initialReviews, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_REVIEWS:
            const allReviews = {};
            const reviewsArray = action.payload.Reviews
            reviewsArray.forEach(el => {
                allReviews[el.id] = el
            })
            return allReviews;
        case ADD_REVIEW:
            newState[action.payload.id] = action.payload;
            return newState;
        case EDIT_REVIEW:
            newState[action.payload.spotId] = action.payload;
            return newState;
        default:
            return newState;

    }
}

export default reviewReducer
