// backend/routes/api/index.js
const router = require('express').Router();

const { restoreUser } = require("../../utils/auth.js");
router.use(restoreUser);

const usersRouter = require('./users');
const spotsRouter = require('./spots')
const imagesRouter = require('./images')
const reviewsRouter = require('./reviews')
const bookingsRouter = require("./bookings")
const mapsRouter = require("./maps")

router.use('/users', usersRouter);
router.use("/spots", spotsRouter);
router.use("/images", imagesRouter);
router.use("/reviews", reviewsRouter);
router.use("/bookings", bookingsRouter);
router.use("/maps", mapsRouter)


// Error middleware
router.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    message: error.message,
    statusCode: error.status,
    errors: error.errors
  })
})

module.exports = router;
