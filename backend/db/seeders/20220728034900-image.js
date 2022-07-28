'use strict';

const { Review, Image, Spot } = require("../models")

const images = [
  {
    reviewId: 1,
    url: "https://i.pcmag.com/imagery/reviews/05b8x8deW1h5MNBu9zcqYUx-1.fit_scale.size_760x427.v1644512187.png"
  },
  {
    spotId: 1,
    url: "https://res.cloudinary.com/dtpgi0zck/image/upload/s--IJwO_Hss--/c_fill,h_580,w_860/v1/EducationHub/photos/ocean-waves.webp"
  },
  {
    spotId: 2,
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80"
  },
  {
    reviewId: 3,
    url: "https://image.shutterstock.com/image-illustration/five-golden-stars-best-rating-260nw-657712999.jpg"
  },
  {
    spotId: 4,
    url: "https://www.worldatlas.com/r/w1200/upload/7a/f8/f7/lost-city-of-atlantis.jpg"
  },
  {
    reviewId: 5,
    url: "https://www.pngkey.com/png/detail/4-47353_3-stars-3-.png"
  }
]

module.exports = {
  async up(queryInterface, Sequelize) {
    for (let image of images) {
      const { url, reviewId, spotId } = image
      let foundId;

      if (image.reviewId) {
        foundId = await Review.findByPk(image.reviewId)
        await Image.create({
          reviewId: foundId.id,
          url
        })

      }
      if (image.spotId) {
        foundId = await Spot.findByPk(image.spotId)
        await Image.create({
          spotId: foundId.id,
          url
        })
      }
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Images", null, {});
  }
};
