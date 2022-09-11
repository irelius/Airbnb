'use strict';
const { User } = require("../models")
const bcrypt = require("bcryptjs");

const user = [
  {
    firstName: "John",
    lastName: "Doe",
    userName: "JohnDoe",
    email: "lostidentity@gmail.com",
    hashedPassword: bcrypt.hashSync("doyouknowwhoIam?")
  },
  {
    firstName: "Alan",
    lastName: "Smithee",
    userName: "AlanSmithee",
    email: "hiddenidentity@gmail.com",
    hashedPassword: bcrypt.hashSync("whocouldIbe?")
  },
  {
    firstName: "Anon",
    lastName: "Ymous",
    userName: "AnonYmous",
    email: "deletedidentitys@gmail.com",
    hashedPassword: bcrypt.hashSync("youdon'tknowwhoIam")
  },
  {
    firstName: "Demo",
    lastName: "User",
    userName: "Demo-User",
    email: "demo-user@gmail.com",
    hashedPassword: bcrypt.hashSync("demopassword")
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
