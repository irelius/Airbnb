const express = require('express');
const router = express.Router();

const { Spot, User } = require("../db/models")


// Get all Spots
router.get("/", async (req, res) => {
    let allSpots = await Spot.findAll();
    // res.status(200);
    res.json(allSpots)
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
// TODO response needs to include images and owner
router.get("/:spotId", async (req, res) => {
    let spotId = req.params.spotId;
    let spot = await Spot.findByPk(spotId);

    if (!spot) {
        res.statusCode = 404;
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    } else {
        res.json(spot);
    }
})


// Create a new Spot
// TODO, get access to the current user id to add as the ownerId
router.post("/", async (req, res) => {
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
    }
    catch (e) {
        res.statusCode = 400;
        res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
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
        })
    }
})

// Edit a Spot
// TODO: figure out a way to make sure that the updated information complies with the validations
router.put("/:spotId", async (req, res) => {
    try {
        const spot = await Spot.findByPk(req.params.spotId)
        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        if (spot) {
            spot.update({
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
                id: spot.id,
                ownerId: spot.ownerId,
                address: address,
                city: city,
                state: state,
                country: country,
                lat: lat,
                lng: lng,
                name: name,
                description: description,
                price: price,
                createdAt: spot.createdAt,
                updatedAt: new Date()
            })
        } else {
            res.statusCode = 404;
            res.json({
                "message": "Spot couldn't be found",
                "statusCode": 404
            })
        }
    }
    catch (e) {
        res.statusCode = 400;
        res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
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
        })
    }
})

// Delete a Spot
// TODO: requires proper authorization. spot must belong to current user
router.delete("/:spotId", async (req, res) => {
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
        res.statusCode = 404;
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
})




module.exports = router;
