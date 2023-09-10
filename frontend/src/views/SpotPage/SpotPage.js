import "./SpotPage.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { deleteReviewThunk, loadReviewsThunk, loadUserReviewThunk, resetReview } from "../../store/review";
import { loadSpotThunk, resetSpot } from "../../store/spot";

import LoginForm from "../../reusableComponents/Modals/LoginModal/LoginForm";
import calculateStars from "../../utils/calculateStars";
import formatMonthAndYear from "../../utils/formatMonthAndYear";


function SpotPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const spotId = useParams().spotId
    const [load, setLoad] = useState(false)
    const [spotOwner, setSpotOwner] = useState(null)

    useEffect(() => {
        dispatch(loadReviewsThunk(spotId))
        dispatch(loadUserReviewThunk(spotId))
        dispatch(loadSpotThunk(spotId))
        setLoad(true)

        return (() => {
            dispatch(resetSpot())
            dispatch(resetReview())
        })

    }, [dispatch])


    const spot = useSelector(state => state.spot)
    const allReviews = useSelector(state => state.review.all)
    const userReview = useSelector(state => state.review.user)
    const user = useSelector(state => state.session.user) || -1

    useEffect(() => {
        if (spot.Owner) {
            setSpotOwner(`${spot.Owner.firstName} ${spot.Owner.lastName}`)
        }
    }, [spot])


    const loadUserReview = () => {
        if (!user.id) {
            return (
                <div id="login-container">
                    <div>
                        Please log in to submit a review.
                    </div>
                    {/* <div id="login-button">
                        <LoginForm />
                    </div> */}
                </div>
            )
        } else if (user.id && Object.keys(userReview).length === 0) {
            return (
                <div id="submit-review-button" className="black-border semi-bold pointer f7f7f7-bg-hover" onClick={() => history.push(`/submit-review/${spotId}`)}>
                    Submit a Review
                </div>
                // <NavLink id="submit-review-button" className="black-border semi-bold" exact to={`/submit-review/${spotId}`}>Submit a Review</NavLink>
            )
        } else if (user.id && Object.keys(userReview).length > 0) {
            return (
                <div>
                    <div id="review-name">
                        {userReview.User.firstName} {userReview.User.lastName}
                    </div>
                    <div id="review-date">
                        {formatMonthAndYear(userReview.createdAt.slice(0, 10))}
                    </div>
                    <div id="review-review">
                        {userReview.review}
                    </div>
                </div>
            )
        }
    }


    const loadOtherReviews = () => {
        return (
            Object.values(allReviews).map(el => {
                if (el.userId === user.id) {
                    return null;
                } else if (el.User.id) {
                    return (
                        <div id="other-reviews">
                            <div id="reviewer-name">
                                {el.User.firstName} {el.User.lastName}
                            </div>
                            <div id="review-date">
                                {formatMonthAndYear(el.createdAt.slice(0, 10))}
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
                <div id="spot-header" className="semi-bold">
                    {spot.name}
                </div>
                <div id="spot-subheader">
                    <aside>
                        <i id="spot-star-icon" class="fa-solid fa-star fa"></i>
                        <p className="semi-bold">
                            {calculateStars(allReviews)}
                        </p>
                    </aside>
                    <aside>-</aside>
                    <aside className="bold underline">
                        {Object.values(allReviews).length} reviews
                    </aside>
                    <aside>-</aside>
                    <aside>
                        {spotOwner}
                    </aside>
                    <aside>-</aside>
                    <aside className="semi-bold underline">
                        {spot.city}, {spot.state}, {spot.country}
                    </aside>
                </div>
                <img id="spot-header-image" src={`${spot.previewImg}`} alt={`${spot.name}`} />
            </div>
            <div id="spot-line"></div>


            <div id="review-section">
                <div id="review-header">
                    <aside>
                        <i id="spot-star-icon" class="fa-solid fa-star fa"></i>
                        <p className="semi-bold">
                            {calculateStars(allReviews)}
                        </p>
                    </aside>
                    <aside>-</aside>
                    <aside className="semi-bold">
                        {Object.values(allReviews).length} reviews
                    </aside>
                </div>
                <div id="user-review">
                    <div>
                        {loadUserReview()}
                    </div>
                    {/* <button onClick={handleDelete}>Delete your Review</button> */}
                    <div id="other-reviews-container">
                        {loadOtherReviews()}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div></div>
    )
}

export default SpotPage
