import "./SpotPage.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { deleteReviewThunk, loadReviewsThunk, loadUserReviewThunk, resetReview } from "../../store/review";
import { loadAllSpotsThunk, loadSpotThunk, resetSpot } from "../../store/spot";

import LoginForm from "../../reusableComponents/Modals/LoginModal/LoginForm";
import calculateStars from "../../utils/calculateStars";


function SpotPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false)
    const [spotId, setSpotId] = useState(useParams().spotId)
    const [location, setLocation] = useState()

    useEffect(() => {
        dispatch(loadSpotThunk(spotId))
        dispatch(loadReviewsThunk(spotId))
        dispatch(loadUserReviewThunk(spotId))
        setLoad(true)

        return (() => {
            dispatch(resetSpot())
            dispatch(resetReview())
        })

    }, [dispatch])

    const spot = useSelector(state => state.spot)
    const allReviews = useSelector(state => state.review.all)
    const userReview = useSelector(state => state.review.user)
    const user = useSelector(state => state.session.user)

    console.log('booba', user)

    const loadUserReview = () => {
        if (!user.id) {
            return (
                <div id="login-container">
                    <div>
                        Please log in to submit a review.
                    </div>
                    <div id="login-button">
                        <LoginForm />
                    </div>
                </div>
            )
        }
        if (user.id && Object.keys(userReview).length === 0) {
            return (
                <button id="submit-review-button">
                    <NavLink exact to={`/submit-review/${spotId}`}>Submit a Review</NavLink>
                </button>
            )
        }
        if (user.id && Object.keys(userReview).length > 0) {
            return (
                <div>
                    <div id="review-name">
                        {userReview.User.firstName} {userReview.User.lastName}
                    </div>
                    <div id="review-date">
                        {userReview.createdAt.slice(0, 10)}
                    </div>
                    <div id="review-review">
                        {userReview.review}
                    </div>
                </div>
            )
        }
    }

    console.log('booba', user)

    Object.values(allReviews).forEach(el => {

    })

    const loadOtherReviews = () => {
        return (
            Object.values(allReviews).map(el => {
                console.log('booba asdf', el)
                if (el.userId === user.id) {
                    return null;
                } else if (el.User.id) {
                    return (
                        <div id="other-reviews">
                            <div id="reviewer-name">
                                {el.User.firstName} {el.User.lastName}
                            </div>
                            <div id="review-date">
                                {el.createdAt.slice(0, 10)}
                            </div>
                            <div id="review-review">
                                {el.review}
                            </div>
                        </div>
                    )
                }
                return null
            })
        )
    }

    const handleDelete = () => {
        dispatch(deleteReviewThunk(userReview.id))
        dispatch(loadReviewsThunk(spotId.spotId))
        history.go(0);
    }



    return load ? (
        <div id="spot-detail-main">
            <div id="spot-section">
                <div id="spot-name">
                    <h1>{spot.name}</h1>
                </div>
                <div id="spot-description">
                    {spot.city}, {spot.state}, {spot.country}
                </div>
                <div id="spot-rating">
                    {calculateStars(allReviews)}
                </div>
                <div id="spot-header-image">
                    <img src={`${spot.previewImg}`} alt={`${spot.name}`} />
                </div>
            </div>


            <div id="review-section">
                <div id="review-header">
                    <h2>
                        Reviews
                    </h2>
                </div>
                <div id="user-review">
                    <div>
                        {loadUserReview()}
                    </div>
                    <button onClick={handleDelete}>Delete your Review</button>
                    <div id="other-reviews-container">
                        {loadOtherReviews()}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div></div>
    )

    // // calculating stars
    // let starRating = 0;
    // let reviewTotal = 0;
    // let averageRating = 0;
    // spotReviews.forEach(el => {
    //     starRating += el.stars;
    //     reviewTotal++
    // })
    // if (starRating) {
    //     averageRating = (starRating / reviewTotal).toFixed(2);
    // } else {
    //     averageRating = 0;
    // }

}

export default SpotPage
