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
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    try {
      await User.bulkCreate(user);
    }
    catch (e) {
      console.log(e)
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
