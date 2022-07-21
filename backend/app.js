require('express-async-errors');
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';

app.use(morgan('dev'));

app.use(cookieParser());
app.use(express.json());

const routes = require('./routes');

const { Spot } = require("../../db/models")

// //__________________________________________________________________________
// // Security Middleware
// if (!isProduction) {
//     // enable cors only in development
//     app.use(cors());
// }

// // helmet helps set a variety of headers to better secure your app
// app.use(
//     helmet.crossOriginResourcePolicy({
//         policy: "cross-origin"
//     })
// );

// // Set the _csrf token and create req.csrfToken method
// app.use(
//     csurf({
//         cookie: {
//             secure: isProduction,
//             sameSite: isProduction && "Lax",
//             httpOnly: true
//         }
//     })
// );
// //__________________________________________________________________________


// app.use(routes); // Connect all the routes

app.get("/spots", async(req, res) => {
    const allSpots = await Spot.findAll();

    res.json(allSpots);
})




module.exports = app;
