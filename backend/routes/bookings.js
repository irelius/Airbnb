const express = require('express');
const router = express.Router();

const { Booking } = require("../db/models")


// Get all Bookings
router.get("/", async (req, res) => {
    let allBookings = await Booking.findAll();
    res.json(allBookings)
})


module.exports = router;
