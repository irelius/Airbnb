const express = require('express');
const router = express.Router();

const { Image } = require("../db/models")


// Get all Images
router.get("/", async (req, res) => {
    let allImages = await Image.findAll();

    res.json(allImages);
})


module.exports = router;
