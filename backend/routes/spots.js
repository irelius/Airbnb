const express = require('express');
const router = express.Router();

const { Spot, User } = require("../db/models")


// Get all Spots
router.get("/", async (req, res, next) => {
    let Spots = await Spot.findAll();
    // res.status(200);
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
        const error = new Error("Spot couldn't be found")
        error.status = 404;
        next(error)
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
        res.json({
            id: newSpot.id,
            // ownerId: userId -- need to get this
            address: address,
            city: city,
            state: state,
            country: country,
            lat: lat,
            lng: lng,
            name: name,
            description: description,
            price: price,
            createdAt: newSpot.createdAt,
            updatedAt: newSpot.updatedAt
        })
    }
    catch (e) {
        const error = new Error("Validation Error");
        error.status = 400;
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
        next(error);
    }
})

// Edit a Spot
// TODO: figure out a way to make sure that the updated information complies with the validations
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
            res.json({
                id: updateSpot.id,
                ownerId: updateSpot.ownerId,
                address: address,
                city: city,
                state: state,
                country: country,
                lat: lat,
                lng: lng,
                name: name,
                description: description,
                price: price,
                createdAt: updateSpot.createdAt,
                updatedAt: new Date()
            })
        } else {
            const error = new Error("Spot couldn't be found")
            error.status = 404;
            next(error);
        }
    }
    catch (e) {
        const error = new Error("Validation Error");
        error.status = 400;
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
        next(error);
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
        const error = new Error("Spot couldn't be found");
        error.status = 404;
        next(error);
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
