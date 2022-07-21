const express = require('express');
const router = express.Router();

const { Spot } = require("../db/models")


// Get all Spots
router.get("/", async (req, res) => {
    let spots = await Spot.findAll();
    res.json(spots)
})


module.exports = router;
