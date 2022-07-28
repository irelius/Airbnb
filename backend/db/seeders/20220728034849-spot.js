'use strict';

const { User, Spot } = require("../models")

const spots = [
  {
    ownerId: 1,
    address: "111 First Lane",
    city: "First City",
    state: "First State",
    country: "First Country",
    lat: 11.11,
    lng: 11.11,
    name: "First Place",
    description: "First place to ever exist",
    price: 111.11,
    previewImg: "https://en.wikipedia.org/wiki/Ocean",
    numReviews: null,
    avgStarRating: null
  },
  {
    ownerId: 2,
    address: "222 Second Lane",
    city: "Second City",
    state: "Second State",
    country: "Second Country",
    lat: 22.22,
    lng: 22.22,
    name: "Second Place",
    description: "Second place to ever exist",
    price: 222.22,
    previewImg: "https://en.wikipedia.org/wiki/Beach",
    numReviews: null,
    avgStarRating: null
  },
  {
    ownerId: 3,
    address: "333 Third Lane",
    city: "Third City",
    state: "Third State",
    country: "Third Country",
    lat: 33.33,
    lng: 33.33,
    name: "Third Place",
    description: "Third place to ever exist",
    price: 333.33,
    previewImg: "https://en.wikipedia.org/wiki/Mountain",
    numReviews: null,
    avgStarRating: null
  },
  {
    ownerId: 1,
    address: "444 Fourth Lane",
    city: "Fourth City",
    state: "Fourth State",
    country: "Fourth Country",
    lat: 44.44,
    lng: 44.44,
    name: "Fourth Place",
    description: "Fourth place to ever exist",
    price: 444.44,
    previewImg: "https://en.wikipedia.org/wiki/Atlantis",
    numReviews: null,
    avgStarRating: null
  },
  {
    ownerId: 2,
    address: "555 Fifth Lane",
    city: "Fifth City",
    state: "Fifth State",
    country: "Fifth Country",
    lat: 55.55,
    lng: 55.55,
    name: "Fifth Place",
    description: "Fifth place to ever exist",
    price: 555.55,
    previewImg: "https://en.wikipedia.org/wiki/Mount_Olympus",
    numReviews: null,
    avgStarRating: null
  }
]


module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      for (let spot of spots) {
        const { address, city, state, country, lat, lng, name, description, price, previewImg, numReviews, avgStarRating, ownerId } = spot
        const foundOwner = await User.findOne({
          where: {
            id: spot.ownerId
          }
        });
        await Spot.create({
          ownerId: foundOwner.id,
          address,
          city,
          state,
          country,
          lat,
          lng,
          name,
          description,
          price,
          previewImg,
          numReviews,
          avgStarRating
        })
      }
    }
    catch (e) {
      console.log(e)
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Spots", null, {});
  }
};
