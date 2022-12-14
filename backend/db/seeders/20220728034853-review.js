'use strict';

const { User, Spot, Review } = require("../models")

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const reviews = [
  {
    userId: 1,
    spotId: 1,
    review: "Strictly speaking of quality, it is ok. But for the price, great value.",
    stars: 4,
  },
  {
    userId: 2,
    spotId: 1,
    review: "Test multiple reviews for one spot",
    stars: 5,
  },
  {
    userId: 1,
    spotId: 2,
    review: "crappy location. rude hosts.",
    stars: 1,
  },
  {
    userId: 2,
    spotId: 3,
    review: "Amazing sights and venue.",
    stars: 5,
  },
  {
    userId: 3,
    spotId: 4,
    review: "Lots of water",
    stars: 2,
  },
  {
    userId: 3,
    spotId: 5,
    review: "meh",
    stars: 3
  }
]

// module.exports = {
//   async up (queryInterface, Sequelize) {
//      try {
//       // for(let reviewEl of reviews) {
//       //   const {review, stars, userId, spotId} = reviewEl
//       //   const foundSpotId = await Spot.findOne({
//       //     where: {
//       //       id: reviewEl.spotId
//       //     }
//       //   });
//       //   const foundUserId = await User.findOne({
//       //     where: {
//       //       id: reviewEl.userId
//       //     }
//       //   });
//       //   await Review.create({
//       //     review,
//       //     stars,
//       //     userId: foundUserId.id,
//       //     spotId: foundSpotId.id,
//       //   }, options)
//       // }
//       // options.tableName="Reviews"
//       await Review.bulkCreate(reviews)
//     }
//     catch (e) {
//       console.log(e)
//     }
//   },

//   async down (queryInterface, Sequelize) {
//     options.tableName = "Reviews"
//     await queryInterface.bulkDelete(options, "Reviews", null, {});
//     // await queryInterface.bulkDelete("Reviews", null, {});
//   }
// };

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = "Reviews"
    return queryInterface.bulkInsert(options, reviews)
  },
  down: (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    return queryInterface.bulkDelete(options)
  }
}
