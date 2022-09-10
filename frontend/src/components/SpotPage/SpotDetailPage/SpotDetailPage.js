import "./SpotDetailPage.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { deleteReviewThunk, loadReviewsThunk } from "../../../store/review";
import LoginFormModal from "../../LoginFormModal";
import { loadSpotsThunk } from "../../../store/spot";

function SpotDetailPage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadReviewsThunk(spotId.spotId))
        dispatch(loadSpotsThunk())
    }, [dispatch])

    const spotId = useParams();
    const spot = (useSelector(state => state.spot))[spotId.spotId]
    console.log(spot, "test spot")
    const spotReviews = useSelector(state => Object.values(state.review));
    if (spotReviews[0].length === 0) {
        dispatch(loadReviewsThunk(spotId.spotId))
    }
    const currentUser = useSelector(state => state.session.user);
    let userReview; // store user's review for a spot if it exists
    if (currentUser) {
        userReview = spotReviews.filter(el => el.userId === currentUser.id)[0]
    }

    // this code is so bad.
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
                <div>
                    Please log in to submit a review.
                    <LoginFormModal />
                </div>
            )
        }
        if (currentUser && !userReviewStatus) {
            return (
                <button>
                    <NavLink exact to={`${location}`}>Submit a Review</NavLink>
                </button>
            )
        }
        if (currentUser && userReviewStatus) {
            return (
                <div className="user-review">
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
        console.log(spotReviews, "booba")
        if (currentUser) {
            return (
                spotReviews.map(el => {
                    if (el.User) {
                        return (
                            <div className="user-review-container">
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
                    return (
                        <div className="user-review-container">
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
                })
            )
        }
    }

    const loadImage = () => {
        if (spot) {
            return (
                <img src={`${spot.previewImg}`} alt={`${spot.name}`} />
            )
        } else {
            return (
                <div>
                    booba
                </div>
            )
        }
    }

    const deleteReview = () => {
        if (userReviewStatus) {
            return (
                <button onClick={handleDelete}>Delete your Review</button>
            )
        }

    }

    const handleDelete = () => {
        dispatch(deleteReviewThunk(userReview.id))
        dispatch(loadReviewsThunk(spotId.spotId))
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
                <div className="spot-image">
                    {loadImage()}
                </div>
            </div>
            <div className="review-section">
                <div className="review-header">
                    <h2>
                        Reviews
                    </h2>
                </div>
                <div className="reviews">
                    <div>
                        {loadUserReview()}
                    </div>
                    <div className="delete-user-review">
                        {deleteReview()}
                    </div>
                    <div className="other-reviews">
                        {loadOtherReviews()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpotDetailPage
