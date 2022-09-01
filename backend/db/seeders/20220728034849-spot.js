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
    previewImg: "https://images.squarespace-cdn.com/content/v1/5b4f0c8d89c17294e53d4ffc/1533282066069-145RDAGJ0I93OL2TLZLM/Ayada+Maldives+villas+OCEAN+VILLA+%283%29.jpg?format=2500w",
    numReviews: 0,
    avgStarRating: 0
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
    previewImg: "https://s5s6c2i4.stackpathcdn.com/wp-content/uploads/2021/08/Pool_Sunset_Beach_Villa_Exterior_1.jpg",
    numReviews: 0,
    avgStarRating: 0
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
    previewImg: "https://static01.nyt.com/images/2020/10/14/realestate/14IHH-Croatia-slide-VV0Q/14IHH-Croatia-slide-VV0Q-superJumbo.jpg?quality=75&auto=webp&disable=upscale",
    numReviews: 0,
    avgStarRating: 0
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
    previewImg: "https://westernartandarchitecture.com/wp-content/uploads/2020/05/A_Sonoran_Villa_JJ_20-2.jpg",
    numReviews: 0,
    avgStarRating: 0
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
    previewImg: "https://freedesignfile.com/upload/2019/01/Snow-Mountain-Villa-Scenery-Stock-Photo.jpg",
    numReviews: 0,
    avgStarRating: 0
  },
  {
    ownerId: 3,
    address: "666 Sixth Lane",
    city: "Sixth City",
    state: "Sixth State",
    country: "Sixth Country",
    lat: 66.66,
    lng: 66.66,
    name: "Sixth Place",
    description: "Sixth place to ever exist",
    price: 666.66,
    previewImg: "https://static.wikia.nocookie.net/spongefan/images/e/e1/SpongeBob_house.jpg/revision/latest/scale-to-width-down/640?cb=20180210163257",
    numReviews: 0,
    avgStarRating: 0
  },
  {
    ownerId: 1,
    address: "777 Seventh Lane",
    city: "Seventh City",
    state: "Seventh State",
    country: "Seventh Country",
    lat: 77.77,
    lng: 77.77,
    name: "Seventh Place",
    description: "Seventh place to ever exist",
    price: 777.77,
    previewImg: "https://static.wikia.nocookie.net/adventuretimesuperfans/images/1/17/Ooo.jpg/revision/latest?cb=20120415202605",
    numReviews: 0,
    avgStarRating: 0
  },
  {
    ownerId: 2,
    address: "888 Eigth Lane",
    city: "Eigth City",
    state: "Eigth State",
    country: "Eigth Country",
    lat: 88.88,
    lng: 88.88,
    name: "Eigth Place",
    description: "Eigth place to ever exist",
    price: 888.88,
    previewImg: "https://static.wikia.nocookie.net/disney/images/1/14/The_Owl_House_33.png/revision/latest?cb=20190720073620",
    numReviews: 0,
    avgStarRating: 0
  },
  {
    ownerId: 3,
    address: "999 Ninth Lane",
    city: "Ninth City",
    state: "Ninth State",
    country: "Ninth Country",
    lat: 9.9,
    lng: 99.99,
    name: "Ninth Place",
    description: "Ninth place to ever exist",
    price: 999.99,
    previewImg: "https://static.wikia.nocookie.net/disney/images/5/50/S1e4_mystery_shack.png/revision/latest?cb=20150714211909",
    numReviews: 0,
    avgStarRating: 0
  },
  {
    ownerId: 1,
    address: "1000 Tenth Lane",
    city: "Tenth City",
    state: "Tenth State",
    country: "Tenth Country",
    lat: 10.10,
    lng: 10.10,
    name: "Tenth Place",
    description: "Tenth place to ever exist",
    price: 100.10,
    previewImg: "https://static.wikia.nocookie.net/simpsons/images/6/65/800px-742_Evergreen_Terrace.png/revision/latest?cb=20170101225756",
    numReviews: 0,
    avgStarRating: 0
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
