// backend/utils/auth.js
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User, Spot, Image, Review, Booking } = require('../db/models');

const { secret, expiresIn } = jwtConfig;




// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
    // Create the token.
    const token = jwt.sign(
        { data: user.toSafeObject() },
        secret,
        { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Set the token cookie
    res.cookie('token', token, {
        maxAge: expiresIn * 1000, // maxAge in milliseconds
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax"
    });

    return token;
};

// Restore user
const restoreUser = (req, res, next) => {
    // token parsed from cookies
    const { token } = req.cookies;
    req.user = null;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            return next();
        }

        try {
            const { id } = jwtPayload.data;
            req.user = await User.scope('currentUser').findByPk(id);
        } catch (e) {
            res.clearCookie('token');
            return next();
        }

        if (!req.user) res.clearCookie('token');

        return next();
    });
};

// If there is no current user, return an error
const requireAuth = function (req, _res, next) {
    if (req.user) return next();

    const err = new Error('Unauthorized');
    err.errors = ['Unauthorized'];
    err.status = 401;
    err.statusCode = 401;
    return next(err);
}


// Authentication required
const authenticationRequired = function (req, res, next) {
    const user = req.user
    if (!user) {
        const error = new Error("Authentication required");
        error.statusCode = 401;
        error.status = 401
        return next(error);
    }
    return next();
}

// Authorization required for Spots
const authorizationRequiredSpots = async function (req, res, next) {
    const spot = await Spot.findByPk(req.params.spotId)
    if (req.user.id !== spot.ownerId) {
        const error = new Error("Forbidden");
        error.statusCode = 403;
        error.status = 403
        return next(error);
    }
    return next();
}

// Authorization required for Reviews
const authorizationRequiredReviews = async function (req, res, next) {
    const review = await Review.findByPk(req.params.reviewId);
    if (req.user.id !== review.userId) {
        const error = new Error("Forbidden");
        error.statusCode = 403;
        error.status = 403
        return next(error);
    }
    return next();
}

// Authorization not required for Booking
const authorizationNotRequiredBookings = async function (req, res, next) {
    const booking = await Booking.findByPk(req.params.spotId);
    if (req.user.id === booking.userId) {
        const error = new Error("Forbidden");
        error.statusCode = 403;
        error.status = 403
        return next(error);
    }
    return next();
}

// Authorization required for Booking
const authorizationRequiredBookings = async function (req, res, next) {
    if (req.params.spotId) {
        const spot = await Spot.findByPk(req.params.spotId);
        if (req.user.id !== spot.ownerId) {
            const error = new Error("Forbidden");
            error.statusCode = 403;
            error.status = 403
            return next(error);
        }
        return next();
    }
    else if (req.params.bookingId) {
        const booking = await Booking.findByPk(req.params.bookingId);
        if (req.user.id !== booking.userId) {
            const error = new Error("Forbidden");
            error.statusCode = 403;
            error.status = 403
            return next(error);
        }
        return next();
    }
}


// Authorization required for Images
const authorizationRequiredImages = async function (req, res, next) {
    if (req.params.spotId) {
        const spot = await Spot.findByPk(req.params.spotId);
        if (spot.ownerId !== req.user.id) {
            const error = new Error('Unauthorized');
            error.errors = ['Unauthorized'];
            error.status = 401;
            return next(error);
        }
        return next();
    }
    if (req.params.reviewId) {
        const review = await Review.findByPk(req.params.reviewId);
        if (req.user.id !== review.userId) {
            const error = new Error("Forbidden");
            error.statusCode = 403;
            error.status = 403
            return next(error);
        }
        return next();
    }
    if(req.params.imageId) {
        const deleteImage = await Image.findByPk(req.params.imageId)
        const reviewCheck = await Review.findOne({
            where: {
                id: deleteImage.reviewId
            }
        })
        const spotCheck = await Spot.findOne({
            where: {
                id: deleteImage.spotId
            }
        })
        if (reviewCheck && reviewCheck.userId !== req.user.id) {
            const error = new Error("Forbidden");
            error.statusCode = 403;
            error.status = 403
            return next(error);
        }
        if (spotCheck && spotCheck.ownerId !== req.user.id) {
            const error = new Error("Forbidden");
            error.statusCode = 403;
            error.status = 403
            return next(error);
        }
        return next();
    }
}

module.exports = {
    setTokenCookie,
    restoreUser,
    requireAuth,
    authenticationRequired,
    authorizationRequiredSpots,
    authorizationRequiredReviews,
    authorizationNotRequiredBookings,
    authorizationRequiredBookings,
    authorizationRequiredImages
};
