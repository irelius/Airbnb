import "./SpotDetailPage.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadReviewsThunk } from "../../../store/review";

function SpotDetailPage() {
    const spotId = useParams();
    const dispatch = useDispatch();
    const [reviewStatus, setReviewStatus] = useState(false);

    useEffect(() => {
        dispatch(loadReviewsThunk(spotId.spotId))
    }, [dispatch])

    const allReviews = useSelector(state => Object.values(state.review));
    console.log(allReviews);

    const handleReview = () => {
        if(reviewStatus) {

        } else {

        }
    }

    const reviewStatusFunc = () => {
        if (reviewStatus) {
            return (
                <button onClick={handleReview}>
                    Edit your Review
                </button>
            )
        } else {
            return (
                <button onClick={handleReview}>
                    Submit Review
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
                {reviewStatusFunc()}
            </div>
        </>
    )
}

export default SpotDetailPage
