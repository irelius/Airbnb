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
                <div className="login-container">
                    <div>
                        Please log in to submit a review.
                    </div>
                    <div className="login-button">
                        <LoginForm />
                    </div>
                </div>
            )
        }
        if (currentUser && !userReviewStatus) {
            return (
                <button className="submit-review-button">
                    <NavLink exact to={`${location}`}>Submit a Review</NavLink>
                </button>
            )
        }
        if (currentUser && userReviewStatus) {
            return (
                <div>
                    <div className="review-name">
                        {userReview.User.firstName} {userReview.User.lastName}
                    </div>
                    <div className="review-date">
                        {userReview.createdAt.slice(0, 10)}
                    </div>
                    <div className="review-review">
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
                            <div className="other-reviews">
                                <div className="reviewer-name">
                                    {el.User.firstName} {el.User.lastName}
                                </div>
                                <div className="review-date">
                                    {el.createdAt.slice(0, 10)}
                                </div>
                                <div className="review-review">
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
                            <div className="other-reviews">
                                <div className="reviewer-name">
                                    {el.User.firstName} {el.User.lastName}
                                </div>
                                <div className="review-date">
                                    {el.createdAt.slice(0, 10)}
                                </div>
                                <div className="review-review">
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
        <div className="spot-detail-main">
            <div className="spot-section">
                <div className="spot-name">
                    {loadSpotName()}
                </div>
                <div className="spot-description">
                    {loadSpotLocation()}
                </div>
                <div className="spot-rating">
                    {averageRating}
                </div>
                <div className="spot-header-image">
                    {loadImage()}
                </div>
            </div>


            <div className="review-section">
                <div className="review-header">
                    <h2>
                        Reviews
                    </h2>
                </div>
                <div className="user-review">
                    <div>
                        {loadUserReview()}
                    </div>
                    <div className="delete-user-review">
                        {deleteReview()}
                    </div>
                </div>
                <div className="other-reviews-container">
                    {loadOtherReviews()}
                </div>
            </div>
        </div>
    )
}

export default SpotPage
