'use strict';
const { User } = require("../models")
const bcrypt = require("bcryptjs");

const user = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "lostidentity@gmail.com",
    hashedPassword: bcrypt.hashSync("doyouknowwhoIam?")
  },
  {
    firstName: "Alan",
    lastName: "Smithee",
    email: "hiddenidentity@gmail.com",
    hashedPassword: bcrypt.hashSync("whocouldIbe?")
  },
  {
    firstName: "Anon",
    lastName: "Ymous",
    email: "deletedidentity@gmail.com",
    hashedPassword: bcrypt.hashSync("youdon'tknowwhoIam")
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
