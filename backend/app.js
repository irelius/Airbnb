require('express-async-errors');
require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());


// landing pad
app.get("/", async(req, res) => {
    res.json("Hello World")
})

// Users
app.use("/users", require("./routes/users"));

// Spots
app.use("/spots", require("./routes/spots"))

// Bookings
app.use("/bookings", require("./routes/bookings"))

// Reviews
app.use("/reviews", require("./routes/reviews"))

// Images
app.use("/images", require("./routes/images"))



const port = 8000;
app.listen(port, () => console.log('Server is listening on port', port));
