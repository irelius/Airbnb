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
    await queryInterface.bulkInsert("Images", [
      {
        imageableId: 1,
        imageableType: "Spots",
        url: "https://en.wikipedia.org/wiki/Ocean"
      },
      {
        imageableId: 2,
        imageableType: "Spots",
        url: "https://en.wikipedia.org/wiki/Mountain"
      },
      {
        imageableId: 3,
        imageableType: "Spots",
        url: "https://en.wikipedia.org/wiki/Beach"
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
     await queryInterface.bulkDelete('Images', null, {});
  }
};
