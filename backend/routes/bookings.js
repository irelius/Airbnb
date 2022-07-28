const express = require('express');
const router = express.Router();

const { Booking, Spot } = require("../db/models")

// Helper function for validation error
const validationError = (message, code) => {
    let error = new Error("Validation error");
    error.statusCode = code;
    error.errors = {
        "endDate": message
    }
    return error;
}

// helper function for a particular element not found
const notFound = (el, code) => {
    let error = new Error(`${el} couldn't be found`);
    error.statusCode = code;
    return error
}

// helper function for a review that already exists, may not need since this only occurs once?
const bookingExists = () => {
    let error = new Error("Sorry, this spot is already booked for the specified dates");
    error.statusCode = 403;
    error.errors = {
        "startDate": "Start date conflicts with an existing booking",
        "endDate": "End date conflicts with an existing booking"
    }
    return error
}


// Get all Bookings
router.get("/", async (req, res) => {
    let allBookings = await Booking.findAll();
    res.json(allBookings)
})


// Get all of the Current User's Bookings
// TODO: authentication required, verification that the person asking for the details is indeed the current user
// router.get("/current", async(req, res, next) => {
// })


// Get all Bookings for a Spot based on the Spot's id
// TODO: authenciation required to check if person asking is the owner of the spot
// if not owner, then only spotId, startDate and endDate
// if owner, then include user table, id, spotId, userId, startDate, endDate, createdAt, updatedAt
router.get("/:spotId", async (req, res, next) => {
    const spotId = req.params.spotId
    // find all bookings for a particular spot
    const Bookings = await Booking.findAll({
        where: {
            spotId: spotId
        }
    })

    // error response for no spots
    if (Bookings.length < 1) {
        return next(notFound("Spot", 404))
    } else {
        // successful response with all Bookings based on Spot id
        res.statusCode = 200;
        res.json({ Bookings })
    }
})


// Create a Booking from a Spot based on the Spot's id
// TODO: authentication required, spot must NOT belong to the current user
// TODO: go through and finish the validations on the models
router.post("/:spotId", async (req, res, next) => {
    const spotId = req.params.spotId;
    const { startDate, endDate } = req.body;
    const findSpot = await Spot.findByPk(spotId)


    // error response: body validation errors
    if(endDate <= startDate) {
        return next(validationError("endDate cannot be on or before startDate", 400))
    }

    // error response: couldn't find a Spot with the specified id
    if(!findSpot) {
        return next(notFound("Spot", 404))
    }

    // error response: booking conflict
    const bookingCheck = await Booking.findAll({
        where: {
            spotId: spotId
        }
    })

    for(let booking of bookingCheck) {
        if(startDate <= booking.startDate && startDate <= booking.endDate && endDate >= booking.startDate) {
            return next(bookingExists())
        }
        if(startDate >= booking.startDate && startDate <= booking.endDate && endDate >= booking.endDate) {
            return next(bookingExists())
        }
        if(startDate >= booking.startDate && startDate <= booking.endDate && endDate <= booking.endDate) {
            return next(bookingExists())
        }
    }

    // send successful post response
    const newBooking = await Booking.create({
        spotId: spotId,
        // userId: userId, --need to figure this one out
        startDate: startDate,
        endDate: endDate
    })
    res.statusCode = 200;
    res.json(
        newBooking
    )
})


// Edit a Booking
// TODO: authentication required, booking must belong to current user
router.put("/:bookingId", async (req, res, next) => {
    const bookingId = req.params.bookingId
    const { startDate, endDate } = req.body;
    const updateBooking = await Booking.findByPk(bookingId);
    const bookingCheck = await Booking.findAll({
        where: {
            id: bookingId
        }
    })

    let compareCurrentDate = new Date();
    compareCurrentDate = compareCurrentDate.toISOString().split("T")[0]

    // body validation error: endDate cannot come before startDate
    if (endDate <= startDate) {
        return next(validationError("endDate cannot come before startDate", 400))
    }


    // Can't edit a booking that's past the end date
    if (updateBooking.endDate < compareCurrentDate) {
        const error = new Error("Past bookings can't be modified")
        error.statusCode = 400
        return next(error);
    }


    // booking conflict
    for(let booking of bookingCheck) {
        if(startDate <= booking.startDate && startDate <= booking.endDate && endDate >= booking.startDate) {
            return next(bookingExists())
        }
        if(startDate >= booking.startDate && startDate <= booking.endDate && endDate >= booking.endDate) {
            return next(bookingExists())
        }
        if(startDate >= booking.startDate && startDate <= booking.endDate && endDate <= booking.endDate) {
            return next(bookingExists())
        }
    }


    // Update or Couldn't find a Booking with the specified id
    if (updateBooking) {
        updateBooking.update({
            startDate: startDate,
            endDate: endDate,
            updatedAt: new Date()
        })
        // send the response for successful update
        res.statusCode = 200;
        res.json({
            updateBooking
        })
    } else {
        return next(notFound("Booking", 404))
    }
})


router.delete("/:bookingId", async(req, res, next) => {
    const bookingId = req.params.bookingId;
    const deleteBooking = await Booking.findByPk(bookingId);

    if(deleteBooking) {
        await Booking.destroy({
            where: {
                id: bookingId
            }
        })
        res.statusCode = 200;
        res.json({
            message: "Successfully delete",
            statusCode: 200
        })
    } else {
        return next(notFound("Booking", 404))
    }
})


// Error middleware
router.use((error, req, res, next) => {
    res.json({
        message: error.message,
        statusCode: error.statusCode,
        errors: error.errors
    })
})

module.exports = router;
