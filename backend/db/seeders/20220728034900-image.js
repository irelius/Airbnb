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
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
  },
  {
    reviewId: 3,
    url: "https://expertreviews.b-cdn.net/sites/expertreviews/files/2019/01/three_mobile_review_0.jpg"
  },
  {
    spotId: 4,
    url: "https://www.worldatlas.com/r/w1200/upload/7a/f8/f7/lost-city-of-atlantis.jpg"
  },
  {
    reviewId: 5,
    url: "https://static.vecteezy.com/system/resources/thumbnails/004/256/658/small/five-star-customer-product-ratings-review-flat-icons-for-apps-and-websites-illustration-of-five-golden-yellow-stars-in-a-row-isolated-in-a-white-background-concepts-for-ratings-customers-review-free-vector.jpg"
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
