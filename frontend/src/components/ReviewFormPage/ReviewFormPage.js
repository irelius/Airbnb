import "./ReviewFormPage.css"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addReviewThunk } from "../../store/review";
import { useParams } from "react-router-dom";

function ReviewFormPage() {
    const dispatch = useDispatch();
    const spotId = useParams();
    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newReview = {
            spotId: spotId,
            review,
            stars
        }

        dispatch(addReviewThunk(newReview))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Review"
                    required
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
                <input
                    type=""
                    placeholder="Star Rating"
                    required
                    min="1"
                    max="5"
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                />
                <button type="submit">
                    Submit Review
                </button>
            </form>
        </div>

    )
}

export default ReviewFormPage
