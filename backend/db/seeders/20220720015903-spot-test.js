'use strict';

const killPort = require("kill-port");

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
    await queryInterface.bulkInsert("Spots", [
      {
        ownerId: 1,
        address: "111 First Lane",
        city: "First City",
        state: "First State",
        Country: "First Country",
        lat: 11.11,
        lng: 11.11,
        name: "First Place",
        descriptiion: "First place to ever exist",
        price: 111.11,
        previewImg: "https://en.wikipedia.org/wiki/Ocean",
        numReviews: 1,
        avgStarRating: 1.1
      },
      {
        ownerId: 2,
        address: "222 Second Lane",
        city: "Second City",
        state: "Second State",
        Country: "Second Country",
        lat: 22.22,
        lng: 22.22,
        name: "Second Place",
        descriptiion: "Second place to ever exist",
        price: 222.22,
        previewImg: "https://en.wikipedia.org/wiki/Beach",
        numReviews: 2,
        avgStarRating: 2.2
      },
      {
        ownerId: 3,
        address: "333 Third Lane",
        city: "Third City",
        state: "Third State",
        Country: "Third Country",
        lat: 33.33,
        lng: 33.33,
        name: "Third Place",
        descriptiion: "Third place to ever exist",
        price: 333.33,
        previewImg: "https://en.wikipedia.org/wiki/Mountain",
        numReviews: 3,
        avgStarRating: 3.3
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
     await queryInterface.bulkDelete('Spots', null, {});
  }
};
