import "./SpotDetailPage.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { loadReviewsThunk } from "../../../store/review";

function SpotDetailPage() {
    const spotId = useParams();
    const currentUser = useSelector(state => state.session);
    const allReviews = useSelector(state => Object.values(state.review));

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadReviewsThunk(spotId.spotId))
    }, [dispatch])

    console.log(allReviews);

    let location;
    let reviewId;
    let reviewStatus = false;
    allReviews.forEach(el => {
        if(el.userId === currentUser.user.id) {
            reviewId = el.id
            reviewStatus = true;
        }
    })


    if(reviewStatus) {
        location = `/edit-review/${reviewId}`
    } else {
        location = `/submit-review/${spotId.spotId}`
    }

    const reviewStatusFunc = () => {
        if (reviewStatus) {
            return (
                <button>
                    <NavLink exact to={`${location}`}>Edit Your Review</NavLink>
                </button>
            )
        } else {
            return (
                <button>
                    <NavLink exact to={`${location}`}>Submit Review</NavLink>
                </button>
            )
        }
    }

    return (
        <>
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
                <div>
                {/* console.log(allReviews[0].User.firstName); */}
                </div>
                {allReviews.map(el => {
                    return (
                        <div>
                            <div>
                                {el.User.firstName} {el.User.lastName}
                            </div>
                            <div>
                                {el.createdAt.slice(0,10)}
                            </div>
                            <div>
                                {el.review}
                            </div>
                        </div>

                    )
                })}
            </div>
            <div>
                {reviewStatusFunc()}
            </div>
        </>
    )
}

export default SpotDetailPage
