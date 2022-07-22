const express = require('express');
const router = express.Router();

const { Review, Spot } = require("../db/models")

// Helper function for validation error
const validationError = (code) => {
    let error = new Error("Validation error");
    error.status = code;
    error.errors = {
        "review": "Review text is required",
        "stars": "Stars must be an integer from 1 to 5",
    }
    return error;
}

// helper function for a particular element not found
const notFound = (el, code) => {
    let error = new Error(`${el} couldn't be found`);
    error.status = code;
    return error
}

// helper function for a review that already exists, may not need since this only occurs once?
const reviewExists = (el, code) => {
    let error = new Error(`${el} already has a review for this spot`);
    error.status = code;
    return error
}

// Get all Reviews
router.get("/", async (req, res, next) => {
    let allReviews = await Review.findAll();

    res.json(allReviews)
})


// Get all Reviews of the Current User
// TODO need to figure out how to configure current
// router.get("/current", async(req, res, next) => {
// })


// Get all Reviews by a Spot's id
// TODO: response should include User and images as included tables
router.get("/:spotId", async (req, res, next) => {
    let Reviews = await Review.findAll({
        where: {
            spotId: req.params.spotId
        }
    })
    if (Reviews.length > 0) {
        res.statusCode = 200;
        res.json({
            Reviews
        })
    } else {
        next(notFound("Spot"))
    }
})


// Create a Review for a Spot based on the Spot's id
// TODO: authentication required
// TODO: check if a review already exists from the user
// TODO: figure out why the validation isn't working (maybe because I haven't added the different validations yet? kinda working?)
router.post("/:spotId", async (req, res, next) => {
    try {
        const { review, stars } = req.body;
        const spotId = req.params.spotId;
        const newReview = await Review.create({
            review: review,
            stars: stars
        })

        // check if the spot exists to post the new review
        const findSpot = await Spot.findByPk(spotId)
        if (!findSpot) {
            next(notFound("Spot", 404));
        }

        // check if user already has a review for this spot
        // if() {
        //     next(reviewExists("User", 403))
        // }

        res.statusCode = 200;
        res.json({
            id: newReview.id,
            // userId: newReview.userid,
            spotId: spotId,
            review: review,
            stars: stars,
            createdAt: newReview.createdAt,
            updatedAt: newReview.updatedAt
        })
    }
    catch (e) {
        next(validationError(400));
    }
})


router.put("/:reviewId", async (req, res, next) => {
    try {
        const { review, stars } = req.body;

        const updateReview = await Review.findByPk(req.params.reviewId)
        if (updateReview) {
            updateReview.update({
                review: review,
                stars: stars
            })
        }

        // check if the spot exists to post the new review
        const findReview = await Review.findByPk(req.params.reviewId)
        if (!findReview) {
            next(notFound("Review", 404));
        }

        res.statusCode = 200;
        res.json({
            id: updateReview.id,
            userId: updateReview.userId,
            spotId: updateReview.spotId,
            review: review,
            stars: stars,
            createdAt: updateReview.createdAt,
            updatedAt: new Date()
        })
    }
    catch (e) {
        next(validationError(400));
    }
})


router.delete("/reviewId", async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId);
    if (review) {
        await Review.destroy({
            where: {
                id: req.params.reviewId
            }
        })
        res.statusCode = 200;
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    } else {
        next(notFound("Review", 404));
    }
})


// Error middleware
router.use((error, req, res, next) => {
    res.json({
        message: error.message,
        statusCode: error.status,
        errors: error.errors
    })
})

module.exports = router;
