'use strict';

const { User, Spot, Booking } = require("../models")

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

module.exports = {
  async up(queryInterface, Sequelize) {
    // console.log("booking seeder placeholder")
    try {
      for(let booking of bookings) {
        const { spotId, userId, startDate, endDate} = booking;
        const foundSpotId = await Spot.findByPk(booking.spotId);
        const foundUserId = await User.findByPk(booking.userId);
        await Booking.create({
          userId: foundUserId.id,
          spotId: foundSpotId.id,
          startDate,
          endDate
        })
      }
    }
    catch(e) {
      console.log(e);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Bookings", null, {});
  }
};
