'use strict';

const { User, Spot, Booking } = require("../models")

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const bookings = [
  {
    spotId: 1,
    userId: 2,
    startDate: "2022-01-17",
    endDate: "2023-01-17"
  },
  {
    spotId: 2,
    userId: 1,
    startDate: "2022-06-23",
    endDate: "2023-06-23"
  },
  {
    spotId: 3,
    userId: 2,
    startDate: "2022-06-23",
    endDate: "2023-06-23"
  },
  {
    spotId: 4,
    userId: 3,
    startDate: "2055-05-15",
    endDate: "2055-12-35"
  },
  {
    spotId: 5,
    userId: 3,
    startDate: "2055-05-15",
    endDate: "2055-12-35"
  }
]

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     try {
//       for(let booking of bookings) {
//         const { spotId, userId, startDate, endDate} = booking;
//         const foundSpotId = await Spot.findByPk(booking.spotId);
//         const foundUserId = await User.findByPk(booking.userId);
//         await Booking.create({
//           userId: foundUserId.id,
//           spotId: foundSpotId.id,
//           startDate,
//           endDate
//         }, options)
//       }
//       // await Booking.bulkCreate(bookings)
//     }
//     catch(e) {
//       console.log(e);
//     }
//   },

//   async down(queryInterface, Sequelize) {
//     // options.tableName = "Bookings";
//     // await queryInterface.bulkDelete(options, "Bookings", null, {});
//     await queryInterface.bulkDelete("Bookings", null, {});
//   }
// };


module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = "Bookings"
    return queryInterface.bulkInsert(options, bookings)
  },
  down: (queryInterface, Sequelize) => {
    options.tableName = "Bookings";
    return queryInterface.bulkDelete(options)
  }
}
