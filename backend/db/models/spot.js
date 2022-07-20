'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.belongsTo(
        models.User,
        { foreignKey: "ownerId" }
      )

      Spot.hasMany(
        models.Review,
        { foreignKey: "spotId" }
      )
      Spot.hasMany(
        models.Booking,
        { foreignKey: "spotId" }
      )
      Spot.hasMany(
        models.Image,
        { foriengKey: "imageableId" }
      )
    }
  }
  Spot.init({
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
