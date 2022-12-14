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
