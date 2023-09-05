import "./CreateReview.css"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addReviewThunk } from "../../../store/review";
import { useParams, useHistory } from "react-router-dom";

function CreateReview() {
    const history = useHistory();
    const dispatch = useDispatch();
    const spotId = useParams();
    const currentUser = useSelector(state => state.session);
    if (!currentUser) {
        history.push("/")
    }

    const [review, setReview] = useState("");
    const [stars, setStars] = useState(1);


    const handleSubmit = (e) => {
        e.preventDefault();

        const newReview = {
            spotId: spotId,
            review,
            stars
        }

        dispatch(addReviewThunk(newReview))
        window.location.href = `/spot-details/${spotId.spotId}`
    }

    return (
        <div id="submit-review-main">
            <form onSubmit={handleSubmit} id="review-form">
                <p id="review-title">Type Your Review</p>
                <input
                    type="text"
                    required
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
                <p id="review-title">Give This Location a Rating</p>
                <input
                    type="number"
                    required
                    min="1"
                    max="5"
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                />
                <button type="submit" id="submit-review-button" className="ffffff no-border">
                    Submit Review
                </button>
            </form>
        </div>

    )
}

export default CreateReview
