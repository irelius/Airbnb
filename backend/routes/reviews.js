const express = require('express');
const router = express.Router();

const { Review } = require("../db/models")


// Get all Reviews
router.get("/", async (req, res) => {
    let allReviews = await Review.findAll();

    res.json(allReviews)
})


module.exports = router;
