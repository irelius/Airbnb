'use strict';
const { User, Sequelize } = require("../models")
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const user = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@aa.io",
    hashedPassword: bcrypt.hashSync("password")
  },
  {
    firstName: "Alan",
    lastName: "Smithee",
    email: "AlanSmithee@aa.io",
    hashedPassword: bcrypt.hashSync("password")
  },
  {
    firstName: "Anon",
    lastName: "Ymous",
    email: "AnonYmous@aa.io",
    hashedPassword: bcrypt.hashSync("password")
  },
  {
    firstName: "Demo",
    lastName: "User",
    email: "demo@aa.io",
    hashedPassword: bcrypt.hashSync("password")
  }
]

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     try {
//       await User.bulkCreate(user);
//     }
//     catch (e) {
//       console.log(e)
//     }
//   },
//   async down(queryInterface, Sequelize) {
//     // options.tableName = "Users";
//     // await queryInterface.bulkDelete(options, 'Users', null, {});
//     await queryInterface.bulkDelete('Users', null, {});
//   }
// };

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = "Users"
    return queryInterface.bulkInsert(options, user)
  },
  down: (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkDelete(options)
  }
}
