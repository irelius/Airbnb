const express = require("express")
const router = express.Router();

const { Spot } = require("../../db/models")

// Get all spots
router.get("/", async(req, res) => {
    const allSpots = await Spot.findAll();

    res.json(allSpots);
})


module.exports = router;
