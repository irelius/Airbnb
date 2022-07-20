'use strict';

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
    await queryInterface.bulkInsert("Reviews", [
      {
        review: "Strictly speaking of quality, it's ok. But for the price, great value.",
        stars: 4,
        userId: 1,
        spotId: 1
      },
      {
        review: "crappy location. rude hosts.",
        stars: 1,
        userId: 1,
        spotId: 2
      },
      {
        review: "Amazing sights and venue.",
        stars: 5,
        userId: 2,
        spotId: 3
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Reviews', null, {});
  }
};
