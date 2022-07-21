const express = require("express");
const router = express.Router();

const { User } = require("../db/models");

// Get all Users
router.get("/", async (req, res) => {
    const users = await User.findAll();
    res.json(users);
})

// Get current User
// TODO: need to implement authentication so that you check that the current user is indeed the one asking for the information
router.get("/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id)
    res.json(user);
})

module.exports = router;
