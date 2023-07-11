'use strict';

const { User, Spot } = require("../models");
const spot = require("../models/spot");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

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
    previewImg: "https://media.istockphoto.com/id/147205632/photo/modern-home-with-swimming-pool.webp?b=1&s=170667a&w=0&k=20&c=hReI56qpeavaJWkqrORE7Jr-usim0olO2W_-GvZRIRY=",
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
    previewImg: "https://www.christiesrealestate.com/blog/wp-content/uploads/2021/12/river-house-estate-telkwa-british-columbia-1.jpg",
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
    previewImg: "https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2019/9/16/0/IO_Tongue-and-Groove_Beech-Street_3.jpg.rend.hgtvcom.616.411.suffix/1568648112267.jpeg",
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
    previewImg: "https://www.gannett-cdn.com/presto/2020/10/27/USAT/34e32c2d-d30c-4459-b3a0-792ba7c07c4d-Sallie_House.jpg",
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
    previewImg: "https://www.mydomaine.com/thmb/7Z1D20vZj7Eex5SIr3E_nJMWw8k=/2048x1536/filters:no_upscale():max_bytes(150000):strip_icc()/SuCasaDesign-Modern-9335be77ca0446c7883c5cf8d974e47c.jpg",
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
    previewImg: "https://www.designcurial.com/Uploads/NewsArticle/4809815/main.jpg",
    numReviews: 0,
    avgStarRating: 0
  }
]


// module.exports = {
//   async up(queryInterface, Sequelize) {
//     try {
//       for (let spot of spots) {
//         const { address, city, state, country, lat, lng, name, description, price, previewImg, numReviews, avgStarRating, ownerId } = spot
//         const foundOwner = await User.findOne({
//           where: {
//             id: spot.ownerId
//           }
//         });
//         // console.log("booba", foundOwner)
//         spot.ownerId = foundOwner.id
//         // await Spot.create({
//         //   ownerId: foundOwner.id,
//         //   address,
//         //   city,
//         //   state,
//         //   country,
//         //   lat,
//         //   lng,
//         //   name,
//         //   description,
//         //   price,
//         //   previewImg,
//         //   numReviews,
//         //   avgStarRating
//         // }, options)
//       }
//       await Spot.bulkCreate(spots)
//     }
//     catch (e) {
//       console.log(e)
//     }
//   },

//   async down(queryInterface, Sequelize) {
//     options.tableName = "Spots";
//     await queryInterface.bulkDelete(options);
//     // await queryInterface.bulkDelete("Spots", null, {});
//   }
// };

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = "Spots"
    return queryInterface.bulkInsert(options, spots)
  },
  down: (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    return queryInterface.bulkDelete(options)
  }
}
