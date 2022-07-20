'use strict';

const { Review, Image, Spot } = require("../models")

const images = [
  {
    imageableId: 1,
    imageableType: "Review",
    url: "https://en.wikipedia.org/wiki/Ocean"
  },
  {
    imageableId: 1,
    imageableType: "Spot",
    url: "https://en.wikipedia.org/wiki/Ocean"
  },
  {
    imageableId: 2,
    imageableType: "Spot",
    url: "https://en.wikipedia.org/wiki/Mountain"
  },
  {
    imageableId: 3,
    imageableType: "Review",
    url: "https://en.wikipedia.org/wiki/Beach"
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
      for (let image of images) {
        const { url, imageableId, imageableType } = image
        let foundId;
        if (image.imageableType === "Review") {
          foundId = await Review.findOne({
            where: {
              id: image.imageableId
            }
          })
        }
        if (image.imageableType === "Spot") {
          foundId = await Spot.findOne({
            where: {
              id: image.imageableId
            }
          })
        }
        await Image.create({
          imageableId: foundId.id,
          imageableType,
          url
        })
      }
    }
    catch (e) {
      console.log(e);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Images", null, {});
  }
};
