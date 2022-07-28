'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.hasMany(
        models.Image,
        { foreignKey: "reviewId" }
      )

      Review.belongsTo(
        models.User,
        { foreignKey: "userId" }
      )

      Review.belongsTo(
        models.Spot,
        { foreignKey: "spotId" }
      )

    }
  }
  Review.init({
    userId: {
      type: DataTypes.INTEGER,
    },
    spotId: {
      type: DataTypes.INTEGER,
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
