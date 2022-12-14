'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.createTable('Users', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       firstName: {
//         type: Sequelize.STRING,
//         allowNull: false
//       },
//       lastName: {
//         type: Sequelize.STRING,
//         allowNull: false
//       },
//       userName: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique:true
//       },
//       email: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique:true
//       },
//       hashedPassword: {
//         type: Sequelize.STRING.BINARY,
//         allowNull: false
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
//       }
//     }, options);
//   },
//   async down(queryInterface, Sequelize) {
//     await queryInterface.dropTable('Users', options);
//   }
// };

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },
      hashedPassword: {
        type: Sequelize.STRING.BINARY,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);    // add options object here
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users', options); // and here
  }
};
