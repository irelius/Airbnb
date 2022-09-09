import "./SpotDetailPage.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { deleteReviewThunk, loadReviewsThunk } from "../../../store/review";
import LoginFormModal from "../../LoginFormModal";

function SpotDetailPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadReviewsThunk(spotId.spotId))
    }, [dispatch])

    let userReview;
    const spotId = useParams();
    const spotReviews = useSelector(state => Object.values(state.review));
    const currentUser = useSelector(state => state.session.user);
    if(currentUser) {
        userReview = spotReviews.filter(el => el.userId === currentUser.id)[0]
    }
    console.log(userReview, "booba");



    // this code is so bad.
    let userReviewId;
    let userReviewStatus = false;
    let aReviewExists = false;
    if (spotReviews.length === 0) {
    } else if (spotReviews[0].id) {
        if (currentUser) {
            spotReviews.forEach(el => {
                if (el.userId === currentUser.id) {
                    userReviewId = el.id
                    userReviewStatus = true;
                }
            })
        }
        aReviewExists = true;
    }


    let location;
    if (!userReviewStatus) {
        location = `/submit-review/${spotId.spotId}`
    }

    const loadUserReview = () => {
        if (currentUser && userReviewStatus) {
            return (
                <div>
                    <div>
                        {userReview.User.firstName} {userReview.User.lastName}
                    </div>
                    <div>
                        {userReview.createdAt.slice(0, 10)}
                    </div>
                    <div>
                        {userReview.review}
                    </div>
                </div>
            )
        }
    }

    const loadReviews = () => {
        if (aReviewExists) {
            return (
                spotReviews.map(el => {
                    return (
                        <div>
                            <div>
                                {el.User.firstName} {el.User.lastName}
                            </div>
                            <div>
                                {el.createdAt.slice(0, 10)}
                            </div>
                            <div>
                                {el.review}
                            </div>
                        </div>
                    )
                })
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
        history.go(0);
    }

    const reviewStatusFunc = () => {

        if (currentUser) {
            return (
                <button>
                    <NavLink exact to={`${location}`}>Submit a Review</NavLink>
                </button>
            )
        } else {
            return (
                <LoginFormModal />
            )
        }
    }

    return (
        <div className="spot-detail-main">

            <div>
                header sections
            </div>
            <div>
                spot section section
            </div>
            <div>
                spot detail section
                also reservation section (that doesn't work)
            </div>
            <div>
                review section
            </div>
            <div>
                <div className="user-review">
                    {loadUserReview()}
                </div>
                <div>
                    {deleteReview()}
                </div>
            </div>
            <div>
                {loadReviews()}
            </div>
            <div>
                {reviewStatusFunc()}
            </div>
        </div>
    )
}

export default SpotDetailPage
