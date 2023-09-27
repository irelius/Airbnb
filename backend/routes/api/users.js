// backend/routes/api/users.js
const express = require('express')
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth, restoreUser, authenticationRequired } = require('../../utils/auth');
const { User } = require('../../db/models');

const validateSignup = [
    check('email')
        .notEmpty()
        .isEmail()
        .withMessage('Invalid email'),
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('First Name is required'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Last Name is required'),
    check('password')
        .notEmpty()
        .withMessage('Password is required'),
    handleValidationErrors
];

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .withMessage('Email or Username is required'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Password is required'),
    handleValidationErrors
];


const checkEmail = async (req, res, next) => {
    const { email } = req.body
    const findEmail = await User.findOne({
        where: {
            email: email
        }
    })
    if (findEmail) {
        const error = new Error("Validation Error");
        error.status = 403;
        error.statusCode = 403;
        error.errors = {
            "email": "User with that email already exists"
        }
        return next(error);
    }
    return next();
}



// ________________________________________________________________________________________

// Log in
router.post('/login', validateLogin, async (req, res, next) => {
    const { credential, password } = req.body;
    const user = await User.login(credential, password);
    // errors if credentials are invalid
    if (!user) {
        const err = new Error('Invalid credentials');
        err.status = 401;
        err.statusCode = 401;
        return next(err);
    }
    await setTokenCookie(res, user);
    res.json(user);
});

// Log out
router.delete('/logout', (_req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Successfully logged out' });
});


// Restore session user
router.get('/restore', restoreUser, (req, res) => {
    const { user } = req;

    if (user) {
        return res.json({
            user: user
        });
    } else return res.json({});
});



// Sign up
router.post('/signup', [validateSignup, checkEmail], async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    const user = await User.signup(firstName, lastName, email, password);
    await setTokenCookie(res, user);
    user.dataValues.token = req.cookies.token;
    return res.json(user);
});


// get Current user
router.get("/current", [restoreUser, authenticationRequired], (req, res, next) => {
    return res.json(req.user);
});



// test
router.get("/test", async (req, res) => {
    return res.json("test")
})


module.exports = router;
