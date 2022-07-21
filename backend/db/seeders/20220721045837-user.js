'use strict';

const { User } = require("../models")

const user = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "lostidentity@gmail.com",
    password: "doyouknowwhoIam?",
  },
  {
    firstName: "Alan",
    lastName: "Smithee",
    email: "hiddenidentity@gmail.com",
    password: "whocouldIbe?"
  },
  {
    firstName: "Anon",
    lastName: "Ymous",
    email: "deletedidentity@gmail.com",
    password: "youdon'tknowwhoIam"
  }
]

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await User.bulkCreate(user);
    }
    catch (e) {
      console.log(e)
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
