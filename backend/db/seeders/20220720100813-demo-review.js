'use strict';

const { User, Spot, Review } = require("../models")

const reviews = [
  {
    userId: 1,
    spotId: 1,
    review: "Strictly speaking of quality, it is ok. But for the price, great value.",
    stars: 4,
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
  }
]

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    try {
      for (let reviewEl of reviews) {
        const { review, stars, userId, spotId } = reviewEl
        const foundSpotId = await Spot.findOne({
          where: {
            id: reviewEl.spotId
          }
        });
        const foundUserId = await User.findOne({
          where: {
            id: reviewEl.userId
          }
        });
        await Review.create({
          review,
          stars,
          userId: foundUserId.id,
          spotId: foundSpotId.id,
        })
      }
    }
    catch (e) {
      console.log(e)
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Reviews", null, {});
  }
};
