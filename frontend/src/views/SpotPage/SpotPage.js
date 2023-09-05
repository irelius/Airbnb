import "./SpotPage.css"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { deleteReviewThunk, loadReviewsThunk } from "../../store/review";
import { loadSpotsThunk } from "../../store/spot";

import LoginForm from "../../reusableComponents/Modals/LoginModal/LoginForm";


function SpotPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadReviewsThunk(spotId.spotId))
        dispatch(loadSpotsThunk())
    }, [dispatch])

    const spotId = useParams();
    const spot = (useSelector(state => state.spot))[spotId.spotId]
    const spotReviews = useSelector(state => Object.values(state.review));

    const currentUser = useSelector(state => state.session.user);
    let userReview; // store user's review for a spot if it exists
    if (currentUser) {
        userReview = spotReviews.filter(el => el.userId === currentUser.id)[0]
    }

    let userReviewId;
    let userReviewStatus = false; // variable for if the user has a review for a spot
    let aReviewExists = false; // variable for if a single review exists for a spot
    if (spotReviews.length === 0) { // will do nothing if no reviews exist
    } else if (spotReviews[0].id) {
        if (currentUser) {
            spotReviews.forEach(el => {
                if (el.userId === currentUser.id) {
                    userReviewId = el.id
                    userReviewStatus = true;
                }
            })
        }
        aReviewExists = true; // set to true if a single review exists
    }

    let location;
    if (!userReviewStatus) {
        location = `/submit-review/${spotId.spotId}`
    }


    // calculating stars
    let starRating = 0;
    let reviewTotal = 0;
    let averageRating = 0;
    spotReviews.forEach(el => {
        starRating += el.stars;
        reviewTotal++
    })
    if (starRating) {
        averageRating = (starRating / reviewTotal).toFixed(2);
    } else {
        averageRating = 0;
    }

    const loadSpotName = () => {
        if (spot) {
            return (
                <h1>
                    {spot.name}
                </h1>
            )
        }
    }

    const loadSpotLocation = () => {
        if (spot) {
            return (
                <div>
                    {spot.city}, {spot.state}, {spot.country}
                </div>
            )
        }
    }

    const loadUserReview = () => {
        if (!currentUser) {
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
        if (currentUser && !userReviewStatus) {
            return (
                <button id="submit-review-button">
                    <NavLink exact to={`${location}`}>Submit a Review</NavLink>
                </button>
            )
        }
        if (currentUser && userReviewStatus) {
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


    const loadOtherReviews = () => {
        if (currentUser) {
            return (
                spotReviews.map(el => {
                    if (el.User) {
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
                })
            )
        } else {
            return (
                spotReviews.map(el => {
                    if (el.User) {
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
                })
            )
        }
    }

    const loadImage = () => {
        if (spot) {
            return (
                <img src={`${spot.previewImg}`} alt={`${spot.name}`} />
            )
        }
    }

    const deleteReview = () => {
        if (userReviewStatus) {
            return (
                <button onClick={handleDelete}>Delete your Review</button>
            )
        } else {
        }
    }

    const handleDelete = () => {
        dispatch(deleteReviewThunk(userReview.id))
        dispatch(loadReviewsThunk(spotId.spotId))
        history.go(0);
    }

    return (
        <div id="spot-detail-main">
            <div id="spot-section">
                <div id="spot-name">
                    {loadSpotName()}
                </div>
                <div id="spot-description">
                    {loadSpotLocation()}
                </div>
                <div id="spot-rating">
                    {averageRating}
                </div>
                <div id="spot-header-image">
                    {loadImage()}
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
                    <div id="delete-user-review">
                        {deleteReview()}
                    </div>
                </div>
                <div id="other-reviews-container">
                    {loadOtherReviews()}
                </div>
            </div>
        </div>
    )
}

export default SpotPage
