const express = require('express');
const router = express.Router();

const { Spot, User } = require("../db/models")


// Helper function for validation error
const validationError = (code) => {
    let error = new Error("Validation error");
    error.statusCode = code;
    error.errors = {
        "address": "Street address is required",
        "city": "City is required",
        "state": "State is required",
        "country": "Country is required",
        "lat": "Latitude is not valid",
        "lng": "Longitude is not valid",
        "name": "Name must be less than 50 characters",
        "description": "Description is required",
        "price": "Price per day is required"
    }
    return error;
}

// helper function for a particular element not found
const notFound = (el, code) => {
    let error = new Error(`${el} couldn't be found`);
    error.statusCode = code;
    return error
}




// Get all Spots: landing spot code
router.get("/", async (req, res, next) => {
    let Spots = await Spot.findAll();
    res.statusCode = 200;
    res.json({
        Spots
    })
})


// Get Spots owned by Current User
// TODO: need to implement authentication so that you check that the current user is indeed the one asking for the information
// router.get("/current", async(req, res) => {
//     let allSpots = await Spot.findAll({
//         where: {
//             ownerId: userId
//         }
//     })
//     res.json(allSpots);
// })


// Get Spots by spot id
// TODO response needs to include images and owner tables
router.get("/:spotId", async (req, res, next) => {
    let spotId = req.params.spotId;
    let spot = await Spot.findByPk(spotId);

    if (!spot) {
        return next(notFound("Spot", 404));
    } else {
        res.json(spot);
    }
})


// Create a Spot
// TODO, get access to the current user id to add as the ownerId
router.post("/", async (req, res, next) => {
    try {
        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        const newSpot = await Spot.create({
            // ownerId: userId -- need to get this
            address: address,
            city: city,
            state: state,
            country: country,
            lat: lat,
            lng: lng,
            name: name,
            description: description,
            price: price
        })

        res.statusCode = 201;
        res.json(newSpot)
    }
    catch (e) {
        return next(validationError(400))
    }
})

// Edit a Spot
// TODO: figure out a way to make sure that the updated information complies with the validations
// TODO: authenticaiton required, spot must belong to user
router.put("/:spotId", async (req, res, next) => {
    try {
        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        const updateSpot = await Spot.findByPk(req.params.spotId)
        if (updateSpot) {
            updateSpot.update({
                address: address,
                city: city,
                state: state,
                country: country,
                lat: lat,
                lng: lng,
                name: name,
                description: description,
                price: price,
            })

            res.statusCode = 200;
            updateSpot.updatedAt = new Date()
            res.json(
                updateSpot
            )
        } else {
            return next(notFound("Spot", 404));
        }
    }
    catch (e) {
        return next(validationError(400));
    }
})

// Delete a Spot
// TODO: requires proper authorization. spot must belong to current user
router.delete("/:spotId", async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (spot) {
        await Spot.destroy({
            where: {
                id: req.params.spotId
            }
        })
        res.statusCode = 200;
        res.json({
            message: "Successfully deleted",
            statusCode: 200
        })
    } else {
        return next(notFound("Spot", 404));
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
